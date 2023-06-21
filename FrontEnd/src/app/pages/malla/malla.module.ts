import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MallaPageRoutingModule } from './malla-routing.module';

import { MallaPage } from './malla.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MallaPageRoutingModule,
    SharedModule
  ],
  declarations: [MallaPage]
})
export class MallaPageModule {}
