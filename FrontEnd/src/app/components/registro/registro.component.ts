import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  InfiniteScrollCustomEvent,
  IonModal,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { IUsuario } from 'src/app/interface/iusuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  @ViewChild(IonModal) modal?: IonModal;
  formularioLogin!: FormGroup;
  rol!: string;
  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private _usuarioService: UsuarioService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {
    this.formularioLogin = this.fb.group({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      codigoDecano: new FormControl(''),
    });
  }

  ngOnInit() {}
  async registrarse(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Registrando...',
      spinner: 'bubbles',
    });

    var f = this.formularioLogin.value;
    if (f.codigoDecano == '') {
      this.rol = 'usuario';
    } else {
      this.rol = f.codigoDecano;
    }

    if (f.usuario != '' && f.password != '' && f.email != '') {
      const user: IUsuario = {
        usuario: f.usuario,
        password: f.password,
        email: f.email,
        rol: this.rol,
      };
      await loading.present();
      this._usuarioService.registro(user).subscribe((resp) => {
        this._usuarioService.autenticacion(user).subscribe((resp) => {
          loading.dismiss();
          console.log('Registrado');
          localStorage.setItem('usuario', JSON.stringify(resp));
          localStorage.setItem('ingresado', 'true');
          
          this.router.navigate(['/inicio', resp]);
          event?.target.complete();
          this.modal?.dismiss();
        });
      });
    } else {
      console.log('Complete el formulario');
    }
  }
}
