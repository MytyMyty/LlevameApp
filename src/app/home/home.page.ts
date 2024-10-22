import { GmapsService } from '../services/gmaps/gmaps.service';
import { Component, ElementRef, ViewChild, Renderer2, OnInit, inject } from '@angular/core';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { Router } from '@angular/router';
import { PlacesService } from 'src/app/services/gmaps/places-service.service';
import { max } from 'rxjs';


declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('map',{static:true}) mapElementRef!: ElementRef;
  googleMaps: any;
  center = { lat: -33.4328394303453, lng: -70.61491346414431 };
  source: any={ lat: -33.4990709, lng: -70.665723 };
  dest: any={ lat: -33.47162921236009, lng:  -70.65562840595744 };
  map : any;
  directionsService:any;
  directionsDisplay:any;
  
  source_marker:any;
  destination_marker:any;
  intersectionObserver: any;
  AdvancesMarkerElement: any;
  constructor(
    private router: Router, 
    private auth: AuthenticatorService,
    private gmaps: GmapsService,
    private renderer: Renderer2
  ) {
  }
  public isPickupRequested: boolean = false;
  
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.loadMap();

    this.intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('drop');
          this.intersectionObserver.unobserve(entry.target);
        }
      }
    })
    const paymentButtons = document.querySelectorAll('.payment');
    paymentButtons.forEach(button => {
      button.addEventListener('click', () => {
        paymentButtons.forEach(otherButton => {
          otherButton.classList.remove('selected');
        });
        button.classList.add('selected');
      });
    });
  }
  onPlaceSelected(place: any) {
    console.log(place);
    this.loadMap(place);
  }
  
  async loadMap(place?: any) {
    try {
      const { Map } = await google.maps.importLibrary("maps");
      const googleMaps = await this.gmaps.loadGoogleMaps();
      const mapEl = this.mapElementRef.nativeElement;
      const location = place? new googleMaps.LatLng(place.lat, place.lng): new googleMaps.LatLng(this.center.lat, this.center.lng);
      const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary('marker');
      this.AdvancesMarkerElement = AdvancedMarkerElement;
      const pin = new PinElement({scale: 0});
      const map = new googleMaps.Map(mapEl, {
        mapId: '95f483ddcfa9ba3f',
        center: location,
        zoom: 12,
        disableDefaultUI: true
        
      });
      this.map=map;

      const sourceIconUrl = 'assets/imgs/car.png';
      const destinationIconUrl = 'assets/imgs/pin.png';

      const source_position = new googleMaps.LatLng(
        this.source.lat,
        this.source.lng
      );

      const destination_position = new googleMaps.LatLng(
        this.dest.lat,
        this.dest.lng
      );

      this.source_marker =await this.addMarker(
        source_position,
        sourceIconUrl,
      );

      await this.addMarker(
        destination_position,
        destinationIconUrl,
      );

      this.directionsService = new googleMaps.DirectionsService();
      this.directionsDisplay = new googleMaps.DirectionsRenderer({ map: map });

      this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 4,
          strokeOpacity: 1,
          strokeColor: 'black',
        },
        supressMarkers: true,
      });

      await this.drawRoute(place);

      
      this.map.setCenter(source_position);
      this.renderer.addClass(mapEl, 'visible');
    } catch (e) {
      console.log(e);
    }
  }

  async addMarker(location:any, imageUrl:string) {
    try {
      const markerIcon = document.createElement('img');
      markerIcon.src = imageUrl;
      markerIcon.height = 50;
      markerIcon.width = 50;

      const AdvancedMarkerElement = this.AdvancesMarkerElement;
      console.log(AdvancedMarkerElement);

      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: location,
        content: markerIcon,
      });

      const content = marker.content;
      content.style.opacity = '0';
      content.addEventListener('animationend', (event:any) => {
        content.classList.remove('drop');
        content.style.opacity = '1';
      });
      this.intersectionObserver.observe(content);

      return marker;
    } catch (e) {	
      throw e;
    }
  }

  drawRoute(place?: any) {
    this.directionsService.route(
      {
        origin: this.source,
        waypoints: [{location: this.dest, stopover: false}],
        destination: place? new google.maps.LatLng(place.lat, place.lng): new google.maps.LatLng(this.center.lat, this.center.lng),
        travelMode: 'DRIVING',
        provideRouteAlternatives: true,
      },
      (response: any, status: any) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
          console.log('response:',response);

          const route = response.routes[0].legs[0];
          const steps = route.steps;
          const positions:any[] = [];

          //Extraer todos los puntos de la polyline a traves de la ruta
          steps.forEach((step: any) => {
            const path = step.path;
            path.forEach((latLng: any) => {
              positions.push({ lat: latLng.lat(), lng: latLng.lng() });
            }); 
          });

          // Usar la array de positions para animar el marcador
          this.animateMarkerAlongRoute(positions);
        } else {
          console.log(status);
        }
      },
    );
  }

  animateMarkerAlongRoute(positions: any[]) {
    let index = 0;
    const totalPositions = positions.length;
    const stepCount=20;
    const segment = Math.floor(totalPositions / stepCount);
    const interval =500;

    const animate = () => {
      if (index < totalPositions - 1) {
        //Siguiente posicion
        const nextPosition = positions[index];

        //Actualizar la posicion del marcador
        this.changeMarkerPosition(nextPosition);

        //Incrementar index para seguir a la siguiente posicion
        index += segment;

        //Programar la siguiente animacion
        setTimeout(()=>{
          requestAnimationFrame(animate);
        },interval);
      }else{
        //Asegurar que llegue al destino final
        this.changeMarkerPosition(positions[totalPositions - 1]);
      }
    };
    //Iniciar animacion
    requestAnimationFrame(animate);
  }

  changeMarkerPosition(data: any) {
    const newPosition ={ lat: data?.lat, lng: data?.lng };//Asignar el nuevo marcador
    this.animateMarker(this.source_marker, newPosition);

  }

  animateMarker(marker: any, newPosition: any) {
    let googleMaps = this.googleMaps;

    const oldPosition = marker.position;
    const duration = 2000;//Duración en milisegundos
    const frameRate = 60;//FPS
    const frames =duration/(900/frameRate);
    const deltaLat = (newPosition.lat - oldPosition.lat) / frames;
    const deltaLng= (newPosition.lng - oldPosition.lng) / frames;

    let frame= 0 ;
    const animate = () => {
      if(frame < frames){
        const lat= oldPosition.lat + deltaLat * frame;
        const lng = oldPosition.lng + deltaLng * frame;
        marker.position = new google.maps.LatLng(lat, lng);
        frame++;
        requestAnimationFrame(animate);
      }else {
        marker.position = newPosition;
        this.source_marker = marker;
      }
    };
    animate();
  }

  confirmPickup(){
    this.isPickupRequested = true;
    console.log('confirmPickup');
  }

  cancelPickup(){
    this.isPickupRequested = false;
    console.log('cancelPickup');
  }
  logout() {
    this.auth.logout()
    this.router.navigate(['/login']);
  }
  
  
  
}