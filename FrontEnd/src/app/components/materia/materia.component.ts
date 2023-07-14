import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IMateria } from 'src/app/interface/imateria';

import { MateriasPage } from 'src/app/pages/materias/materias.page';
import { EstudianteComponent } from '../estudiante/estudiante.component';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss'],
})
export class MateriaComponent implements OnInit {
  @Input() item!: IMateria;
  idEstudiante!: number;
  materias?: IMateria[];
  statusColor = ['#5bf57d'];
  alertButtons = ['ok'];
  openAlert: boolean = false;
  mensaje: string = '';
  constructor(
    private _estudianteService: EstudianteService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.getEstudiante();
  }
  getEstudiante() {
    this._estudianteService.estudiante?.subscribe((resp) => {
      if (resp.idEstudiante != null) {
        this.idEstudiante = resp.idEstudiante;
      }
    });
  }
  asignar(item: IMateria) {
    let ban:boolean=true;
    this.getEstudiante();
    if (item.requisito == null || item.requisito == '') {
      this._estudianteService
        .getEstudianteMaterias(this.idEstudiante)
        .subscribe((resp) => {
          let listString = JSON.stringify(resp);
          this.materias = JSON.parse(listString);
          let banderaCursando: boolean = false;
          let banderaAprobado: boolean = false;
          this.materias?.forEach((e) => {
            if (item.codigo == e.codigo) {
              if (e.status == 'cursando') {
                this.mensaje = 'Estas Cursando esta Materia';
                this.alert(this.mensaje);
                banderaCursando = true;
              }
              if (e.status == 'aprobado') {
                banderaAprobado = true;
              }
            }
          });
          if (!banderaCursando && !banderaAprobado) {
            this._estudianteService.MateriasAsginadas.subscribe(e=>{
              e.find(e=>{
                if(e.codigo===item.codigo)
                {
                  ban=false;                        
                }
              })
              
            })
            if(ban){                      
              this._estudianteService.addNewMateria(item);
              this.alert("Subido Al carrito")
              ban=false;
            }else{
              this.alert("Ya Existe en el carrito de asignacion")
            }
          }
          if (banderaAprobado) {
            this.mensaje = 'Aprobaste esta materia';
            this.alert(this.mensaje);
          }
        });
    } else {
      //se busca si a aprobado la materia
      this._estudianteService
        .getEstudianteMaterias(this.idEstudiante)
        .subscribe((resp) => {
          let listString = JSON.stringify(resp);
          this.materias = JSON.parse(listString);
          this.materias?.forEach((e) => {
            
            if (item.requisito == e.codigo) {
              switch (e.status) {
                case 'aprobado':
                  this._estudianteService.MateriasAsginadas.subscribe(e=>{
                    e.find(e=>{
                      if(e.codigo===item.codigo)
                      {
                        ban=false;                        
                      }
                    })
                    
                  })
                  if(ban){                      
                    this._estudianteService.addNewMateria(item);
                    this.alert("Subido Al carrito")
                    ban=false;
                  }else{
                    this.alert("Ya Existe en el carrito de asignacion")
                  }
                  break;
                case 'reprobado':
                  this.mensaje =
                    'No puedes tomar la materia porque no cumples los requisitos';
                  this.alert(this.mensaje);

                  break;
                case 'cursando':
                  this.mensaje =
                    'No puedes tomar la materia por que estas cursando otra materia';
                  this.alert(this.mensaje);

                  break;
                case null:
                  this.alert('Error');

                  break;
                default:
                  if (item.requisito == e.codigo) {
                    this.mensaje =
                      'No cumples con los requisitos  ' + e.nombreMateria;
                    this.alert(this.mensaje);
                  }

                  break;
              }
            }
            if (item.nombreMateria == e.nombreMateria) {
              switch (e.status) {
                case 'reprobado':
                  this.mensaje =
                    'No puedes tomar la materia porque no cumples los requisitos';
                  this.alert(this.mensaje);

                  break;
                case 'cursando':
                  this.mensaje =
                    'No puedes tomar la materia por que estas cursando otra materia ';
                  this.alert(this.mensaje);

                  break;
                case null:
                  this.alert('Error');

                  break;
              }
            }
          });
        });

      //se crea un alerta que tiene que aprobar la materia para poder tomar esta materia
    }
  }
  cerrar() {
    this.modalCtrl.dismiss();
  }

  //pregunta si una materia tiene requisitos busca en las materias aprobadas,
  // si esta aprobada la materia con el requisito puede tomarla
  async alert(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: mensaje,      
      buttons: ['OK'],
    });
    await alert.present();
  }
}
