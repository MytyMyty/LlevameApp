import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlacesPageRoutingModule } from './add-places-routing.module';

import { AddPlacesPage } from './add-places.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPlacesPageRoutingModule
  ],
  declarations: [AddPlacesPage]
})
export class AddPlacesPageModule {}
