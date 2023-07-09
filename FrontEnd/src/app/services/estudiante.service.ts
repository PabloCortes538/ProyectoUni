import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEstudiante } from '../interface/iestudiante';
import { ICarrera } from '../interface/icarrera';
import { IDecano } from '../interface/idecano';
import { IMateria } from '../interface/imateria';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private myAppUrl: string = environment.apiUrl;
  private myApiUrl: string = '/estudiantes';
  private cartMaterias: IMateria[] = [];
  private _materias: BehaviorSubject<IMateria[]> = new BehaviorSubject<
    IMateria[]
  >([]);
  private usuario?: IEstudiante;
  private _usuario?: BehaviorSubject<IEstudiante>;
  constructor(private http: HttpClient) {}
  //Preguntar si se encuentra el Estudiante registrado
  getEstudianteById(id: number): Observable<IEstudiante> {
    this.http
      .get<IEstudiante>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
      .subscribe((resp) => {
        this._usuario = new BehaviorSubject<IEstudiante>(resp);
      });
    return this.http.get<IEstudiante>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
  get estudiante() {
    const user = JSON.parse(localStorage.getItem('usuario')!);

    this.getEstudianteById(user.idUsuario).subscribe((resp) => {
      this._usuario = new BehaviorSubject<IEstudiante>(resp);
    });

    return this._usuario?.asObservable();
  }
  set setEstudiante(estudiante: IEstudiante) {
    this._usuario = new BehaviorSubject<IEstudiante>(estudiante);
  }
  //Preguntar si se encuentra el decano registrado
  getDecanoById(id: number): Observable<IDecano> {
    return this.http.get<IDecano>(
      `${this.myAppUrl}${this.myApiUrl}/decano/${id}`
    );
  }
  //Crea un nuevo estudiante
  newEstudiante(estudiante: IEstudiante): Observable<IEstudiante> {
    return this.http.post<IEstudiante>(
      `${this.myAppUrl}${this.myApiUrl}`,
      estudiante
    );
  }
  //Crear Decano
  newDecano(decano: IDecano): Observable<IDecano> {
    return this.http.post<IDecano>(
      `${this.myAppUrl}${this.myApiUrl}/decano`,
      decano
    );
  }
  //Consultar carreras
  getCarreras(): Observable<ICarrera> {
    return this.http.get<ICarrera>(`${this.myAppUrl}${this.myApiUrl}/carreras`);
  }
  get MateriasAsginadas() {
    return this._materias.asObservable();
  }
  //añadir una nueva materia a carrito de asignacion
  addNewMateria(materia: IMateria) {
    this.cartMaterias.push(materia);
    let servicesLimpio = Array.from(new Set(this.cartMaterias));
    this._materias.next(servicesLimpio);
  }
  deleteMateria(index: number) {
    this.cartMaterias.splice(index, 1);
    this._materias.next(this.cartMaterias);
  }
  enviado() {
    this.cartMaterias = [];
    this._materias.next(this.cartMaterias);
  }

  //Asignar Materias
  addMateria(asginacion: any): Observable<any> {
    return this.http.post<any>(
      `${this.myAppUrl}${this.myApiUrl}/materia`,
      asginacion
    );
  }
  updateMateria(asginacion: any): Observable<any> {
    return this.http.put<any>(
      `${this.myAppUrl}${this.myApiUrl}/materias`,
      asginacion
    );
  }
  //Materias del estudiante
  getEstudianteMaterias(idEstudiante: number): Observable<IMateria> {
    return this.http.get<IMateria>(
      `${this.myAppUrl}${this.myApiUrl}/materia/${idEstudiante}`
    );
  }
  //Notas Materia
  getNotasMateria(idMateria: number, idEstudiante: number): Observable<any[]> {
    let nota = {
      idMateria: idMateria,
      idEstudiante: idEstudiante,
    };
    return this.http.post<any[]>(
      `${this.myAppUrl}${this.myApiUrl}/notas`,
      nota
    );
  }
  //nueva nota
  newNotaMateria(nota: any): Observable<any> {
    return this.http.post<any[]>(`${this.myAppUrl}${this.myApiUrl}/nota`, nota);
  }
  //borrar nota
  deleteNota(idNota: number): Observable<any> {
    return this.http.delete<any>(
      `${this.myAppUrl}${this.myApiUrl}/nota/${idNota}`
    );
  }
  finalizarMateria(status: any): Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/nota`, status);
  }
  reprobadoMateria(status: any): Observable<any> {
    return this.http.post<any>(
      `${this.myAppUrl}${this.myApiUrl}/notaR`,
      status
    );
  }
  getMateriasReprobadas(estudiante: any): Observable<any> {
    return this.http.post<any>(
      `${this.myAppUrl}${this.myApiUrl}/reprobados`,
      estudiante
    );
  }
  setMateriaAprobada(aprobado: any): Observable<any> {
    return this.http.post<any>(
      `${this.myAppUrl}${this.myApiUrl}/notaA`,
      aprobado
    );
  }
  getMateriaAprobada(estudiante: any): Observable<any> {
    return this.http.post<any>(
      `${this.myAppUrl}${this.myApiUrl}/aprobados`,
      estudiante
    );
  }
  updateEstudiantePerfil(estudiante: IEstudiante): Observable<IEstudiante> {
    return this.http.put<IEstudiante>(
      `${this.myAppUrl}${this.myApiUrl}/updateEstudiante`,
      estudiante
    );
  }  
}
