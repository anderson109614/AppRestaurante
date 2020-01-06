import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {LisClientesPageModule} from '../Pages/lis-clientes/lis-clientes.module';
import {LisClientesPage} from '../Pages/lis-clientes/lis-clientes.page';
import {NewClientesPageModule} from '../Pages/new-clientes/new-clientes.module';
import {NewClientesPage} from '../Pages/new-clientes/new-clientes.page';
@NgModule({
  entryComponents:[LisClientesPage,NewClientesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LisClientesPageModule,
    NewClientesPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
