import { Component, OnInit } from '@angular/core';
import { ICarrera } from 'src/app/interface/icarrera';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { SemestresService } from 'src/app/services/semestres.service';

@Component({
  selector: 'app-add-carrera',
  templateUrl: './add-carrera.page.html',
  styleUrls: ['./add-carrera.page.scss'],
})
export class AddCarreraPage implements OnInit {
  carreras!:ICarrera[];
  constructor(private _estudianteServices:EstudianteService) { }

  ngOnInit() {
    this.getCarreras()
  }

  getCarreras(){
    this._estudianteServices.getCarreras().subscribe((resp)=>{
      let listString = JSON.stringify(resp)
      this.carreras = JSON.parse(listString);
    })
  }
  newCarrera(){
    
  }

}
