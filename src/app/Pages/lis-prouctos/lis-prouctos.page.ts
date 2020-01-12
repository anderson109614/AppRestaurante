import { Component, OnInit } from '@angular/core';
import {ProductosService} from '../../Servicios/productos.service';
import { ModalController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-lis-prouctos',
  templateUrl: './lis-prouctos.page.html',
  styleUrls: ['./lis-prouctos.page.scss'],
})
export class LisProuctosPage implements OnInit {

  constructor(private serProd:ProductosService,public modalController: ModalController) { }
  listaProductos:any=[];
  listaProductosAux:any=[];
  ngOnInit() {
    this.cargarProductos();
  }
  cargarProductos(){
    this.serProd.getProductos().subscribe(
      res => {
        this.listaProductos = res;
        this.listaProductosAux = res;
      },
      err => console.log(err)
    );
}
  regresarBTN() {
    this.modalController.dismiss();
  }
  checkProductos($event: KeyboardEvent) {

    this.listaProductos=this.listaProductosAux;
    
    let value = (<HTMLInputElement>event.target).value;
    const result = this.listaProductos.filter(cli =>  cli.Nombre.toUpperCase().search(value.toUpperCase())==0 
                                           
                                            );
    this.listaProductos=result;

    
  }
  selecProd(pro){
  
    this.modalController.dismiss({
      producto:pro
    });
  }


}
