import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { IEstudiante } from 'src/app/interface/iestudiante';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() idMalla!: number;
  @Input() idUsuario!: number;
  @Input() idDecano?: number;
  @Input() idEstudiante?: number;
  @Input() habilitado: boolean;

  @Input() rol!: string;
  Admin: string = 'admin';
  usuario: string = 'usuario';

  constructor(private router: Router, private menu: MenuController) {}

  ngOnInit() {}

  malla() {
    this.router.navigate(['/malla', this.idMalla]);
    this.menu.close();
  }
  mallaGeneral() {
    this.router.navigate(['/malla-general', this.idMalla]);
    this.menu.close();
  }
  mallaEstudiante() {
    this.router.navigate([
      '/malla-estudiante',
      { idMalla: this.idMalla, idEstudiante: this.idEstudiante },
    ]);
    this.menu.close();
  }
  inicio() {
    this.router.navigate([
      '/inicio',
      { idUsuario: this.idUsuario, rol: this.rol },
    ]);
    this.menu.close();
  }

  addCarrera() {
    this.router.navigate(['/add-carrera', this.idDecano]);
    this.menu.close();
  }
  salir() {
    localStorage.removeItem('ingresado');
    localStorage.removeItem('estudiante');
    location.reload();
    this.menu.close();
  }
  usuarios(){
    this.router.navigate(['/administracion']);
    this.menu.close();
  }
}
