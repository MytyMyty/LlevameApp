
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  private apiURL = environment.apiURL

  //Generamos una variable boolean para rectificar el actual estado de conexion con el autentificador
  connnectionStatus: boolean = false;
  constructor(private http: HttpClient) {}

  loginBDD(username: string, password: string): Observable<Users[]> {
    return this.http.get<Users[]>(
      `${this.apiURL}/users?username=${username}&password=${password}`
    );
  }


  //Generamos funcion para validar usuario contraseña
  //Si equivale a los datos configurados entregara valor true si no Indicara falso
  
  //Logout para desconectar del sistema
  logout() {
    this.connnectionStatus = false;
  }
  //Funcion para consultar el estado de conexion
  isConected() {
    return this.connnectionStatus;
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }
}