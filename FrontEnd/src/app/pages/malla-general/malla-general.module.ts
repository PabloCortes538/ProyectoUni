import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MallaGeneralPageRoutingModule } from './malla-general-routing.module';

import { MallaGeneralPage } from './malla-general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MallaGeneralPageRoutingModule
  ],
  declarations: [MallaGeneralPage]
})
export class MallaGeneralPageModule {}
