import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navegacion',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navegacion.html',
  styleUrl: './navegacion.css',
})
export class Navegacion implements OnInit {
  
  constructor(public router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  get estaLogueado(): boolean {
    return !!localStorage.getItem('token') || !!localStorage.getItem('admin');
  }

  get esAdmin(): boolean {
    return !!localStorage.getItem('admin');
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.router.navigate(['/viajesDisponibles']);
  }
}