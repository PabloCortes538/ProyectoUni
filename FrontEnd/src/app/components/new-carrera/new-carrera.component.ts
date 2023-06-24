import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import { ICarrera } from 'src/app/interface/icarrera';
import { DecanoService } from 'src/app/services/decano.service';

@Component({
  selector: 'app-new-carrera',
  templateUrl: './new-carrera.component.html',
  styleUrls: ['./new-carrera.component.scss'],
})
export class NewCarreraComponent implements OnInit {
  formCrearCarrera!: FormGroup;
  @Input() idDecano?:number;
  Semestres: string[] = ["Primer Semestre", "Segundo Semestre", "Tercer Semestre",
                          "Cuarto Semestre", "Quinto Semestre", "Sexto Semestre",
                          "Septimo Semestre", "Octavo Semestre", "Noveno Semestre",
                          "Decimo Semestre", "UnDecimo Semestre","DuoDecimoSemestre"
                        ]
  constructor(public fb: FormBuilder,
    private _decanoService:DecanoService,
    private loadingCtrl:LoadingController,
    private modalCtrl:ModalController) {
    this.formCrearCarrera = this.fb.group({
      'nombreMalla': new FormControl("", Validators.required),
      'numSemestres': new FormControl("", Validators.required),

    })
  }

  ngOnInit() { }
  async crearCarrera(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: "Registrando...",
      spinner: "bubbles"
    })
    var f = this.formCrearCarrera.value;
    const carrera:ICarrera = {
      nombreMalla:f.nombreMalla,
      idDecano: this.idDecano
    }
    this._decanoService.newCarrera(carrera).subscribe((resp)=>{

    })
    
    for(let i=0;parseInt(f.numSemestres)>i;i++){
      const ob ={
        nombreSemestre: this.Semestres[i],
        nombreMalla:f.nombreMalla
      }
      this._decanoService.newSemestre(ob).subscribe((resp)=>{
        console.log(resp)
      })
    }
    this.cerrar();
    location.reload();
    
  }
  cerrar(){
    this.modalCtrl.dismiss();
  }
}
