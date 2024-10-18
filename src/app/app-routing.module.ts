import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'layout',
    loadChildren: () => import('./pages/layout/layout.module').then( m => m.LayoutPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    
  },
  {
    path:'**',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'controller',
    loadChildren: () => import('./Admin/controller/controller.module').then( m => m.ControllerPageModule)
  },
  {
    path: 'add-places',
    loadChildren: () => import('./places/add-places/add-places.module').then( m => m.AddPlacesPageModule)
  },
  {
    path: 'delete-places',
    loadChildren: () => import('./places/delete-places/delete-places.module').then( m => m.DeletePlacesPageModule)
  },
  {
    path: 'detail-places',
    loadChildren: () => import('./places/detail-places/detail-places.module').then( m => m.DetailPlacesPageModule)
  },
  {
    path: 'list-places',
    loadChildren: () => import('./places/list-places/list-places.module').then( m => m.ListPlacesPageModule)
  },
  {
    path: 'update-places',
    loadChildren: () => import('./places/update-places/update-places.module').then( m => m.UpdatePlacesPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder/folder.module').then( m => m.FolderPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
