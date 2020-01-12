import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Login} from '../Modelos/Login';
import {con} from '../Modelos/Configuracion';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  ip = con.ipser;
  GenerarLogin(log: Login)
  {
    return this.http.post<Login>(this.ip+'Usuarios/Usuarios.php', log);
  }
}
