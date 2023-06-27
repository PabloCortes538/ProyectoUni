import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ICarrera } from 'src/app/interface/icarrera';
import { ISemestre } from 'src/app/interface/isemestre';
import { SemestresService } from 'src/app/services/semestres.service';
import { NewSemestreComponent } from '../new-semestre/new-semestre.component';
import { DecanoService } from 'src/app/services/decano.service';

@Component({
  selector: 'app-new-materia',
  templateUrl: './new-materia.component.html',
  styleUrls: ['./new-materia.component.scss'],
})
export class NewMateriaComponent implements OnInit {
  @Input() item!: ICarrera;
  semestre: ISemestre[] = [];
  idMalla: number = 0;
  Semestres: string[] = [
    'Primer Semestre',
    'Segundo Semestre',
    'Tercer Semestre',
    'Cuarto Semestre',
    'Quinto Semestre',
    'Sexto Semestre',
    'Septimo Semestre',
    'Octavo Semestre',
    'Noveno Semestre',
    'Decimo Semestre',
    'UnDecimo Semestre',
    'DuoDecimo Semestre',
  ];
  constructor(
    private modalCtrl: ModalController,
    private _semestreService: SemestresService,
    private _decanoService: DecanoService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.item.idMalla != null) {
      this.idMalla = this.item.idMalla;

      this.getSemestres();
    }
  }
  getSemestres() {
    this._semestreService.getSemestres(this.idMalla).subscribe((resp) => {
      let listString = JSON.stringify(resp);
      this.semestre = JSON.parse(listString);
      
    });
  }
  addSemestre(nombreMalla: string) {
    if (this.semestre.length != 11) {
      const ob = {
        "nombreSemestre": this.Semestres[this.semestre.length],
        "idMalla": this.idMalla,
      };
      
      if (ob != null) {
        this._decanoService.newSemestre(ob).subscribe((resp) => {
          this.getSemestres();          
        });
      }
    }
  }

  materias(item: ISemestre) {
    this.router.navigate(['/add-materias', item]);
    this.cerrar();
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
