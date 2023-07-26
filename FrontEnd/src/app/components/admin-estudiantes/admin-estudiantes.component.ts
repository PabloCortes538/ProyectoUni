import { Component, Input, OnInit } from '@angular/core';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { EstudianteComponent } from '../estudiante/estudiante.component';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { IMateria } from 'src/app/interface/imateria';
import { DecanoService } from 'src/app/services/decano.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-admin-estudiantes',
  templateUrl: './admin-estudiantes.component.html',
  styleUrls: ['./admin-estudiantes.component.scss'],
})
export class AdminEstudiantesComponent implements OnInit {
  @Input() estudiante: IEstudiante;
  listMateriasAprobadas: IMateria[] = [];
  listMateriasCursando: IMateria[] = [];
  listMateriasReprobadas: IMateria[] = [];

  constructor(
    private _estudianteService: EstudianteService,
    private _decanoService: DecanoService,
    private modalCtrl:ModalController
  ) {}

  ngOnInit() {
    this._estudianteService
      .getEstudianteMaterias(this.estudiante.idEstudiante)
      .subscribe((resp) => {
        let listString = JSON.stringify(resp);
        const list: IMateria[] = JSON.parse(listString);
        list.forEach((e) => {
          switch (e.status) {
            case 'aprobado':
              this.listMateriasAprobadas.push(e);
              break;
            case 'reprobado':
              this.listMateriasReprobadas.push(e);
              break;
            case 'cursando':
              this.listMateriasCursando.push(e);
              break;
          }
        });
      });
  }
  cambiarEstado() {
    if (this.estudiante.statusEstudiante == 'activo') {
      this._decanoService
        .updateStatusEstudiante(this.estudiante.idEstudiante, 'parado')
        .subscribe((resp) => {
          console.log(resp);
          this.estudiante.statusEstudiante="parado"
        });
    } else {
      this._decanoService
        .updateStatusEstudiante(this.estudiante.idEstudiante, 'activo')
        .subscribe((resp) => {
          console.log(resp);
          this.estudiante.statusEstudiante="activo"
        });
    }
  }
  cerrar(){
    this.modalCtrl.dismiss();
  }
}
