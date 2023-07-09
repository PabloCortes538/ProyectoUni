import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IMateria } from 'src/app/interface/imateria';
import { SemestresService } from 'src/app/services/semestres.service';
import { HistorialComponent } from '../historial/historial.component';

@Component({
  selector: 'app-materia-general',
  templateUrl: './materia-general.component.html',
  styleUrls: ['./materia-general.component.scss'],
})
export class MateriaGeneralComponent  implements OnInit {
  @Input() materias:IMateria[]=[]
  @Input() idMalla!:number;
  @Input() idSemestre!:number;
  constructor(private _semestreService: SemestresService,private modalCtrl:ModalController) { }

  ngOnInit() {
    this._semestreService.getMaterias(this.idSemestre,this.idMalla).subscribe(resp=>{
      let listString = JSON.stringify(resp);
      this.materias = JSON.parse(listString);
    })

  }
  async crearModal(materia:IMateria){
    const materias = await this.modalCtrl.create({
      component: HistorialComponent,
      componentProps: { materia:materia},
    });
    return await materias.present();
  }
  

}
