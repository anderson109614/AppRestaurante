import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LisClientesPageRoutingModule } from './lis-clientes-routing.module';

import { LisClientesPage } from './lis-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LisClientesPageRoutingModule
  ],
  declarations: [LisClientesPage]
})
export class LisClientesPageModule {}
