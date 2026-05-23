import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaServicio } from '../servicio/reserva-servicio';
import { ReservaEntidad } from '../entidades/reserva-entidad';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-reservas',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-reservas.html',
  styleUrl: './gestion-reservas.css'
})
export class GestionReservas implements OnInit {
  reservas: ReservaEntidad[] = [];
  reservasFiltradas: ReservaEntidad[] = [];
  cedulaFiltro: string = '';
  fechaFiltro: string = '';
  estadoFiltro: string = '';
  reservaSeleccionada: ReservaEntidad | null = null;
  mostrarModal: boolean = false;

  constructor(
    private reservaServicio: ReservaServicio,
    private cdr: ChangeDetectorRef
  ) {}

  filtrar() {
    this.reservasFiltradas = this.reservas.filter(r => {
      const cedulaOk = !this.cedulaFiltro ||
        r.usuario?.cedula?.includes(this.cedulaFiltro);
      const fechaOk = !this.fechaFiltro ||
        r.viaje?.fechaSalida?.toString().startsWith(this.fechaFiltro);
      const estadoOk = !this.estadoFiltro ||
        r.estado?.toLowerCase() === this.estadoFiltro.toLowerCase();
      return cedulaOk && fechaOk && estadoOk;
    });
  }

  formatearHora(hora: string | undefined): string {
    if (!hora) return '';
    const [h, m] = hora.split(':');
    const hNum = parseInt(h);
    const ampm = hNum >= 12 ? 'PM' : 'AM';
    const h12 = hNum % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  }

  ngOnInit(){
    localStorage.setItem('token', 'admin')
    this.reservaServicio.listarTodo().subscribe({
      next: (data) => {
        this.reservas = [...data];
        this.reservasFiltradas = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  cancelar(r: ReservaEntidad): void {
  if (!confirm('¿Seguro desea cancelar esta reserva?')) return;
  
  const reservaActualizada = { ...r, estado: 'cancelado' };
  this.reservaServicio.cancelarReserva(reservaActualizada).subscribe({
    next: () => {
      r.estado = 'cancelado';
      this.cdr.detectChanges();
    },
    error: (err) => console.error(err)
  });
}

abrirModal(r: ReservaEntidad): void {
  this.reservaSeleccionada = { ...r };
  this.mostrarModal = true;
}

cerrarModal(): void {
  this.mostrarModal = false;
  this.reservaSeleccionada = null;
}

confirmarPago(): void {
  if (!this.reservaSeleccionada) return;
  const reservaActualizada = { ...this.reservaSeleccionada, estado: 'confirmado' };
  this.reservaServicio.cancelarReserva(reservaActualizada).subscribe({
    next: () => {
      const r = this.reservas.find(x => x.idReserva === this.reservaSeleccionada!.idReserva);
      if (r) r.estado = 'confirmado';
      const rf = this.reservasFiltradas.find(x => x.idReserva === this.reservaSeleccionada!.idReserva);
      if (rf) rf.estado = 'confirmado';
      this.cerrarModal();
      this.cdr.detectChanges();
    },
    error: (err) => console.error(err)
  });
}
}