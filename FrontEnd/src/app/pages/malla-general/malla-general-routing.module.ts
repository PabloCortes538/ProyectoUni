import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MallaGeneralPage } from './malla-general.page';

const routes: Routes = [
  {
    path: '',
    component: MallaGeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MallaGeneralPageRoutingModule {}
