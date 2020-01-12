import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { con } from '../Modelos/Configuracion';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  ip = con.ipser;
  constructor(private http:HttpClient) { }
  getProductos(){
    return this.http.get(this.ip + 'Productos/Productos.php')
  }

}
