import { Component, Input, OnInit } from '@angular/core';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { IMateria } from 'src/app/interface/imateria';
import { ISemestre } from 'src/app/interface/isemestre';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { SemestresService } from 'src/app/services/semestres.service';

@Component({
  selector: 'app-materia-disponible',
  templateUrl: './materia-disponible.component.html',
  styleUrls: ['./materia-disponible.component.scss'],
})
export class MateriaDisponibleComponent implements OnInit {
  @Input() idEstudiante?: number;
  @Input() idUsuario: number;
  @Input() rol?: string;
  @Input() habilitado: boolean;
  estudiante?: IEstudiante;
  materiasDispnibles = [];
  constructor(
    private _estudianteService: EstudianteService,
    private _semetresService: SemestresService
  ) {}

  ngOnInit() {
    this.obtener();
  }
  obtener() {
    let user = JSON.parse(localStorage.getItem('usuario')!);

    if (user.rol == 'usuario' && this.idUsuario != null) {
      this._estudianteService
        .getEstudianteById(user.idUsuario)
        .subscribe((resp) => {
          if (resp != null) {
            this._semetresService
              .getSemestres(resp.idMalla)
              .subscribe((res) => {
                let listString = JSON.stringify(res);
                const semestre: ISemestre[] = JSON.parse(listString);
                semestre.forEach((et) => {
                  this._semetresService
                    .getMaterias(et.idSemestre, et.idMalla)
                    .subscribe((rep) => {
                      const list = JSON.stringify(rep);
                      let materiaGe: IMateria[] = JSON.parse(list);
                      materiaGe.forEach((es) => {
                        this._estudianteService
                          .getEstudianteMaterias(resp.idEstudiante)
                          .subscribe((rl) => {
                            const list = JSON.stringify(rl);
                            const listMateria: IMateria[] = JSON.parse(list);
                            listMateria.forEach((e) => {
                              if (
                                (e.status == 'disponible' ||
                                  e.status == 'reprobado') &&
                                es.codigo == e.codigo
                              ) {
                                const este = {
                                  semestre: et.nombreSemestre,
                                };
                                this.materiasDispnibles.push(
                                  Object.assign(e, este)
                                );
                              }
                            });
                          });
                      });
                    });
                });
              });
          }
        });
    }
  }
}
