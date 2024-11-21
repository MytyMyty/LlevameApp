import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePlacesPage } from './update-places.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePlacesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePlacesPageRoutingModule {}
