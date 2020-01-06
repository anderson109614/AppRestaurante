import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  
  /*{
    path: 'lis-clientes',
    loadChildren: () => import('./Pages/lis-clientes/lis-clientes.module').then( m => m.LisClientesPageModule)
  },
  {
    path: 'new-clientes',
    loadChildren: () => import('./Pages/new-clientes/new-clientes.module').then( m => m.NewClientesPageModule)
  },
  {
    path: 'lis-prouctos',
    loadChildren: () => import('./Pages/lis-prouctos/lis-prouctos.module').then( m => m.LisProuctosPageModule)
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
