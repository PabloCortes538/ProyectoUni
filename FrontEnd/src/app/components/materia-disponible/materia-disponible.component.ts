import { Component, Input, OnInit } from '@angular/core';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { IMateria } from 'src/app/interface/imateria';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-materia-disponible',
  templateUrl: './materia-disponible.component.html',
  styleUrls: ['./materia-disponible.component.scss'],
})
export class MateriaDisponibleComponent implements OnInit {
  @Input() idEstudiante?: number;
  @Input() idUsuario: number;
  @Input() rol?: string;
  @Input() habilitado: boolean;
  estudiante?: IEstudiante;
  materiasDispnibles: IMateria[] = [];
  constructor(private _estudianteService: EstudianteService) {}

  ngOnInit() {
    
      this.obtener();
    
  }
  obtener() {
    let user = JSON.parse(localStorage.getItem('usuario')!);

    if (user.rol == 'usuario' && this.idUsuario != null) {
      console.log(this.idUsuario);

      this._estudianteService
        .getEstudianteById(user.idUsuario)
        .subscribe((resp) => {
          if (resp!= null) {
            this._estudianteService
              .getEstudianteMaterias(resp.idEstudiante!)
              .subscribe((resp) => {
                const list = JSON.stringify(resp);
                const listMateria: IMateria[] = JSON.parse(list);

                listMateria.forEach((e) => {
                  if (e.status == 'disponible') {
                    this.materiasDispnibles.push(e);
                  }
                });
              });
          }
        });
    }
  }
}
