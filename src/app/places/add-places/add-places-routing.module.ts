import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPlacesPage } from './add-places.page';

const routes: Routes = [
  {
    path: '',
    component: AddPlacesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPlacesPageRoutingModule {}
