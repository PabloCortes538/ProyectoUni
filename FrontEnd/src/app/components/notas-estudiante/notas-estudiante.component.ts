import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-notas-estudiante',
  templateUrl: './notas-estudiante.component.html',
  styleUrls: ['./notas-estudiante.component.scss'],
})
export class NotasEstudianteComponent implements OnInit {
  @Input() idMateria?: number;
  @Input() idEstudiante?: number;
  formularioNota!: FormGroup;
  notas: any = [];
  promedio: number = 0;
  constructor(
    private _estudianteService: EstudianteService,
    public fb: FormBuilder
  ) {
    this.formularioNota = this.fb.group({
      nombreNota: new FormControl('', Validators.required),
      nota: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.cargarDatos();
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
    if (f.nombreNota == '' && f.nota == null) {
      this._estudianteService.newNotaMateria(nota).subscribe((resp) => {
        this.cargarDatos();
      });
    }
  }
  borrar(idNota: number) {
    this._estudianteService.deleteNota(idNota).subscribe((resp) => {
      this.cargarDatos();
    });
  }
}
