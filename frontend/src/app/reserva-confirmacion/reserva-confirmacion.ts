import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserva-confirmacion',
  imports: [CommonModule],
  templateUrl: './reserva-confirmacion.html',
  styleUrl: './reserva-confirmacion.css'
})
export class ReservaConfirmacion implements OnInit {

  reserva: any = null;

  get esAdmin(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('admin');
    }
    return false;
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.reserva = history.state?.reserva ?? null;
    if (!this.reserva) {
      this.router.navigate(['/']);
    }
  }

  irAMisViajes() {
    if (this.esAdmin) {
      this.router.navigate(['/gestionReservas']);
    } else {
      this.router.navigate(['/misReservas']);
    }
  }

  nuevaReserva() {
    this.router.navigate(['/viajesDisponibles']);
  }
}