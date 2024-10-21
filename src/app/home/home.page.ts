import { GmapsService } from '../services/gmaps/gmaps.service';
import { Component, ElementRef, ViewChild, Renderer2, OnInit } from '@angular/core';
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
  center = { lat: -33.4990709, lng: -70.665723 };
  map : any;
  
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
      const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
      const pin = new PinElement({scale: 1.2});
      this.map = new googleMaps.Map(mapEl, {
        mapId: '95f483ddcfa9ba3f',
        center: location,
        zoom: 15,
        disableDefaultUI: true
        
      });
      console.log(this.map);
      console.log(this.map.getZoom());
      const marker = new AdvancedMarkerElement({
        position: location,
        content: pin.element,
        
      });
      marker.setMap(this.map);
      this.renderer.addClass(mapEl, 'visible');
    } catch (e) {
      console.log(e);
    }
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