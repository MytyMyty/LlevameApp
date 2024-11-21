import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePlacesPageRoutingModule } from './update-places-routing.module';

import { UpdatePlacesPage } from './update-places.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePlacesPageRoutingModule
  ],
  declarations: [UpdatePlacesPage]
})
export class UpdatePlacesPageModule {}
