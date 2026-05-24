import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdministradorServicio } from '../servicio/administrador-servicio';
import { Router } from '@angular/router';

@Component({
    selector: 'app-loginentidad',
    imports: [CommonModule, FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})

export class login{
    mostrarPass: boolean = false;
    usuario: string = '';
    contrasena: string = '';
    errorMensaje: string = '';

    constructor(private administradorServicio: AdministradorServicio, private router: Router, private cd: ChangeDetectorRef) {}

    togglePass() {
        this.mostrarPass = !this.mostrarPass;
    }

    manejarLogin() {
    this.administradorServicio.login(this.usuario, this.contrasena).subscribe({
    next: (res: any) => {

      const adminObj = typeof res === 'string' ? JSON.parse(res) : res;
      localStorage.setItem('admin', JSON.stringify(adminObj));

      this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.errorMensaje = 'Usuario o contraseña incorrectos';
        this.cd.detectChanges();
        console.error('Error en login:', err);
      }
    });
  }
}
