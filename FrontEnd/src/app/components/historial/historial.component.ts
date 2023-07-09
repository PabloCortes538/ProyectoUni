import { Component, Input, OnInit } from '@angular/core';
import { IMateria } from 'src/app/interface/imateria';
import { EstudianteComponent } from '../estudiante/estudiante.component';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {
  @Input() materia!: IMateria;
  estudiante!: IEstudiante;
  idEstudianteReprobado: any[] = [];
  materiasAprobadas: any[] = [];
  constructor(
    private _estudianteService: EstudianteService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getEstudiante();
  }
  getEstudiante() {
    this._estudianteService.estudiante?.subscribe((resp) => {
      this.estudiante = resp;
      this.getReprobado();
      this.getAprobado();
    });
  }
  getReprobado() {
    const estudianteMateria = {
      idEstudiante: this.estudiante.idEstudiante,
      idMateria: this.materia.idMateria,
    };
    this._estudianteService
      .getMateriasReprobadas(estudianteMateria)
      .subscribe((resp) => {
        this.idEstudianteReprobado.push(...resp);
      });
  }
  getAprobado() {
    const estudianteMateria = {
      idEstudiante: this.estudiante.idEstudiante,
      idMateria: this.materia.idMateria,
    };
    this._estudianteService
      .getMateriaAprobada(estudianteMateria)
      .subscribe((resp) => {
        this.materiasAprobadas.push(...resp);
      });
  }
  cerrar() {
    this.modalCtrl.dismiss();
  }
}
