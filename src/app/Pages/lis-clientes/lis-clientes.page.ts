import { Component, OnInit } from '@angular/core';
import {ClientesService} from '../../Servicios/clientes.service';
import { ModalController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-lis-clientes',
  templateUrl: './lis-clientes.page.html',
  styleUrls: ['./lis-clientes.page.scss'],
})
export class LisClientesPage implements OnInit {
  LisClientes:any=[];
  LisClientesAux:any=[];
  constructor(public serCli:ClientesService,public modalController: ModalController) { }

  ngOnInit() {
    this.cargarCietes();
  }
  cargarCietes(){
      this.serCli.getClientes().subscribe(
        res => {
          this.LisClientes = res;
          this.LisClientesAux = res;
        },
        err => console.log(err)
      );
  }
  regresarBTN() {
    this.modalController.dismiss();
  }
  regresarNuevo() {
    this.modalController.dismiss({
      nuevo: 1
    });
  }
  selecCliente(cli){
  
    this.modalController.dismiss({
      nuevo: 0,
      cliente:cli
    });
  }

  checkCliente($event: KeyboardEvent) {

    this.LisClientes=this.LisClientesAux;
    
    let value = (<HTMLInputElement>event.target).value;
    const result = this.LisClientes.filter(cli => cli.Cedula.search(value)==0 
                                           || cli.Nombre.toUpperCase().search(value.toUpperCase())==0 
                                           || cli.Apellido.toUpperCase().search(value.toUpperCase())==0
                                           || cli.Telefono.toUpperCase().search(value.toUpperCase())==0 
                                           || cli.Direccion.toUpperCase().search(value.toUpperCase())== 0
                                            );
    this.LisClientes=result;
/*
"Id": "1",
"Cedula": "1801",
"Nombre": "Pedro",
"Apellido": "Montero",
"Telefono": "0939180393",
"Direccion": "Patate"



*/
  }

}
