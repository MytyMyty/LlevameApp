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
    const { username , password } = this.user;
    console.log(`username: ${username}, password: ${password}`);
    this.auth.loginBDD(username, password).subscribe({
      next: (response) => {
        if (response.length >= 1) {
          this.mensaje = 'Credenciales correctas';
          const NavigationExtras: NavigationExtras = {
            state: {
              username: username,
              password: password,
            },
          }
          this.router.navigate(['perfil'], NavigationExtras);
        } else {
          this.mensaje = 'Credenciales incorrectas';
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
          
}

