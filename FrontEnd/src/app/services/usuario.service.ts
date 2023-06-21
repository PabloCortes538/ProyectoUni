import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interface/iusuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myAppUrl: string = environment.apiUrl;
  private myApiUrl: string = '/usuarios';
  constructor(private http:HttpClient) { }
  //Consulta si existe Usuario registrado
  autenticacion(usuario:IUsuario):Observable<IUsuario>{
    return this.http.post<IUsuario>(`${this.myAppUrl}${this.myApiUrl}`,usuario)
  }
  //Registra un nuevo Usuario
  registro(usuario:IUsuario):Observable<IUsuario>{
    return this.http.post<IUsuario>(`${this.myAppUrl}${this.myApiUrl}/registro`,usuario)
  }
}
