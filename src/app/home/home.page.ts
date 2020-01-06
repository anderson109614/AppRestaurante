import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {LisClientesPage} from '../Pages/lis-clientes/lis-clientes.page';
import {NewClientesPage} from '../Pages/new-clientes/new-clientes.page';
import {Cliente} from '../Modelos/Cliente';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ClienteUso:Cliente;
  constructor(public modalController: ModalController) {}

  async selCliente(){
    const modal = await this.modalController.create({
      component: LisClientesPage

    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    //conectado: con, conectado 1 desconectado 0
    //idUsuario:idu
    try {
     if(data.nuevo==0){
      console.log(data.cliente);
      this.ClienteUso=data.cliente;
      this.cargarCliente();
     }else{
      this.MostrarNuevo();
     }
      
    } catch (error) {
      console.log('error');
    }

  }
  async MostrarNuevo(){
    const modal = await this.modalController.create({
      component: NewClientesPage

    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    
    try {
     
      console.log(data.cliente);
      this.ClienteUso=data.cliente;
      this.cargarCliente();
    
      
    } catch (error) {
      console.log('error');
    }
  }
  cargarCliente(){
    (<HTMLSelectElement>document.getElementById("txtCedula")).value=this.ClienteUso.Cedula;
    (<HTMLSelectElement>document.getElementById("txtNombre")).value=this.ClienteUso.Nombre +' '+this.ClienteUso.Apellido;
    (<HTMLSelectElement>document.getElementById("txtDireccion")).value=this.ClienteUso.Direccion;
    (<HTMLSelectElement>document.getElementById("txtTelefono")).value=this.ClienteUso.Telefono;
  }
  
}
