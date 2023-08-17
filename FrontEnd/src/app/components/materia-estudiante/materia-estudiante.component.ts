import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { IMateria } from 'src/app/interface/imateria';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { SemestresService } from 'src/app/services/semestres.service';
import { NotasEstudianteComponent } from '../notas-estudiante/notas-estudiante.component';

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
  colorReprobado = 'danger';
  colorCursando = 'toolbar-malla';
  colorAprobado = 'disponible';
  materiasEstudiante: IMateria[] = [];
  constructor(
    private _semestreService: SemestresService,
    private _estudianteService: EstudianteService,
    private modalCtrl: ModalController
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
        //console.log(this.materias);
      });
  }
  materiaConsulta(materia: IMateria): string {
    if (materia.requisito == '' && materia.status == null || materia.requisito==null && materia.status == null ) {
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
  async notas(idMateria?: number, status?: string) {
    if (status == 'cursando') {
      const modal = await this.modalCtrl.create({
        component: NotasEstudianteComponent,
        cssClass: 'contenido',
        componentProps: {
          idMateria: idMateria,
          idEstudiante: this.idEstudiante,
          materias:this.materias
        },
      });
      await modal.present();
    }
  }
}
