import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MallaEstudiantePageRoutingModule } from './malla-estudiante-routing.module';

import { MallaEstudiantePage } from './malla-estudiante.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MallaEstudiantePageRoutingModule,
    SharedModule
  ],
  declarations: [MallaEstudiantePage]
})
export class MallaEstudiantePageModule {}
