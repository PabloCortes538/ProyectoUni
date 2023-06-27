import { Component, Input, OnInit } from '@angular/core';
import { IMateria } from 'src/app/interface/imateria';
import { SemestresService } from 'src/app/services/semestres.service';

@Component({
  selector: 'app-materia-general',
  templateUrl: './materia-general.component.html',
  styleUrls: ['./materia-general.component.scss'],
})
export class MateriaGeneralComponent  implements OnInit {
  @Input() materias:IMateria[]=[]
  @Input() idMalla!:number;
  @Input() idSemestre!:number;
  constructor(private _semestreService: SemestresService,) { }

  ngOnInit() {
    this._semestreService.getMaterias(this.idSemestre,this.idMalla).subscribe(resp=>{
      let listString = JSON.stringify(resp);
      this.materias = JSON.parse(listString);
    })
  }

}
