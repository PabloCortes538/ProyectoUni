import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { ISemestre } from 'src/app/interface/isemestre';
import { SemestresService } from 'src/app/services/semestres.service';

@Component({
  selector: 'app-malla',
  templateUrl: './malla.page.html',
  styleUrls: ['./malla.page.scss'],
})
export class MallaPage implements OnInit {
  idMalla: number = 0;
  idUser: number = 0;
  semestres!: ISemestre[];

  constructor(
    private rutaActiva: ActivatedRoute,
    private _semestreService: SemestresService,
    private routes: Router
  ) {}

  ngOnInit() {
    this.idMalla = this.rutaActiva.snapshot.params['idMalla'];
    if(this.idMalla!=null){
      this.getSemestre(this.idMalla);
    }
    
  }
  getSemestre(id: number) {
    this._semestreService.getSemestres(id).subscribe((resp) => {
      let listString = JSON.stringify(resp);
      this.semestres = JSON.parse(listString);      
    });
  }
  materia(item: ISemestre) {
    let listString = JSON.stringify(item);
    var is = JSON.parse(listString);
    this.routes.navigate(['/materias', is]);
  }
}
