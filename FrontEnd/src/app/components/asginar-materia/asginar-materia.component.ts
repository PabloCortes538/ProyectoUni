import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  posicion?: number;
  total:number;
  constructor(
    private _estudianteService: EstudianteService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getMaterias();
    this._estudianteService.estudiante?.subscribe((resp) => {
      this.estudiante = resp;
    });
  }
  getMaterias() {
    let  totalAPagar:number=0;
    this._estudianteService.MateriasAsginadas.subscribe((resp) => {
      this.listMaterias = resp;
      console.log(this.listMaterias)
      this.listMaterias.forEach(e=>{
        console.log(e.costo)
        totalAPagar= totalAPagar+ e.costo;
        console.log(totalAPagar)
        this.total = totalAPagar

      })
    });
  }
  asignar() {
    this.listMaterias.forEach((e) => {
      this.materia = e;

      this.materia.status = 'cursando';
      const asig = {
        idMateria: e.idMateria,
        idEstudiante: this.estudiante.idEstudiante,
        status: e.status,
      };

      this._estudianteService.addMateria(asig).subscribe((resp) => {});

      this._estudianteService.enviado();
      this.modalCtrl.dismiss();
      location.reload();
    });
  }
  delete(index: number) {
    this._estudianteService.deleteMateria(index);
  }
}
