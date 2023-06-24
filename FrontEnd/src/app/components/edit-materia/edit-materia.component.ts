import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal, ModalController } from '@ionic/angular';
import { IMateria } from 'src/app/interface/imateria';
import { DecanoService } from 'src/app/services/decano.service';

@Component({
  selector: 'app-edit-materia',
  templateUrl: './edit-materia.component.html',
  styleUrls: ['./edit-materia.component.scss'],
})
export class EditMateriaComponent implements OnInit {
  @Input() materia?: any;
  formMateria!: FormGroup;
  constructor(public fb: FormBuilder, private modalController: ModalController, private _decanoService: DecanoService) {

  }

  ngOnInit() {
    this.formMateria = this.fb.group({
      'nombreMateria': new FormControl(this.materia.nombreMateria, [Validators.required]),
      'horasTeoricas': new FormControl(this.materia.horasTeoricas, Validators.required),
      'horasPracticas': new FormControl(this.materia.horasPracticas, Validators.required),
      'creditos': new FormControl(this.materia.creditos, Validators.required),
      'codigo': new FormControl(this.materia.codigo, Validators.required),
      'costo': new FormControl(this.materia.costo, Validators.required),
      'requisito': new FormControl(this.materia.requisito, Validators.required)
    })
    console.log(this.materia)

  }

  async setOpen(isOpen: boolean) {
    const modal = await this.modalController.getTop();
    modal?.dismiss();
  }

 async update() {
    
    var f = this.formMateria.value
    const materiaN: IMateria = {
      idMateria: this.materia.idMateria,
      nombreMateria: f.nombreMateria,
      horasTeoricas: f.horasTeoricas,
      horasPracticas: f.horasPracticas,
      creditos: f.creditos,
      codigo: f.codigo,
      costo: f.costo,
      requisito: f.requisito
    }
    
      this._decanoService.updateMateria(materiaN).subscribe((resp) => {
        
        
      })
      location.reload();


  }

}
