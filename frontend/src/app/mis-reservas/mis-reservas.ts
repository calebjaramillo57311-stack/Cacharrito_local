import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaEntidad } from '../entidades/reserva-entidad';
import { ReservaServicio } from '../servicio/reserva-servicio';

@Component({
  selector: 'app-mis-reservas',
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css',
})
export class MisReservas {

  private reservaServicio = inject(ReservaServicio);

  busquedaId: string = '';
  reservas = signal<ReservaEntidad[]>([]);
  cargando = signal(false);
  buscado = signal(false);

  buscarReserva(): void {
    if (!this.busquedaId.trim()) return;
  
    this.cargando.set(true);
    this.buscado.set(false);
  
    this.reservaServicio.buscarPorCedula(this.busquedaId).subscribe({
      next: (resultado: ReservaEntidad[]) => {
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