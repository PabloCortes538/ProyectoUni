import { Component, Input, OnInit } from '@angular/core';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { IMateria } from 'src/app/interface/imateria';

import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-materia-cursando',
  templateUrl: './materia-cursando.component.html',
  styleUrls: ['./materia-cursando.component.scss'],
})
export class MateriaCursandoComponent implements OnInit {
  materiasDispnibles: IMateria[] = [];
  estudiante?: IEstudiante;
  @Input() rol?: string;
  constructor(private _estudianteService: EstudianteService) {}

  ngOnInit() {
    this.obtener()
    
  }
  async obtener(){
     const estudiante = await JSON.parse(localStorage.getItem('estudiante')!);
    console.log(estudiante);

    const user = await JSON.parse(localStorage.getItem('usuario')!);
    if (user.rol == 'usuario' && estudiante != null) {
      this._estudianteService
        .getEstudianteById(user.idUsuario)
        .subscribe((resp) => {
          if (resp.idEstudiante != null) {
            this._estudianteService
              .getEstudianteMaterias(resp.idEstudiante!)
              .subscribe((resp) => {
                const list = JSON.stringify(resp);
                const listMateria: IMateria[] = JSON.parse(list);
                listMateria.forEach((e) => {
                  if (e.status == 'cursando') {
                    this.materiasDispnibles.push(e);
                  }
                });
                
              });
          }
        });
    }
   
  }
}
