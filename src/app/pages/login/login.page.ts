import { APIControllerService } from './../../services/apicontroller.service';
import { Component, OnInit, inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/services/authenticator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  user = {
    username: '',
    password: '',
  };

  mensaje = '';
  constructor(
    private router: Router,
    private auth: AuthenticatorService

  ) { }

  validar() {
    this.auth.loginBDD(this.user.username, this.user.password).then(
      (res) => {
        this.mensaje = 'Conexion exitosa';
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password,
          },
        };
        setTimeout(() => {
          this.router.navigate(['/perfil'], navigationExtras);
          this.mensaje = '';
        }, 3000);
      })
      .catch((error) => {
        this.mensaje = 'Error en las credenciales';
      });
  }
}
