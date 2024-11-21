import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeletePlacesPageRoutingModule } from './delete-places-routing.module';

import { DeletePlacesPage } from './delete-places.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeletePlacesPageRoutingModule
  ],
  declarations: [DeletePlacesPage]
})
export class DeletePlacesPageModule {}
