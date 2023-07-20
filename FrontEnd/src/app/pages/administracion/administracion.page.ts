import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminEstudiantesComponent } from 'src/app/components/admin-estudiantes/admin-estudiantes.component';
import { IEstudiante } from 'src/app/interface/iestudiante';
import { DecanoService } from 'src/app/services/decano.service';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
})
export class AdministracionPage implements OnInit {
  listEstudiantes: IEstudiante[] = [];
  carreras = [];
  constructor(
    private _decanoService: DecanoService,
    private _estudianteServices: EstudianteService,
    private modalCtrl:ModalController
  ) {}

  ngOnInit() {
    this._estudianteServices.getCarreras().subscribe((resp) => {
      let listString = JSON.stringify(resp);
      this.carreras = JSON.parse(listString);
      this._decanoService.getAllEstudintes().subscribe((resp) => {
        resp.forEach((e) => {
          const p = this.carreras.find((s) => s.idMalla == e.idMalla);
          e.carrera = p.nombreMalla;
        });
        this.listEstudiantes = resp;
      });
    });
  }
  async datos(e:IEstudiante){
    const estudiante = await this.modalCtrl.create({
      component: AdminEstudiantesComponent,
      componentProps:{estudiante:e}
    });

    return await estudiante.present();
  }
}
