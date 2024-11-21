import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeletePlacesPage } from './delete-places.page';

const routes: Routes = [
  {
    path: '',
    component: DeletePlacesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeletePlacesPageRoutingModule {}
