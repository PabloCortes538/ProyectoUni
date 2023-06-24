import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMateriasPage } from './add-materias.page';

const routes: Routes = [
  {
    path: '',
    component: AddMateriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMateriasPageRoutingModule {}
