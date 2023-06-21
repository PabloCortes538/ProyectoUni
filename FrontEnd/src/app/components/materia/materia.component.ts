import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IMateria } from 'src/app/interface/imateria';

import { MateriasPage } from 'src/app/pages/materias/materias.page';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss'],
})
export class MateriaComponent  implements OnInit {
  @Input() item!:IMateria;
  
  
  
  constructor() { 
    
  }

  ngOnInit() {
    
      
    
  }

  
}
