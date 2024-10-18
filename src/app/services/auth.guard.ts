import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  //la defincion inject nos permite generar el objeto sin necesidad de aplicar un constructor completo
  //Esto nos permite definir el objeto mas su clase con todas sus funcionalidades de forma mas breve y simplificada
  //inject nos permite reducir el tamaño de codigo con el constructor y otras utilidades 
  //instanciamos el servicio de login y el enrutador para redireccionar en caso erroneo

  //Validamos si esta conectado
  //Si lo esta, tendra acceso a ciertas paginas
  //Si no , sera redireccionado a la pagina correspondiente
  if (sessionStorage.getItem('username')) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};