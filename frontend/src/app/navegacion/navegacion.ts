import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navegacion.html',
  styleUrl: './navegacion.css',
})
export class Navegacion {
  
  constructor(public router: Router) {}

    get estaLogueado(): boolean {
    return !!localStorage.getItem('token');
}

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/viajesDisponibles']);
  }
  }

