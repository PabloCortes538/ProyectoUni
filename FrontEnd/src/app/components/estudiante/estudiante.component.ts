import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal, LoadingController } from '@ionic/angular';

import { ICarrera } from 'src/app/interface/icarrera';
import { IDecano } from 'src/app/interface/idecano';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss'],
})
export class EstudianteComponent implements OnInit {
  canDismiss: boolean = false
  @ViewChild(IonModal) modals?: IonModal;
  @Input() modal: boolean = false;
  @Input() idUser?: number;
  @Input() rol!:string;  
  formularioLogin!: FormGroup;
  listCarreras?: ICarrera[];
  ca: any;
  


  constructor(private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private _estudianteService: EstudianteService) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'CI': new FormControl("", Validators.required),
      'carrera': new FormControl(""),
      
    })


  }

  ngOnInit() {

    this._estudianteService.getCarreras().subscribe(
      (resp) => {
        let listString = JSON.stringify(resp)
        this.listCarreras = JSON.parse(listString);
      }
    )



  }
  crear() {
    var f = this.formularioLogin.value
    
    if(this.rol=="Admin"){
      const decano: IDecano = {
        nombre: f.nombre,
        apellido: f.apellido,
        CI: f.CI,        
        idUsuario: this.idUser,
        codigoDecano: this.rol
      }
      this.newDecano(decano);
    }else{
      const estudiante: IEstudiante = {
        nombre: f.nombre,
        apellido: f.apellido,
        CI: f.CI,
        idMalla: this.ca.idMalla,
        idUsuario: this.idUser
      }
    this.newEstudiante(estudiante)
    }
  }
  async newEstudiante(estudiante: IEstudiante) {
    const loading = await this.loadingCtrl.create({
      message: "Registrando...",
      spinner: "bubbles"
    })
    if (estudiante != null) {
      await loading.present();
      this._estudianteService.newEstudiante(estudiante).subscribe((resp) => {
        
        loading.dismiss();
        this.canDismiss = true
        this.modals?.dismiss()
        location.reload();
      })
    }
  }
  async newDecano(decano: IDecano) {
    const loading = await this.loadingCtrl.create({
      message: "Registrando...",
      spinner: "bubbles"
    })
    if (decano != null) {
      await loading.present();
      this._estudianteService.newDecano(decano).subscribe((resp) => {
        
        loading.dismiss();
        this.canDismiss = true
        this.modals?.dismiss()
        location.reload();
      })
    }
  }
  handleChange(ev: any) {
    this.ca = ev.target.value;
  }
  


}
