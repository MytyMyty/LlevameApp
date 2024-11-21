import { AuthenticatorService } from '../../services/authenticator.service';
import { Component, OnInit,Directive, ElementRef, HostListener, Pipe  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username : string;
  showCarForm: boolean = false;
  rut: string;
  
  constructor(private router: Router, private auth: AuthenticatorService) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: string;
    };
    this.username = state.username;
  }
  
  logout() {
    this.auth.logout()
    this.router.navigate(['/login']);
  }
  ngOnInit() { }
  get currentYear(): number {
    return new Date().getFullYear();
  }
  
  get maxYear(): number {
    return this.currentYear + 10;
  }
  
}

@Pipe({ name: 'rutFormat' })

export class RutFormatDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target;
    const value = input.value;
    const formattedValue = this.formatRut(value);
    input.value = formattedValue;
  }
  transform(value: string): string {
    return this.formatRut(value);
  }

  private formatRut(rut: string): string {
  rut = rut.replace(/\./g, '').replace(/-/g, '');
  const formattedRut = [];
  const rutLength = rut.length;

  if (rutLength === 9) {
    formattedRut.push(rut.substring(0, 2));
    formattedRut.push('.');
    formattedRut.push(rut.substring(2, 5));
    formattedRut.push('.');
    formattedRut.push(rut.substring(5, 8));
    formattedRut.push('-');
    formattedRut.push(rut[8]);
  } else if (rutLength === 8) {
    formattedRut.push(rut.substring(0, 1));
    formattedRut.push('.');
    formattedRut.push(rut.substring(1, 4));
    formattedRut.push('.');
    formattedRut.push(rut.substring(4, 7));
    formattedRut.push('-');
    formattedRut.push(rut[7]);
  }
  
  return formattedRut.join('');
}

}
