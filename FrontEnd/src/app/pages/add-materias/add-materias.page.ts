import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { EditMateriaComponent } from 'src/app/components/edit-materia/edit-materia.component';
import { IMateria } from 'src/app/interface/imateria';
import { ISemestre } from 'src/app/interface/isemestre';
import { DecanoService } from 'src/app/services/decano.service';
import { SemestresService } from 'src/app/services/semestres.service';

@Component({
  selector: 'app-add-materias',
  templateUrl: './add-materias.page.html',
  styleUrls: ['./add-materias.page.scss'],
})
export class AddMateriasPage implements OnInit {
  semestre!: ISemestre;
  formMateria!: FormGroup;
  materias: IMateria[] = [];
  isModalOpen = false;
  newM!: IMateria;
  @ViewChild(IonModal) modal!: IonModal;
  @Input() appaddmaterias!: number;

  constructor(
    private rutaActiva: ActivatedRoute,
    private _semestreService: SemestresService,
    private _decanoService: DecanoService,
    public fb: FormBuilder,
    private modalController: ModalController
  ) {
    this.formMateria = this.fb.group({
      nombreMateria: new FormControl('', Validators.required),
      horasTeoricas: new FormControl('', Validators.required),
      horasPracticas: new FormControl('', Validators.required),
      creditos: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
      costo: new FormControl('', Validators.required),
      requisito: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.semestre = {
      idSemestre: this.rutaActiva.snapshot.params['idSemestre'],
      nombreSemestre: this.rutaActiva.snapshot.params['nombreSemestre'],
      idMalla: this.rutaActiva.snapshot.params['idMalla'],
    };
    this.getMaterias();
  }
  getMaterias() {
    this._semestreService
      .getMaterias(this.semestre.idSemestre, this.semestre.idMalla)
      .subscribe((resp) => {
        let listString = JSON.stringify(resp);
        this.materias = JSON.parse(listString);
      });
  }
  newMateria() {
    var f = this.formMateria.value;

    const newM: IMateria = {
      nombreMateria: f.nombreMateria,
      horasTeoricas: parseInt(f.horasTeoricas),
      horasPracticas: parseInt(f.horasPracticas),
      idSemestre: this.semestre.idSemestre,
      creditos: parseInt(f.creditos),
      codigo: f.codigo,
      costo: parseInt(f.costo),
      requisito: f.requisito,
    };
    console.log(newM);
    this._decanoService.newMateria(newM).subscribe((resp) => {
      console.log(resp);
      this.getMaterias();
      this.formMateria.reset();
    });
  }
  deleteM(item: IMateria) {
    if (item.idMateria != null) {
      this._decanoService.deleteMateria(item.idMateria).subscribe((resp) => {
        console.log(resp);
        this.getMaterias();
      });
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  refrescar() {
    location.reload();
  }
  async modalEdit(item: IMateria) {
    const materia = await this.modalController.create({
      component: EditMateriaComponent,
      componentProps: {
        materia: item,
      },
    });
    return await materia.present();
  }
}
