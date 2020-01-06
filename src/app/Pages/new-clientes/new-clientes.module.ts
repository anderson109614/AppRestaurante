import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClientesPageRoutingModule } from './new-clientes-routing.module';

import { NewClientesPage } from './new-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewClientesPageRoutingModule
  ],
  declarations: [NewClientesPage]
})
export class NewClientesPageModule {}
