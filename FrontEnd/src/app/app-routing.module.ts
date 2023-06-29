import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './guards/ingresado.guard';
import { NoIngresadoGuard } from './guards/no-ingresado.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
      canActivate:[NoIngresadoGuard]
      
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./pages/inicio/inicio.module').then((m) => m.InicioPageModule),
      canActivate:[IngresadoGuard]
  },
  {
    path: 'inicio/:idUsuario',
    loadChildren: () =>
      import('./pages/inicio/inicio.module').then((m) => m.InicioPageModule),
  },
  {
    path: 'malla/:idMalla',
    loadChildren: () =>
      import('./pages/malla/malla.module').then((m) => m.MallaPageModule),
    pathMatch: 'full',
  },
  {
    path: 'materias',
    loadChildren: () =>
      import('./pages/materias/materias.module').then(
        (m) => m.MateriasPageModule
      ),
  },
  {
    path: 'add-carrera/:idDecano',
    loadChildren: () =>
      import('./pages/add-carrera/add-carrera.module').then(
        (m) => m.AddCarreraPageModule
      ),
  },
  {
    path: 'add-materias',
    loadChildren: () =>
      import('./pages/add-materias/add-materias.module').then(
        (m) => m.AddMateriasPageModule
      ),
  },
  {
    path: 'malla-general/:idMalla',
    loadChildren: () =>
      import('./pages/malla-general/malla-general.module').then(
        (m) => m.MallaGeneralPageModule
      ),
  },
  {
    path: 'malla-estudiante',
    loadChildren: () => import('./pages/malla-estudiante/malla-estudiante.module').then( m => m.MallaEstudiantePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
