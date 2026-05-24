import { ChangeDetectorRef, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ReservaServicio } from '../servicio/reserva-servicio';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AdministradorServicio } from '../servicio/administrador-servicio';
import { FormsModule } from '@angular/forms';
import { ReservaEntidad } from '../entidades/reserva-entidad';

@Component({
  selector: 'app-reservas-del-dia',
  imports: [CommonModule, FormsModule], 
  templateUrl: './reservas-del-dia.html',
  styleUrl: './reservas-del-dia.css',
})
export class ReservasDelDia implements OnInit {

  reservas: ReservaEntidad[] = [];
  reservaSeleccionada: ReservaEntidad | null = null;
  mostrarModal: boolean = false;

  private detector = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private administradorServicio : AdministradorServicio,
    private reservaServicio: ReservaServicio
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.detector)) {
      const hoy = new Date().toLocaleDateString('sv-SE');
      this.administradorServicio.listarReservasDia(hoy).subscribe( dato => {
        this.reservas = dato;
        this.cdr.detectChanges();
      });
    }
  }

  formatearHora(hora: string | undefined): string {
    if (!hora) return '';
    const [h, m] = hora.split(':');
    const hNum = parseInt(h);
    const ampm = hNum >= 12 ? 'PM' : 'AM';
    const h12 = hNum % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  }

  abrirModal(r: ReservaEntidad): void {
    this.reservaSeleccionada = { ...r };
    this.mostrarModal = true;
  }
  
  cerrarModal() {
    this.mostrarModal = false;
    this.reservaSeleccionada = null;
  }
  
  confirmarPago() {
    if (!this.reservaSeleccionada) return;

    const estado = this.reservaSeleccionada.estado?.toLowerCase();
    if (estado === 'cancelado' || estado === 'cancelada') {
      alert('Esta reserva ha sido cancelada, no es posible registrar pago.');
      return;
    }
    
    const reservaActualizada = { ...this.reservaSeleccionada, estado: 'confirmado' };
    this.reservaServicio.cancelarReserva(reservaActualizada).subscribe(_ => {
      const r = this.reservas.find(x => x.idReserva === this.reservaSeleccionada!.idReserva);
      if (r) r.estado = 'confirmado';
      this.cerrarModal();
      this.cdr.detectChanges();
    });
  }
  
  cancelarDesdeModal(): void {
    if (!this.reservaSeleccionada) return;
    if (!confirm('¿Seguro desea cancelar esta reserva?')) return;
  
    const reservaActualizada = { ...this.reservaSeleccionada, estado: 'cancelado' };
    this.reservaServicio.cancelarReserva(reservaActualizada).subscribe(_ => {
      const r = this.reservas.find(x => x.idReserva === this.reservaSeleccionada!.idReserva);
      if (r) r.estado = 'cancelado';
      this.cerrarModal();
      this.cdr.detectChanges();
    });
  }

  eliminar(r: ReservaEntidad) {
    if (!confirm('¿Seguro desea eliminar esta reserva? Esta acción no se puede deshacer.')) return;
  
    this.reservaServicio.eliminarReserva(r.idReserva).subscribe(_ => {
      this.reservas = this.reservas.filter(x => x.idReserva !== r.idReserva);
      this.cdr.detectChanges();
    });
  }
}
