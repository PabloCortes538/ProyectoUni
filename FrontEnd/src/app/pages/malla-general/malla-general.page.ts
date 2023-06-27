import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISemestre } from 'src/app/interface/isemestre';

import { SemestresService } from 'src/app/services/semestres.service';

@Component({
  selector: 'app-malla-general',
  templateUrl: './malla-general.page.html',
  styleUrls: ['./malla-general.page.scss'],
})
export class MallaGeneralPage implements OnInit {
  semestres!: ISemestre[];
  idMalla!: number;

  constructor(
    private _semestreService: SemestresService,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idMalla = this.rutaActiva.snapshot.params['idMalla'];
    this.getSemestre(this.idMalla);
  }
  getSemestre(id: number) {
    this._semestreService.getSemestres(id).subscribe((resp) => {
      let listString = JSON.stringify(resp);
      this.semestres = JSON.parse(listString);
      console.log(this.semestres);
    });
  }
}
