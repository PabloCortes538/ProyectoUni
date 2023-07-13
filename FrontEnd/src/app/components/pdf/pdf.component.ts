import { style } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { IMateria } from 'src/app/interface/imateria';
import { ISemestre } from 'src/app/interface/isemestre';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { SemestresService } from 'src/app/services/semestres.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent implements OnInit {
  @Input() idUsuario: number;
  @Input() habilitado: boolean;
  MateriasAprobadas = [];
  MateriasReprobadas = [];

  constructor(
    private _estudianteService: EstudianteService,
    private _semestreService: SemestresService
  ) {}

  ngOnInit() {
    this.obtener();
  }
  obtener() {
    this.MateriasAprobadas = [];
    this.MateriasReprobadas = [];
    console.log(this.idUsuario);
    this._estudianteService
      .getEstudianteById(this.idUsuario)
      .subscribe((resp) => {
        if (resp != null) {
          this._estudianteService
            .getAllMateriasAprobadas(resp.idEstudiante)
            .subscribe((respt) => {
              respt.forEach((sol) => {
                this._estudianteService
                  .getMateriaById(sol.idMateria)
                  .subscribe((re) => {
                    this._semestreService
                      .getSemestreById(re[0].idSemestre)
                      .subscribe((s) => {
                        const fin = {
                          nombreMateria: re[0].nombreMateria,
                          nota: respt[0].promedio,
                          semestre: s[0].nombreSemestre,
                        };

                        this.MateriasAprobadas.push(fin);
                      });
                  });
              });
            });
          this._estudianteService
            .getAllMateriasReprobadas(resp.idEstudiante)
            .subscribe((respt) => {
              respt.forEach((sol) => {
                this._estudianteService
                  .getMateriaById(sol.idMateria)
                  .subscribe((re) => {
                    this._semestreService
                      .getSemestreById(re[0].idSemestre)
                      .subscribe((s) => {
                        const fin = {
                          nombreMateria: re[0].nombreMateria,
                          nota: respt[0].promedio,
                          semestre: s[0].nombreSemestre,
                        };

                        this.MateriasReprobadas.push(fin);
                      });
                  });
              });
            });
        }
      });
  }

  async crearPdf() {
    let nombreMateria = [];
    let materiasRe = [];
    materiasRe.push(['No', 'SEMESTRE', 'MATERIA', 'NOTA']);
    nombreMateria.push(['No', 'SEMESTRE', 'MATERIA', 'NOTA']);
    this.MateriasAprobadas.forEach((e, i) => {
      nombreMateria.push([i, e.semestre, e.nombreMateria, e.nota]);
    });
    this.MateriasReprobadas.forEach((e, i) => {
      materiasRe.push([i, e.semestre, e.nombreMateria, e.nota]);
    });

    const pdfContent: any = {
      content: [
        {
          text: 'UNIVERSIDAD UNANDES',
          style: 'header',
        },
        {
          text: 'REPORTE DE MATERIAS',
        },
        {
          text: 'APROBADOS',
          style: 'subheader',
        },
        {
          style: 'tableExample',
          table: {
            body: nombreMateria,
          },
        },
        {
          text: 'REPROBADOS',
          style: 'subheader',
        },
        {
          style: 'tableExample',
          table: {
            body: materiasRe,
          },
        },
      ],
    };
    const pdf = pdfMake.createPdf(pdfContent);
    pdf.open();
  }
}
