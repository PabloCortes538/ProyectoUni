import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewCarreraComponent } from 'src/app/components/new-carrera/new-carrera.component';

import { ICarrera } from 'src/app/interface/icarrera';
import { NewMateriaComponent } from 'src/app/new-materia/new-materia.component';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { SemestresService } from 'src/app/services/semestres.service';

@Component({
  selector: 'app-add-carrera',
  templateUrl: './add-carrera.page.html',
  styleUrls: ['./add-carrera.page.scss'],
})
export class AddCarreraPage implements OnInit {
  carreras!:ICarrera[];
  idDecano?:number;
  
  constructor(private _estudianteServices:EstudianteService,private  modalController: ModalController,private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    this.idDecano=this.rutaActiva.snapshot.params["idDecano"]
    
    this.getCarreras()

  }

  getCarreras(){
    this._estudianteServices.getCarreras().subscribe((resp)=>{
      let listString = JSON.stringify(resp)
      this.carreras = JSON.parse(listString);
      
    })
  }
  
  async presentModal() {
    const carrera = await this.modalController.create({
      component: NewCarreraComponent,
      componentProps:{"idDecano":this.idDecano}
      
    });
    
    return await carrera.present();
  }
  async semestres(item:ICarrera){
    const materias = await this.modalController.create({
      component: NewMateriaComponent,
      componentProps:{"item":item}
    })
    return await materias.present();
  }
}
