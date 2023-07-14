import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { forceUpdate } from 'ionicons/dist/types/stencil-public-runtime';
import { ICarrera } from 'src/app/interface/icarrera';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  estudiante!: IEstudiante;
  formularioLogin!: FormGroup;
  banderaBoton: boolean = false;
  isToastOpen = false;
  constructor(
    private _estudianteService: EstudianteService,
    public fb: FormBuilder,
    private modalCtrl:ModalController
  ) {}

  ngOnInit() {
    this._estudianteService.estudiante?.subscribe((resp) => {
      this.estudiante = resp;
      this.formularioLogin = this.fb.group({
        nombre: new FormControl(
          { value: this.estudiante.nombre, disabled: true },
          Validators.required
        ),
        apellido: new FormControl(
          { value: this.estudiante.apellido, disabled: true },
          Validators.required
        ),
        CI: new FormControl(
          { value: this.estudiante.CI, disabled: true },
          Validators.required
        ),
        carrera: new FormControl({
          value: '',
          disabled: true,
        }),
      });
      this._estudianteService.getCarreras().subscribe((repst) => {
        let listString = JSON.stringify(repst);
        let listCarreras: ICarrera[] = JSON.parse(listString);
        let malla;
        listCarreras.forEach((e) => {
          if (this.estudiante.idMalla == e.idMalla) {
            malla = e.nombreMalla;
          }
        });
        this.formularioLogin.controls['carrera'].setValue(malla);
      });
    });
  }
  editar() {
    this.formularioLogin.get('nombre')?.enable();
    this.formularioLogin.get('apellido')?.enable();
    this.formularioLogin.get('CI')?.enable();
    this.banderaBoton = true;
  }
  guardarCambios() {
    var f = this.formularioLogin.value;
    const estudiante: IEstudiante = {
      nombre: f.nombre,
      apellido: f.apellido,
      CI: f.CI,
      idMalla: this.estudiante.idMalla,
      idUsuario: this.estudiante.idUsuario,
      idEstudiante: this.estudiante.idEstudiante,
    };
    
    this._estudianteService
      .updateEstudiantePerfil(estudiante)
      .subscribe((resp) => {
        const rep = JSON.stringify(resp);
        const est: IEstudiante = JSON.parse(rep);
        this._estudianteService.setEstudiante = est;
        this.isToastOpen=true
        this.modalCtrl.dismiss();
      });
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
