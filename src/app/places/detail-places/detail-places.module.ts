import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPlacesPageRoutingModule } from './detail-places-routing.module';

import { DetailPlacesPage } from './detail-places.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPlacesPageRoutingModule
  ],
  declarations: [DetailPlacesPage]
})
export class DetailPlacesPageModule {}
