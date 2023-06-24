import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ICarrera } from 'src/app/interface/icarrera';
import { ISemestre } from 'src/app/interface/isemestre';
import { SemestresService } from 'src/app/services/semestres.service';

@Component({
  selector: 'app-new-materia',
  templateUrl: './new-materia.component.html',
  styleUrls: ['./new-materia.component.scss'],
})
export class NewMateriaComponent  implements OnInit {
@Input() item!:ICarrera
semestre:ISemestre[]=[]
idMalla:number = 0
  constructor( private modalCtrl:ModalController,
    private _semestreService:SemestresService,
    private router: Router) { }

  ngOnInit() {
    if(this.item.idMalla!=null){
    this.idMalla = this.item.idMalla
    this.getSemestres()
    }
  }
getSemestres(){
  this._semestreService.getSemestres(this.idMalla).subscribe((resp)=>{
    let listString = JSON.stringify(resp)
    this.semestre = JSON.parse(listString);  
    console.log(this.semestre) 
  })
}
materias(item:ISemestre){
  this.router.navigate(['/add-materias',item])
  this.cerrar()
}

cerrar(){
  this.modalCtrl.dismiss();
}
}
