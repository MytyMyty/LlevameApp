
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  //Generamos una variable boolean para rectificar el actual estado de conexion con el autentificador
  connnectionStatus: boolean = false;
  constructor(private storage: StorageService) {}

  //Login para conectarse al sistema
  async loginBDD(username: string, password: String): Promise<boolean> {
    //OBtengo un promise
    //Promise tiene 2 valores || resuelto y no resuelto
    return this.storage
      .get(username)
      .then((res) => {
        if (res && res.username == username && res.password == password) {
          this.connnectionStatus = true;
          return true;
        } else {
          return false;
        }
      })
      //Si hay un error en el sistema, mapeamos para que devuelva false
      .catch((error) => {
        console.log('Error en el sistema: ' + error);
        return (false);
      });
  }

  //Logout para desconectar del sistema
  logout() {
    this.connnectionStatus = false;
  }
  //Funcion para consultar el estado de conexion
  isConnected() {
    return this.connnectionStatus;
  }
  async registrar(user: any):Promise<boolean> {
    //set(llave,valor)
    return this.storage.set(user.username, user).then((res) => {
        if (res != null) {
          return true;
        }else{
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  }

}


