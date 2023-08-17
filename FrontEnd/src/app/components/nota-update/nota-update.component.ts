import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-nota-update',
  templateUrl: './nota-update.component.html',
  styleUrls: ['./nota-update.component.scss'],
})
export class NotaUpdateComponent implements OnInit {
  @Input() nota;
  @Input() ca;
  formularioNota!: FormGroup;
  constructor(
    private _estudianteService: EstudianteService,
    private modalCtrl: ModalController,
    public fb: FormBuilder,
    private alertCtrl:AlertController
  ) {}

  ngOnInit() {
    this.formularioNota = this.fb.group({
      nombreNota: new FormControl(this.nota.nombreNota, Validators.required),
      nota: new FormControl(this.nota.nota, Validators.required),
    });
  }
  cerrar() {
    this.modalCtrl.dismiss();
  }
  editar() {
    if(this.formularioNota.invalid){
      this.alert("Complete el Formulario")
    }else{
      const nota = {
        idNota:this.nota.idNota,
        nota:this.formularioNota.value.nota,
        nombreNota:this.formularioNota.value.nombreNota
      }
      console.log(nota)
      this._estudianteService.updateNota(nota).subscribe(res=>{
        console.log(res)
      });
      this.cerrar()
      location.reload();
    }
  }
  async alert(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
