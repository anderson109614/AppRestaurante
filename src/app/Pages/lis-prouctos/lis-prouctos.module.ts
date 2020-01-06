import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LisProuctosPageRoutingModule } from './lis-prouctos-routing.module';

import { LisProuctosPage } from './lis-prouctos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LisProuctosPageRoutingModule
  ],
  declarations: [LisProuctosPage]
})
export class LisProuctosPageModule {}
