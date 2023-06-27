import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISemestre } from '../interface/isemestre';
import { IMateria } from '../interface/imateria';

@Injectable({
  providedIn: 'root'
})
export class SemestresService {
  private myAppUrl: string = environment.apiUrl;
  private myApiUrl: string = '/malla';
  
  constructor(private http:HttpClient) { }

  getSemestres(id:number):Observable<ISemestre>{
    
    return this.http.get<ISemestre>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }
  getMaterias(id:number,idMalla:number):Observable<IMateria>{
    
    return this.http.post<IMateria>(`${this.myAppUrl}${this.myApiUrl}/materias`,{id,idMalla})
  }
}
