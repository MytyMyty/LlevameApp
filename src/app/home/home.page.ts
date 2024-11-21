import { GmapsService } from '../services/gmaps/gmaps.service';
import { Component, ElementRef, ViewChild, Renderer2, OnInit, inject, OnDestroy, NgZone } from '@angular/core';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { Router } from '@angular/router';
import { PlacesService } from 'src/app/services/gmaps/places-service.service';
import { BehaviorSubject, max, Subscription } from 'rxjs';


declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {
  @ViewChild('map',{static:true}) mapElementRef!: ElementRef;
  googleMaps: any;
  center = { lat: -33.4328394303453, lng: -70.61491346414431 };
  source: any={ lat: -33.4990709, lng: -70.665723 };
  dest: any={ lat: -33.47162921236009, lng:  -70.65562840595744 };
  map : any;
  directionsService:any;
  directionsDisplay:any;

  isPickupRequested = false

  places:any[]=[];
  query:string;
  placesSub: Subscription;
  private _places = new BehaviorSubject<any[]>([]);
  
  source_marker:any;
  destination_marker:any;
  intersectionObserver: any;
  AdvancesMarkerElement: any;
  constructor(
    private router: Router, 
    private auth: AuthenticatorService,
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private zone: NgZone
    
  ) {
  }

  private animationRunning: boolean = false;
  ngOnInit(): void {
    this.placesSub = this.search_places.subscribe({
      next: (places) => {
        this.places = places;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.placesSub) this.placesSub.unsubscribe();
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

  confirmPickup() {
    this.isPickupRequested = true;
    this.startTrip();
  }

  startTrip() {
    // Code to start the trip goes here
    console.log('Trip started!');
    
    
  }

  cancelPickup() {
    this.isPickupRequested = false;
    // Code to cancel the trip goes here
    console.log('Trip cancelled!');
  }
  onPlaceSelected(place: any) {
    console.log(place);
    
    this.loadMap(place);
  }
  //Cargar el mapa
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


//Añadir los marcadores con sus iconos y sus configuraciones asignandoles un observer para la animacion
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


  //Dibujar la ruta entre dos o mas puntos
 drawRoute(place?: any) {
  this.cancelAnimation();
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


 //Animar el marcador a traves de la ruta
 animateMarkerAlongRoute(positions: any[]) {
 
   let index = 0;
   const totalPositions = positions.length;
   const stepCount = 260; //Puntos a traves de la ruta
   const segment = Math.floor(totalPositions / stepCount);
   const interval = 40;
 
   const animate = () => {
     if (index < totalPositions - 1) {
       // Siguiente posicion
       const nextPosition = positions[index];
 
       // Actualizar la posicion del marcador
       this.changeMarkerPosition(nextPosition);
 
       // Incrementar index para seguir a la siguiente posicion
       index += 1;
 
       // Programar la siguiente animacion
       setTimeout(() => {
         requestAnimationFrame(animate);
       }, interval);
     } else {
       // Asegurar que llegue al destino final
       this.changeMarkerPosition(positions[totalPositions - 1]);
       this.animationRunning = false;
     }
   };
   
 }
 
 cancelAnimation() {
   this.animationRunning = false;
 }
 

 //Funcion para cambiar la posicion de un marcador
 changeMarkerPosition(data: any) {
   const newPosition ={ lat: data.lat, lng: data.lng };//Asignar el nuevo marcador
   this.animateMarker(this.source_marker, newPosition);
 }
 

 // Funcion para configurar la animacion del marcador y su velocidad
 animateMarker(marker: any, newPosition: any) {
   let googleMaps = this.googleMaps;
 
   const oldPosition = marker.position;
   const duration = 300; // Increase duration to slow down the animation
   const frameRate = 30; // FPS
   const frames = duration / (1000 / frameRate);
   const deltaLat = (newPosition.lat - oldPosition.lat) / frames;
   const deltaLng = (newPosition.lng - oldPosition.lng) / frames;
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


  logout() {
    this.auth.logout()
    this.router.navigate(['/login']);
  }

  async onSearchChange(event) {
    console.log(event);
    this.query = event.detail.value;
    if(this.query.length > 0) await this.getPlaces();
  }
  
  //Obtener todos los lugares relacionados al input de busqueda
  async getPlaces(){
    try {
      let service = new google.maps.places.AutocompleteService();
      let response = await service.getPlacePredictions({
        input: this.query,
        types: ['geocode'],
        componentRestrictions: {
          country: 'cl'
        }
      }, (predictions)=>{
        let autoCompleteItems = [];
        this.zone.run(()=> {
          if(predictions!=null){
            predictions.forEach(async(prediction)=>{
              console.log('prediction: ',prediction);
              let latLng: any = await this.geoCode(prediction.description);
              const places = {
                title: prediction.structured_formatting.main_text,
                address: prediction.description,
                lat: latLng.lat,
                lng: latLng.lng
              };
              console.log('places: ',places);
              autoCompleteItems.push(places);
            });    
            this._places.next(autoCompleteItems);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }


//Obtener la latitud y longitud de un lugar mediante el geocoding
  geoCode(address){
    let latlng = { lat:'', lng: '' };
    return new Promise((resolve, reject) => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, (results) => {
        console.log('Results: ',results);
        latlng.lat = results[0].geometry.location.lat();
        latlng.lng = results[0].geometry.location.lng();
        resolve(latlng);
      });
    });
  }


  //Seleccionar los lugares obtenidos mediante Geocoding
  get search_places() {
    return this._places.asObservable();
  }

  onPlaceSelect(place: any) {
    this.places.length=0
    this.geoCode(place.address).then((coordinates) => {
      this.dest = coordinates;
      console.log('Selected address:', place.address);
      console.log('Dest coordinates:', this.dest);
    });
  }
}

