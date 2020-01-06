import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {con} from '../Modelos/Configuracion';
import { Cliente } from '../Modelos/Cliente';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  ip = con.ipser;
  constructor(private http:HttpClient) { }
  getClientes(){
    return this.http.get(this.ip + 'Clientes/Clientes.php')
  }
  PostClientes(cli:Cliente){
    return this.http.post<Cliente>(this.ip + 'Clientes/Clientes.php',cli)
  }
}
