import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriasPageRoutingModule } from './materias-routing.module';

import { MateriasPage } from './materias.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriasPageRoutingModule,
    SharedModule
  ],
  declarations: [MateriasPage]
})
export class MateriasPageModule {}
