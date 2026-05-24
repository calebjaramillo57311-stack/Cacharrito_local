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

  constructor(private router: Router) {}

  ngOnInit() {
    this.reserva = history.state?.reserva ?? null;
    if (!this.reserva) {
      this.router.navigate(['/']);
    }
  }

  irAMisViajes() {
    this.router.navigate(['/misReservas']);
  }

  nuevaReserva() {
    this.router.navigate(['/viajesDisponibles']);
  }
}