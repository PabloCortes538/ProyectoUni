import { Component, OnInit } from '@angular/core';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { IMateria } from 'src/app/interface/imateria';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-asginar-materia',
  templateUrl: './asginar-materia.component.html',
  styleUrls: ['./asginar-materia.component.scss'],
})
export class AsginarMateriaComponent implements OnInit {
  listMaterias: IMateria[] = [];
  materia!: IMateria;
  estudiante!: IEstudiante;
  constructor(private _estudianteService: EstudianteService) {}

  ngOnInit() {
    this._estudianteService.MateriasAsginadas.subscribe((resp) => {
      this.listMaterias = resp;
    });
    this._estudianteService.estudiante?.subscribe((resp) => {
      this.estudiante = resp;
    });
  }
  asignar() {
    this.listMaterias.forEach((e) => {
      this.materia = e;
      this.materia.status = 'cursando';
      const asig = {
        idMateria:e.idMateria,
        idEstudiante:this.estudiante.idEstudiante,
        status:e.status
      }
      console.log(asig)
      this._estudianteService.addMateria(asig).subscribe((resp) => {
        console.log(resp);
      });
    });
  }
}
