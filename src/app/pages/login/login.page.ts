import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/services/authenticator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user:any={
    "username":"",
    "password":"",
  };

  mensaje = '';

  constructor(
    private router: Router,
    private auth: AuthenticatorService

  ) { }
  ngOnInit(): void {
      
  }
  validar() {
    this.auth.loginBDD(this.user.username, this.user.password).then((connected) => {
      if (connected) {
        this.mensaje = 'Bienvenido, Conexion Exitosa!';
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password
          },
        }
        setTimeout(() => {
          this.router.navigate(['/perfil'], navigationExtras);
          this.mensaje = '';
        }, 3000);
      } else {
        this.mensaje = 'Credenciales Invalidas!';
      }
    });
  }
  
}
