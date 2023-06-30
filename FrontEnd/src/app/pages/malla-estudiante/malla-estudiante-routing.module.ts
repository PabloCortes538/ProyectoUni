import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MallaEstudiantePage } from './malla-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: MallaEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MallaEstudiantePageRoutingModule {}
