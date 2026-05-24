import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaServicio } from '../servicio/reserva-servicio';

@Component({
  selector: 'app-pasajeros-por-automovil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pasajeros-por-automovil.html',
  styleUrl: './pasajeros-por-automovil.css',
})
export class PasajerosPorAutomovil implements OnInit {

  carId: string = '';
  pasajeros: any[] = [];
  buscado = signal(false);

  private reservaServicio = inject(ReservaServicio);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
  }

  buscar() {
    if (!this.carId) {
      alert("Ingrese un número de automóvil");
      return;
    }

    this.reservaServicio.buscarPorAutomovil(this.carId).subscribe({
      next: (datos) => {
        this.mapearPasajeros(datos);
        this.buscado.set(true);
      },
      error: (err) => {
        console.error("Error al buscar pasajeros:", err);
        alert("Ocurrió un error al buscar los pasajeros");
      }
    });
  }

  private mapearPasajeros(datos: any[]) {
    this.pasajeros = datos.map(r => ({
      nombre: `${r.usuario.nombre} ${r.usuario.apellidos}`,
      telefono: r.usuario.telefono,
      destino: r.viaje?.destino || 'N/A',
      asiento: r.puestoAsignado
    }));
    this.cdr.detectChanges();
  }
}
