import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { EstudianteService } from 'src/app/services/estudiante.service';

import { ActivatedRoute, Params } from '@angular/router';
import { IonModal, LoadingController, ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { EstudianteComponent } from 'src/app/components/estudiante/estudiante.component';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, AfterViewInit {
  isOpen: boolean = false;
  idUser: number = 0;
  estu?: string;
  idMalla: number = 0;
  rol!: string;
  admin:boolean = false;


  constructor(private fb: FormBuilder, private _estudianteService: EstudianteService, private rutaActiva: ActivatedRoute, private loadingCtrl: LoadingController) {


  }
  ngAfterViewInit(): void {

  }

  ngOnInit() {




  }
  ionViewWillEnter() {
    this.idUser = this.rutaActiva.snapshot.params['idUsuario']
    this.rol = this.rutaActiva.snapshot.params['rol']
    
    if (this.rol == "Admin") {
      this.admin=true
      this.getDecano(this.idUser)
    } else {
      this.getEstudiante(this.idUser)
    }
  }
  getEstudiante(id: number) {
    this._estudianteService.getEstudianteById(id).subscribe((resp => {
      if (resp == null) {
        this.isOpen = true
      } else {
        console.log(resp)
        this.estu = resp.nombre
        this.idMalla = resp.idMalla

      }
    }))

  }
  getDecano(id: number) {
    this._estudianteService.getDecanoById(id).subscribe((resp => {
      
      if (resp == null) {
        this.isOpen = true
      } else {
        console.log(resp)
        this.estu = resp.nombre
        this.idMalla = 0
        
      }
    }))

  }

  abrirModal(): boolean {
    if (this.isOpen) {
      return true
    }
    return false
  }



}
