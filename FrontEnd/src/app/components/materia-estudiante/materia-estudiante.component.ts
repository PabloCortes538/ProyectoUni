import { Component, Input, OnInit } from '@angular/core';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { IMateria } from 'src/app/interface/imateria';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { SemestresService } from 'src/app/services/semestres.service';

@Component({
  selector: 'app-materia-estudiante',
  templateUrl: './materia-estudiante.component.html',
  styleUrls: ['./materia-estudiante.component.scss'],
})
export class MateriaEstudianteComponent implements OnInit {
  @Input() materias: IMateria[] = [];
  @Input() idMalla!: number;
  @Input() idSemestre!: number;
  @Input() idEstudiante!: number;
  colorDisponibel = 'primary';
  colorReprobado = 'reprobado';
  colorCursando = 'cursando';
  colorAprobado = 'aprobado';
  materiasEstudiante: IMateria[] = [];
  constructor(
    private _semestreService: SemestresService,
    private _estudianteService: EstudianteService
  ) {}

  ngOnInit() {
    this._semestreService
      .getMaterias(this.idSemestre, this.idMalla)
      .subscribe((resp) => {
        let listString = JSON.stringify(resp);
        this.materias = JSON.parse(listString);
        this.getMaterias(this.idEstudiante);
      });
  }
  getMaterias(idEstudiantes: number) {
    this._estudianteService
      .getEstudianteMaterias(idEstudiantes)
      .subscribe((resp) => {
        let listString = JSON.stringify(resp);
        this.materiasEstudiante = JSON.parse(listString);
        this.materiasEstudiante.forEach((e) => {
          this.materias.forEach((eS) => {
            if (e.nombreMateria == eS.nombreMateria) {
              eS.status = e.status;
            }
          });
        });
        console.log(this.materias);
      });
  }
  materiaConsulta(materia: IMateria): string {
    if (materia.requisito == '' && materia.status == null) {
      return this.colorDisponibel;
    }
    switch (materia.status) {
      case 'cursando':
        return this.colorCursando;

      case 'reprobado':
        return this.colorReprobado;

      case 'disponible':
        return this.colorDisponibel;

      case 'aprobado':
        return this.colorAprobado;

      default:
        return 'light';
    }
  }
}
