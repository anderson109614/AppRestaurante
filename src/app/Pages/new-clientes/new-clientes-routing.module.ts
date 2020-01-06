import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewClientesPage } from './new-clientes.page';

const routes: Routes = [
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewClientesPageRoutingModule {}
