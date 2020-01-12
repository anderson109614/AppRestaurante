import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { con } from '../Modelos/Configuracion';
import {FacturaMaestro} from '../Modelos/FacuraMaestro';
import {ProductoFactura} from '../Modelos/ProductoFactura'
@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http:HttpClient) { }
  ip = con.ipser;
  GuardarMaestro(mae: FacturaMaestro)
  {
    return this.http.post<FacturaMaestro>(this.ip+'Factura/Maestro.php', mae);
  }
  GuardarDetalle(mae: ProductoFactura)
  {
    return this.http.post<ProductoFactura>(this.ip+'Factura/Detalle.php', mae);
  }
}
