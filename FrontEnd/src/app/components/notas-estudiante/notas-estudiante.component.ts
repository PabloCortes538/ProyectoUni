import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { IMateria } from 'src/app/interface/imateria';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { SemestresService } from 'src/app/services/semestres.service';

@Component({
  selector: 'app-notas-estudiante',
  templateUrl: './notas-estudiante.component.html',
  styleUrls: ['./notas-estudiante.component.scss'],
})
export class NotasEstudianteComponent implements OnInit {
  @Input() idMateria?: number;
  @Input() idEstudiante?: number;
  materiasTE!: IMateria[];
  formularioNota!: FormGroup;
  notas: any = [];
  promedio: number = 0;
  materiasEstudiante: IMateria[] = [];
  constructor(
    private _estudianteService: EstudianteService,
    public fb: FormBuilder,
    private modalCtrl: ModalController,
    private _semestreService: SemestresService
  ) {
    this.formularioNota = this.fb.group({
      nombreNota: new FormControl('', Validators.required),
      nota: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.cargarDatos();
    this._semestreService.materias.subscribe((resp) => {
      this.materiasTE = [...resp];
    });
  }
  cargarDatos() {
    this.notas = [];
    this._estudianteService
      .getNotasMateria(this.idMateria!, this.idEstudiante!)
      .subscribe((resp) => {
        resp.forEach((e) => {
          this.notas.push(e[0]);
        });
        this.promedio = 0;
        for (let i = 0; this.notas.length > i; i++) {
          this.promedio += this.notas[i].nota;
        }
        console.log(this.notas.length);
        this.promedio =
          Math.round(
            (this.promedio / this.notas.length + Number.EPSILON) * 100
          ) / 100;
      });
  }
  guardarNota() {
    const f = this.formularioNota.value;
    const nota = {
      idMateria: this.idMateria,
      idEstudiante: this.idEstudiante,
      nombreNota: f.nombreNota,
      nota: f.nota,
    };

    this._estudianteService.newNotaMateria(nota).subscribe((resp) => {
      console.log(resp);
      this.cargarDatos();
      this.formularioNota.reset();
    });
  }
  borrar(idNota: number) {
    this._estudianteService.deleteNota(idNota).subscribe((resp) => {
      this.cargarDatos();
    });
  }
  final() {
    let status = {
      idMateria: this.idMateria,
      idEstudiante: this.idEstudiante,
      status: '',
      promedio: 0,
    };
    if (this.promedio >= 50) {
      status.promedio = this.promedio;
      status.status = 'aprobado';
      this._estudianteService.finalizarMateria(status).subscribe((resp) => {
        this._estudianteService.setMateriaAprobada(status).subscribe((resp) => {
          this.getMaterias(this.idEstudiante!);
        });
        this.modalCtrl.dismiss();
      });
    } else {
      status.status = 'reprobado';
      status.promedio = this.promedio;
      this._estudianteService.reprobadoMateria(status).subscribe((resp) => {
        this.modalCtrl.dismiss();
        location.reload();
      });
    }
  }
  getMaterias(idEstudiantes: number) {
    this._estudianteService
      .getEstudianteMaterias(idEstudiantes)
      .subscribe((resp) => {
        let listString = JSON.stringify(resp);
        this.materiasEstudiante = JSON.parse(listString);
        this.materiasEstudiante.forEach((e) => {
          this.materiasTE.forEach((re) => {
            console.log(re.nombreMateria);
            if (re.requisito == e.codigo && this.idMateria == e.idMateria) {
              const asig = {
                idMateria: re.idMateria,
                idEstudiante: this.idEstudiante,
                status: 'disponible',
              };
              console.log(re.nombreMateria);
              this._estudianteService.addMateria(asig).subscribe((resp) => {
                location.reload();
              });
            }
          });
        });
      });
  }
}
