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
    this._materias.next(this.cartMaterias);
  }
  deleteMateria(index: number) {
    this.cartMaterias.splice(index, 1);
    this._materias.next(this.cartMaterias);
  }
  enviado(){
    this.cartMaterias = []
    this._materias.next(this.cartMaterias)
  }

  //Asignar Materias
  addMateria(asginacion: any): Observable<any> {
    return this.http.post<any>(
      `${this.myAppUrl}${this.myApiUrl}/materia`,
      asginacion
    );
  }
  //Materias del estudiante
  getEstudianteMaterias(idEstudiante: number): Observable<IMateria> {
    return this.http.get<IMateria>(
      `${this.myAppUrl}${this.myApiUrl}/materia/${idEstudiante}`
    );
  }
}
