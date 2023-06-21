import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCarreraPageRoutingModule } from './add-carrera-routing.module';

import { AddCarreraPage } from './add-carrera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCarreraPageRoutingModule
  ],
  declarations: [AddCarreraPage]
})
export class AddCarreraPageModule {}
