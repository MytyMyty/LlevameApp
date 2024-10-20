import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { PlacesService } from 'src/app/services/gmaps/places-service.service';

@Component({
  selector: 'app-places-dropdown',
  template: `
    <ion-select placeholder="Selecciona tu sede: " (ionChange)="onPlaceSelected($event)">
      <ion-select-option *ngFor="let place of places" [value]="place.formatted_address">
        {{ place.name }}
      </ion-select-option>
    </ion-select>
  `
})
export class PlacesDropdownComponent implements OnInit {
  @Output() placeSelected = new EventEmitter<any>();

  places :any[] = [];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.placesService.getPlaces().subscribe((data: any) => {
      console.log(data); 
      this.places = data;
    });
  }

  onPlaceSelected(event: any) {
    const selectedPlace = this.places.find((place) => place.formatted_address === event.detail.value);
    if (selectedPlace) {
      console.log(selectedPlace.formatted_address);
      this.placeSelected.emit(selectedPlace.geometry.location);
    }
  }

}