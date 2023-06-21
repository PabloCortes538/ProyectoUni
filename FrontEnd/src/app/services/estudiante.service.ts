import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEstudiante } from '../interface/iestudiante';
import { ICarrera } from '../interface/icarrera';
import { IDecano } from '../interface/idecano';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private myAppUrl: string = environment.apiUrl;
  private myApiUrl: string = '/estudiantes';
  constructor(private http:HttpClient) { }
  //Preguntar si se encuentra el Estudiante registrado
  getEstudianteById(id:number):Observable<IEstudiante>{
    return this.http.get<IEstudiante>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }
  //Preguntar si se encuentra el decano registrado
  getDecanoById(id:number):Observable<IDecano>{
    return this.http.get<IDecano>(`${this.myAppUrl}${this.myApiUrl}/decano/${id}`)
  }
  //Crea un nuevo estudiante
  newEstudiante(estudiante:IEstudiante):Observable<IEstudiante>{
    return this.http.post<IEstudiante>(`${this.myAppUrl}${this.myApiUrl}`,estudiante)
  }
  //Crear Decano
  newDecano(decano:IDecano):Observable<IDecano>{
    return this.http.post<IDecano>(`${this.myAppUrl}${this.myApiUrl}/decano`,decano)
  }
  //Consultar carreras
  getCarreras():Observable<ICarrera>{
    return this.http.get<ICarrera>(`${this.myAppUrl}${this.myApiUrl}/carreras`)
  }
}
