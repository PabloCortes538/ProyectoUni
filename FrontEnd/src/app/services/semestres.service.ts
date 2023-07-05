import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISemestre } from '../interface/isemestre';
import { IMateria } from '../interface/imateria';

@Injectable({
  providedIn: 'root',
})
export class SemestresService {
  private myAppUrl: string = environment.apiUrl;
  private myApiUrl: string = '/malla';
  private cartSemetres: ISemestre[] = [];
  private _semestres: BehaviorSubject<ISemestre[]> = new BehaviorSubject<
    ISemestre[]
  >([]);
  private cartMaterias:IMateria[]=[];
  private _materias:BehaviorSubject<IMateria[]>=new BehaviorSubject<IMateria[]>([])

  constructor(private http: HttpClient) {}

  getSemestres(id: number): Observable<ISemestre> {
    this.http
      .get<ISemestre>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
      .subscribe((resp) => {
        this.cartSemetres.push(resp);
        this._semestres.next(this.cartSemetres);
      });

    return this.http.get<ISemestre>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
  get semestre(){
    return this._semestres.asObservable();
  }
  getMaterias(id: number, idMalla: number): Observable<IMateria> {
    this.http.post<IMateria[]>(
      `${this.myAppUrl}${this.myApiUrl}/materias`,
      { id, idMalla }).subscribe(resp=>{
        this.cartMaterias.push(...resp)
        this._materias.next(this.cartMaterias)
      })
    return this.http.post<IMateria>(
      `${this.myAppUrl}${this.myApiUrl}/materias`,
      { id, idMalla }
    );
  }
  get materias(){
    return this._materias.asObservable();
  }
}
