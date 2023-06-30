import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MateriaComponent } from 'src/app/components/materia/materia.component';
import { IMateria } from 'src/app/interface/imateria';
import { ISemestre } from 'src/app/interface/isemestre';
import { SemestresService } from 'src/app/services/semestres.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  isOpen: boolean = false;
  semestre!: ISemestre;
  listMaterias!: IMateria[];

  constructor(
    private rutaActiva: ActivatedRoute,
    private _semestreService: SemestresService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.semestre = {
      idSemestre: parseInt(
        this.rutaActiva.snapshot.paramMap.get('idSemestre')!
      ),
      nombreSemestre: this.rutaActiva.snapshot.paramMap.get('nombreSemestre')!,
      idMalla: parseInt(this.rutaActiva.snapshot.paramMap.get('idMalla')!),
    };
    this.getMaterias(this.semestre.idSemestre, this.semestre.idMalla);
    console.log(this.semestre);
  }
  getMaterias(id: number, idMalla: number) {
    this._semestreService.getMaterias(id, idMalla).subscribe((resp) => {
      let listString = JSON.stringify(resp);
      this.listMaterias = JSON.parse(listString);
      console.log(this.listMaterias);
    });
  }
  abrir() {
    this.isOpen = true;
  }
  abrirModal(): boolean {
    if (this.isOpen) {
      return true;
    }
    return false;
  }

  async presentModal(item: IMateria) {
    const materia = await this.modalController.create({
      component: MateriaComponent,
      componentProps: { item: item },
      cssClass: 'contenido',
    });
    return await materia.present();
  }
}
