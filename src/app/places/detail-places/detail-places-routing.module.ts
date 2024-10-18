import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPlacesPage } from './detail-places.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPlacesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPlacesPageRoutingModule {}
