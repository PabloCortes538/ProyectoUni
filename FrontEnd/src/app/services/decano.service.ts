import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICarrera } from '../interface/icarrera';
import { ISemestre } from '../interface/isemestre';

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
}
