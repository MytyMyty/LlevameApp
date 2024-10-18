import { GmapsService } from '../services/gmaps/gmaps.service';
import { Component, ElementRef, ViewChild, Renderer2, OnInit } from '@angular/core';
import { AuthenticatorService } from '../services/authenticator.service';
import { Router } from '@angular/router';


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

  public username: string = '';
  public isPickupRequested: boolean = false;
  constructor(
    private router: Router, 
    private auth: AuthenticatorService,
    private gmaps: GmapsService,
    private renderer: Renderer2,
  ) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as { username: string };
    this.username = state?.username || '';
  }


  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.loadMap();
  }
  async loadMap() {
    try {
      const { Map } = await google.maps.importLibrary("maps");
      const googleMaps = await this.gmaps.loadGoogleMaps();
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(this.center.lat, this.center.lng);
      this.map = new googleMaps.Map(mapEl, {
        mapId: '95f483ddcfa9ba3f',
        center: location,
        zoom: 11,
        disableDefaultUI: true,
        
      });
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