import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },  
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },  
  {
    path: 'inicio/:idUsuario',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  }, 
  {
    path: 'malla/:idMalla',
    loadChildren: () => import('./pages/malla/malla.module').then( m => m.MallaPageModule),
    pathMatch: 'full'
  },
  {
    path: 'materias',
    loadChildren: () => import('./pages/materias/materias.module').then( m => m.MateriasPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
