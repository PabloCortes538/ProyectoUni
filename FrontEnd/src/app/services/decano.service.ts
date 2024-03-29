import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICarrera } from '../interface/icarrera';
import { ISemestre } from '../interface/isemestre';
import { IMateria } from '../interface/imateria';
import { IEstudiante } from '../interface/iestudiante';

@Injectable({
  providedIn: 'root',
})
export class DecanoService {
  private myAppUrl: string = environment.apiUrl;
  private myApiUrl: string = '/decano';
  private cartCarrera: ICarrera[] = [];
  private _cartCarrera: BehaviorSubject<ICarrera[]> = new BehaviorSubject<
    ICarrera[]
  >([]);

  constructor(private http: HttpClient) {}

  //Crear un nueva Carrera
  newCarrera(carrera: ICarrera): Observable<ICarrera> {
    this.cartCarrera.push(carrera);
    this._cartCarrera.next(this.cartCarrera);
    return this.http.post<ICarrera>(
      `${this.myAppUrl}${this.myApiUrl}/newCarrera`,
      carrera
    );
  }
  get newCarreraG() {
    return this._cartCarrera?.asObservable();
  }
  //crear un nuevo Semestre
  newSemestre(semestre: Object): Observable<Object> {
    return this.http.post<Object>(
      `${this.myAppUrl}${this.myApiUrl}/newSemestre`,
      semestre
    );
  }
  //crear una nueva Materia
  newMateria(materia: IMateria): Observable<IMateria> {
    return this.http.post<IMateria>(
      `${this.myAppUrl}${this.myApiUrl}/newMateria`,
      materia
    );
  }
  //eliminar materia
  deleteMateria(id: number): Observable<IMateria> {
    return this.http.delete<IMateria>(
      `${this.myAppUrl}${this.myApiUrl}/materia/${id}`
    );
  }
  //modificar materia
  updateMateria(materia: IMateria): Observable<IMateria> {
    return this.http.put<IMateria>(
      `${this.myAppUrl}${this.myApiUrl}/materia/${materia.idMateria}`,
      materia
    );
  }
  getAllEstudintes(): Observable<IEstudiante[]> {
    return this.http.get<IEstudiante[]>(
      `${this.myAppUrl}${this.myApiUrl}/estudiantes`
    );
  }
  updateStatusEstudiante(
    idEstudiante: number,
    statusEstudiante: string
  ): Observable<any> {
    return this.http.put<any>(
      `${this.myAppUrl}${this.myApiUrl}/estudianteStatus`,
      { idEstudiante: idEstudiante, statusEstudiante: statusEstudiante }
    );
  }
}
