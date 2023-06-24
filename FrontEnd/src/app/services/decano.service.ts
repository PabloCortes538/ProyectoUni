import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICarrera } from '../interface/icarrera';
import { ISemestre } from '../interface/isemestre';
import { IMateria } from '../interface/imateria';

@Injectable({
  providedIn: 'root'
})
export class DecanoService {
  private myAppUrl: string = environment.apiUrl;
  private myApiUrl: string = '/decano';

  constructor(private http:HttpClient) { }

  //Crear un nueva Carrera
  newCarrera(carrera:ICarrera):Observable<ICarrera>{
    return this.http.post<ICarrera>(`${this.myAppUrl}${this.myApiUrl}/newCarrera`,carrera)
  }
  //crear un nuevo Semestre
  newSemestre(semestre:any):Observable<any>{    
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/newSemestre`,semestre)
  }
  //crear una nueva Materia
  newMateria(materia:IMateria):Observable<IMateria>{
    return this.http.post<IMateria>(`${this.myAppUrl}${this.myApiUrl}/newMateria`,materia)
  }
  //eliminar materia
  deleteMateria(id:number):Observable<IMateria>{
    return this.http.delete<IMateria>(`${this.myAppUrl}${this.myApiUrl}/materia/${id}`)
  }
  //modificar materia
  updateMateria(materia:IMateria):Observable<IMateria>{
    return this.http.put<IMateria>(`${this.myAppUrl}${this.myApiUrl}/materia/${materia.idMateria}`,materia)
  }
}

