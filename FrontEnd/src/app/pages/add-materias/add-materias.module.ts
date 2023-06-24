import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMateriasPageRoutingModule } from './add-materias-routing.module';

import { AddMateriasPage } from './add-materias.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMateriasPageRoutingModule,
    SharedModule
  ],
  declarations: [AddMateriasPage]
})
export class AddMateriasPageModule {}
