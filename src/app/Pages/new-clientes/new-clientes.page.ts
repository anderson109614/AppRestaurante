import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/Servicios/clientes.service';
import { ModalController,ToastController } from '@ionic/angular';
import {Cliente} from '../../Modelos/Cliente';
@Component({
  selector: 'app-new-clientes',
  templateUrl: './new-clientes.page.html',
  styleUrls: ['./new-clientes.page.scss'],
})
export class NewClientesPage implements OnInit {

  constructor(public serCli:ClientesService,public modalController: ModalController,public toastController: ToastController) { }

  ngOnInit() {
  }

  regresarBTN() {
    this.modalController.dismiss();
  }
  GuardarCLI(){
    let cli:Cliente={
      Id:0,
      Cedula:(<HTMLSelectElement>document.getElementById("txtCedulaN")).value,
      Nombre:(<HTMLSelectElement>document.getElementById("txtNombreN")).value,
      Apellido:(<HTMLSelectElement>document.getElementById("txtApellidoN")).value,
      Telefono:(<HTMLSelectElement>document.getElementById("txtTelefonoN")).value,
      Direccion:(<HTMLSelectElement>document.getElementById("txtDireccionN")).value      
    };
    console.log(cli);
    if(cli.Cedula.length==0){
      this.presentToast('Ingrese Cedula');
    }else if(cli.Nombre.length==0){
      this.presentToast('Ingrese Nombre');
    }else if(cli.Apellido.length==0){
      this.presentToast('Ingrese Apellido');
    }else if(cli.Telefono.length==0){
      this.presentToast('Ingrese Telefono');
    }else if(cli.Direccion.length==0){
      this.presentToast('Ingrese Direccion');
    }else{
      this.serCli.PostClientes(cli).subscribe(
        res => {
          this.modalController.dismiss({cliente:res});
         
        },
        err =>{ console.log(err);

          this.presentToast('Error al guardar');
        }
        
      );
    }

    
  }
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 5000
    });
    toast.present();
  }
}
