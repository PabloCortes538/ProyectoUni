import { AfterViewInit, Component, OnInit } from '@angular/core';

import { EstudianteService } from 'src/app/services/estudiante.service';

import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AsginarMateriaComponent } from 'src/app/components/asginar-materia/asginar-materia.component';
import { PerfilComponent } from 'src/app/components/perfil/perfil.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, AfterViewInit {
  isOpen: boolean = false;
  isToastOpen: boolean = false;
  idUser: number = 0;
  idDecano?: number;
  idEstudiante?: number;
  estu?: string;
  idMalla: number = 0;
  rol!: string;
  admin: boolean = false;
  cantidadAsignacion?: number;
  banderaListo: boolean = false;
  statusEstudiante: string;

  constructor(
    private fb: FormBuilder,
    private _estudianteService: EstudianteService,
    private rutaActiva: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private modalController: ModalController
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit() {
    this._estudianteService.MateriasAsginadas.subscribe((resp) => {
      this.cantidadAsignacion = resp.length;
    });
    this.idUser = parseInt(this.rutaActiva.snapshot.params['idUsuario']);
    this.rol = this.rutaActiva.snapshot.params['rol'];
  }
  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem('usuario')!);
    this.idUser = this.rutaActiva.snapshot.params['idUsuario'];
    this.rol = this.rutaActiva.snapshot.params['rol'];
    this.idUser = user.idUsuario;
    this.rol = user.rol;

    if (this.rol == 'admin') {
      this.admin = true;
      this.getDecano(this.idUser);
    } else {
      this.getEstudiante(this.idUser);
    }
  }
  getEstudiante(id: number) {
    this._estudianteService.getEstudianteById(id).subscribe((resp) => {
      if (resp == null) {
        this.isOpen = true;
      } else {
        localStorage.setItem('estudiante', JSON.stringify(resp));
        this.estu = resp.nombre;
        this.idMalla = resp.idMalla;
        this.idEstudiante = resp.idEstudiante;
        this.statusEstudiante = resp.statusEstudiante;
        if (this.statusEstudiante == 'parado') {
          this.isToastOpen = true;
        }

        this.banderaListo = true;
      }
    });
  }
  public alertButtons = [
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.sign_out();
      },
    },
  ];

  getDecano(id: number) {
    this._estudianteService.getDecanoById(id).subscribe((resp) => {
      if (resp == null) {
        this.isOpen = true;
      } else {
        console.log(resp);
        this.estu = resp.nombre;
        this.idMalla = 0;
        this.idDecano = resp.idDecano;
        this.banderaListo = true;
      }
    });
  }

  abrirModal(): boolean {
    if (this.isOpen) {
      return true;
    }
    return false;
  }

  async abrirAsignacion() {
    const materia = await this.modalController.create({
      component: AsginarMateriaComponent,
      cssClass: 'contenido',
    });

    return await materia.present();
  }
  async perfil() {
    const perfil = await this.modalController.create({
      component: PerfilComponent,
      cssClass: 'contenido',
    });
    return await perfil.present();
  }
  sign_out() {
    localStorage.removeItem('ingresado');
    localStorage.removeItem('estudiante');
    location.reload();
  }
}
