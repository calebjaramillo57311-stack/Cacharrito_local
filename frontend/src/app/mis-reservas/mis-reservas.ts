import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Reserva } from '../entidades/reserva';
import { ReservaService } from '../servicio/reserva';

@Component({
  selector: 'app-mis-reservas',
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css',
})
export class MisReservas {

  private reservaService = inject(ReservaService);

  busquedaId: string = '';
  reservas = signal<Reserva[]>([]);
  cargando = signal(false);
  buscado = signal(false);

  buscarReserva(): void {
    if (!this.busquedaId.trim()) return;
  
    this.cargando.set(true);
    this.buscado.set(false);
  
    this.reservaService.buscarPorCedula(this.busquedaId).subscribe({
      next: (resultado: Reserva[]) => {
        console.log(resultado);
        this.reservas.set(resultado ?? []);
        this.buscado.set(true);
        this.cargando.set(false);
      },
      error: () => {
        this.reservas.set([]);
        this.buscado.set(true);
        this.cargando.set(false);
      }
    });
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-CO', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}