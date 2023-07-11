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
  @Input() idUsuario!: number;
  @Input() rol?: string;
  estudiante?: IEstudiante;
  materiasDispnibles: IMateria[] = [];
  constructor(private _estudianteService: EstudianteService) {}

  ngOnInit() {
    this.obtener();
  }
  async obtener() {
    let user = await JSON.parse(localStorage.getItem('usuario')!);
    let estudiante = await JSON.parse(localStorage.getItem('estudiante')!);
    console.log(estudiante);
    if (user.rol == 'usuario' && estudiante != null) {
      await this._estudianteService
        .getEstudianteById(user.idUsuario)
        .subscribe((resp) => {
          if (resp.idEstudiante != null) {
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
    if(estudiante!=null){
      
    }
  }
}
