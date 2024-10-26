import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { PlacesService } from 'src/app/services/gmaps/places-service.service';

@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.page.html',
  styleUrls: ['./list-places.page.scss'],
})
export class ListPlacesPage  {

  places=[]
  constructor(private placesService: PlacesService, private loadingCtrl:LoadingController) { }

  ionViewWillEnter(){
    this.loadPlaces();
  }


  async loadPlaces(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles'
      }
    );
    await loading.present();

    this.placesService.getPlaces().subscribe(
      (res) => {
        loading.dismiss();
        let listString= JSON.stringify(res)
        this.places = JSON.parse(listString)
        event?.target.complete();
      },
      (err) => {
        console.log(err.message)
        loading.dismiss();
      }
    );
  }

}
