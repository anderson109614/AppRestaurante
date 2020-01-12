import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {LoginService} from './Servicios/login.service';
import {LocalStorageService} from 'ngx-webstorage';
import {Login} from './Modelos/Login'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private storage:LocalStorageService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    let lg:Login=this.storage.retrieve('Usuario');
    if(lg!=null){
      this.MostrarLogin(false);
    }else{
      this.MostrarLogin(true);
    }
    
  }
  MostrarLogin(estado:boolean){
    console.log('entro');
    if(estado){
      (<HTMLDivElement>document.getElementById('DivPagina')).style.display='none';
    (<HTMLDivElement>document.getElementById('DivLogin')).style.display='block';
    }else{
      (<HTMLDivElement>document.getElementById('DivPagina')).style.display='block';
      (<HTMLDivElement>document.getElementById('DivLogin')).style.display='none';
      
    }
    
  }
  onClickLogin(){
    
    var usr= (<HTMLInputElement>document.getElementById("txt-login-username")).value;
    var cont= (<HTMLInputElement>document.getElementById("txt-login-password")).value;
    let log:Login={
      Id:0,
      Cedula:usr,
      Nombre:'',
      Apellido:'',
      Telefono:'',
      Direccion:'',
      Contraseña:cont

    }
    this.loginService.GenerarLogin(log).subscribe(
      res => {
        try {
          console.log(res);
          if(res[0].id!=0){
            this.MostrarLogin(false);
           this.storage.store('Usuario',res[0]);
           
          //this.router.navigateByUrl('/home');
          } 
        }
        catch(e) {
          (<HTMLLabelElement>document.getElementById('lbl_error')).style.display='block';
          (<HTMLLabelElement>document.getElementById('lbl_error')).textContent="Error.... Ingrese un usuario y contraseña validos!!";

        }


        
      },
      err => console.log(err)
    );
  }
}
