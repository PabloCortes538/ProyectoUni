import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-semestre',
  templateUrl: './new-semestre.component.html',
  styleUrls: ['./new-semestre.component.scss'],
})
export class NewSemestreComponent  implements OnInit {
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
    'DuoDecimoSemestre',
  ];
  constructor() { }

  ngOnInit() {}

}
