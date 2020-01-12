import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LisClientesPage } from '../Pages/lis-clientes/lis-clientes.page';
import { NewClientesPage } from '../Pages/new-clientes/new-clientes.page';
import { Cliente } from '../Modelos/Cliente';
import { LocalStorageService } from 'ngx-webstorage';
import { LisProuctosPage } from '../Pages/lis-prouctos/lis-prouctos.page';
import { Producto } from '../Modelos/Producto';
import { ProductoFactura } from '../Modelos/ProductoFactura';
import { ToastController } from '@ionic/angular';
import { FacturaMaestro } from '../Modelos/FacuraMaestro';
import { PedidosService } from '../Servicios/pedidos.service'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ClienteUso: Cliente;
  ProductoUso: Producto;
  total: number = 0;
  ListaProductosFactura: any = [];
  constructor(private serPedido: PedidosService, private storage: LocalStorageService, public modalController: ModalController, public toastController: ToastController, ) { }

  async selCliente() {
    const modal = await this.modalController.create({
      component: LisClientesPage

    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    //conectado: con, conectado 1 desconectado 0
    //idUsuario:idu
    try {
      if (data.nuevo == 0) {
        console.log(data.cliente);
        this.ClienteUso = data.cliente;
        this.cargarCliente();
      } else {
        this.MostrarNuevo();
      }

    } catch (error) {
      console.log('error');
    }

  }
  async MostrarNuevo() {
    const modal = await this.modalController.create({
      component: NewClientesPage

    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    try {

      console.log(data.cliente);
      this.ClienteUso = data.cliente;
      this.cargarCliente();


    } catch (error) {
      console.log('error');
    }
  }
  cargarCliente() {
    (<HTMLSelectElement>document.getElementById("txtCedula")).value = this.ClienteUso.Cedula;
    (<HTMLSelectElement>document.getElementById("txtNombre")).value = this.ClienteUso.Nombre + ' ' + this.ClienteUso.Apellido;
    (<HTMLSelectElement>document.getElementById("txtDireccion")).value = this.ClienteUso.Direccion;
    (<HTMLSelectElement>document.getElementById("txtTelefono")).value = this.ClienteUso.Telefono;
  }
  AnadirALIsta() {
    if (this.ProductoUso != undefined) {
      let cantidad = (<HTMLSelectElement>document.getElementById("txtCantidad")).value;
      if (cantidad.length > 0) {

        let cant = 0;
        for (let i = 0; i < this.ListaProductosFactura.length; i++) {
          if (this.ListaProductosFactura[i].Id == this.ProductoUso.Id) {
            cant = this.ListaProductosFactura[i].Cantidad;
            this.ListaProductosFactura.splice(i, 1);
          }
        }
        let proaux: ProductoFactura = {
          Id: this.ProductoUso.Id,
          Nombre: this.ProductoUso.Nombre,
          Cantidad: Number.parseFloat(cantidad) + cant,
          Precio: this.ProductoUso.Precio,
          SubTotal: (Number.parseFloat(cantidad) + cant) * this.ProductoUso.Precio,
          Id_Maestro:''
        }

        this.ListaProductosFactura.push(proaux);
        this.colocarTotal();
        this.ProductoUso = undefined;
        (<HTMLSelectElement>document.getElementById("txtCantidad")).value = '1';
        (<HTMLSelectElement>document.getElementById("txtNomProducto")).value = "";

      } else {
        this.presentToast('Ingrese una cantida');
      }
    } else {
      this.presentToast('Seleccione un Productos');
    }
  }
  Salir() {
    this.storage.store('Usuario', null);
  }
  async ListaProductos() {
    const modal = await this.modalController.create({
      component: LisProuctosPage

    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    //conectado: con, conectado 1 desconectado 0
    //idUsuario:idu
    try {
      this.ProductoUso = data.producto;
      this.mostrarProducto();

    } catch (error) {
      console.log('error');
    }
  }
  mostrarProducto() {
    (<HTMLSelectElement>document.getElementById("txtNomProducto")).value = this.ProductoUso.Nombre;
  }
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 5000
    });
    toast.present();
  }
  colocarTotal() {
    let t = 0;
    for (let i = 0; i < this.ListaProductosFactura.length; i++) {
      t += this.ListaProductosFactura[i].SubTotal;
    }
    this.total = t;
  }
  EliminarLista(profa: ProductoFactura) {
    for (let i = 0; i < this.ListaProductosFactura.length; i++) {
      if (this.ListaProductosFactura[i].Id == profa.Id) {
        this.ListaProductosFactura.splice(i, 1);
      }
    }
    this.colocarTotal();
  }
  GuardarFactura() {
    if (this.ClienteUso != undefined) {
      if (this.ListaProductosFactura.length != 0) {
        let mae: FacturaMaestro = {
          Id: 0,
          Fecha: '',
          IdCliente: this.ClienteUso.Id,
          Total: this.total
        }
        this.serPedido.GuardarMaestro(mae).subscribe(
          res => {
            for (let i = 0; i < this.ListaProductosFactura.length; i++) {
              let pfaux:ProductoFactura={
                Id: this.ListaProductosFactura[i].Id,
                Nombre:  this.ListaProductosFactura[i].Nombre,
                Cantidad:  this.ListaProductosFactura[i].Cantidad,
                Precio:  this.ListaProductosFactura[i].Precio,
                SubTotal:  this.ListaProductosFactura[i].SubTotal,
                Id_Maestro:res.Id.toString()
              }
              this.serPedido.GuardarDetalle(pfaux).subscribe(
                resr => {

                },
                err => console.log(err)
              );

            }
           this.limpiar();
           this.presentToast('Guardado Exitoso');


          },
          err => console.log(err)
        );

      } else {
        this.presentToast('Añada uno o mas productos a la factura');
      }
    } else {
      this.presentToast('Seleccione un cliente');
    }
  }
  limpiar(){
    this.ClienteUso=undefined;
    this.ListaProductosFactura=[];
    (<HTMLSelectElement>document.getElementById("txtCedula")).value = '';
    (<HTMLSelectElement>document.getElementById("txtNombre")).value = '';
    (<HTMLSelectElement>document.getElementById("txtDireccion")).value ='';
    (<HTMLSelectElement>document.getElementById("txtTelefono")).value = '';
    this.colocarTotal();
  }
}
