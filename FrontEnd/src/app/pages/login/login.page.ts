import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, IonModal, LoadingController, NavController } from '@ionic/angular';

import { IUsuario } from 'src/app/interface/iusuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonModal) modal?: IonModal;
  formularioLogin!: FormGroup;
  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    private _usuarioService: UsuarioService,
    private loadingCtrl: LoadingController) {
    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })

  }

  ngOnInit() {
  }
  async ingresar(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: "Cargando...",
      spinner: "bubbles"
    })

    var f = this.formularioLogin.value;
    const user: IUsuario = {
      usuario: f.usuario,
      password: f.password,
      email: "",
      rol:""
    }
    await loading.present();
    this._usuarioService.autenticacion(user).subscribe(
      (resp) => {
        let listString = JSON.stringify(resp)
        var usuario = JSON.parse(listString);      
        
        if (usuario.usuario == f.usuario && usuario.password == f.password) {
          loading.dismiss();        
          localStorage.setItem('usuario',JSON.stringify(usuario))  
          localStorage.setItem('ingresado', 'true');
          this.router.navigate(['/inicio', usuario])
          event?.target.complete()
          this.modal?.dismiss();
        }
      },
      (error) => {
        loading.dismiss();
        event?.target.complete()
      }
    )
  }
  


}
