import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IMateria } from 'src/app/interface/imateria';

import { MateriasPage } from 'src/app/pages/materias/materias.page';
import { EstudianteComponent } from '../estudiante/estudiante.component';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss'],
})
export class MateriaComponent implements OnInit {
  @Input() item!: IMateria;
  idEstudiante!: number;
  materias?: IMateria[];
  constructor(private _estudianteService: EstudianteService) {}

  ngOnInit() {
    this._estudianteService.estudiante?.subscribe((resp) => {
      if (resp.idEstudiante != null) {
        this.idEstudiante = resp.idEstudiante;
      }
    });
  }
  asignar(item: IMateria) {
    if (item.requisito == null || item.requisito == '') {
      this._estudianteService.addNewMateria(item);
    } else {
      //se busca si a aprobado la materia
      this._estudianteService
        .getEstudianteMaterias(this.idEstudiante)
        .subscribe((resp) => {
          let listString = JSON.stringify(resp);
          this.materias = JSON.parse(listString);
          this.materias?.forEach((e) => {
            if (item.requisito == e.codigo) {
              switch (e.status) {
                case 'aprobado':
                  this._estudianteService.addNewMateria(item);
                  break;
                case 'reprobado':
                  console.log('reprobado');
                  break;
                case 'cursando':
                  console.log('cursando');
                  break;
                case 'null':
                  console.log('error');
                  break;
              }
            }
          });
        });

      //se crea un alerta que tiene que aprobar la materia para poder tomar esta materia
    }
  }

  //pregunta si una materia tiene requisitos busca en las materias aprobadas,
  // si esta aprobada la materia con el requisito puede tomarla
}
