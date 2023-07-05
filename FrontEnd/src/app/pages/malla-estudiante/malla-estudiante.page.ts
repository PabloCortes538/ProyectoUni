import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { IMateria } from 'src/app/interface/imateria';
import { ISemestre } from 'src/app/interface/isemestre';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { SemestresService } from 'src/app/services/semestres.service';

@Component({
  selector: 'app-malla-estudiante',
  templateUrl: './malla-estudiante.page.html',
  styleUrls: ['./malla-estudiante.page.scss'],
})
export class MallaEstudiantePage implements OnInit {
  semestres!: ISemestre[];
  idMalla!: number;
  idEstudiante!: number;
  materias: IMateria[] = [];
  
  constructor(
    private _semestreService: SemestresService,
    private rutaActiva: ActivatedRoute,
    private _estudianteService: EstudianteService
  ) {}

  ngOnInit() {
    this.idMalla = this.rutaActiva.snapshot.params['idMalla'];
    this.idEstudiante = this.rutaActiva.snapshot.params['idEstudiante'];
    this.getSemestre(this.idMalla);
    
  }
  getSemestre(idMalla: number) {
    this._semestreService.getSemestres(idMalla).subscribe((resp) => {
      let listString = JSON.stringify(resp);
      this.semestres = JSON.parse(listString);            
    });
  }
  getMaterias(idEstudiantes: number) {
    this._estudianteService
      .getEstudianteMaterias(idEstudiantes)
      .subscribe((resp) => {
        let listString = JSON.stringify(resp);
        this.materias = JSON.parse(listString);
        
      });
  }
}
