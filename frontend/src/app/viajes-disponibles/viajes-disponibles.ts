import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViajeEntidad } from '../entidades/viaje-entidad';
import { ViajeServicio} from '../servicio/viaje-servicio';
import { registerLocaleData, DecimalPipe } from '@angular/common';
import localeEs from '@angular/common/locales/es-CO';
import { Router } from '@angular/router';

registerLocaleData(localeEs);

@Component({
  selector: 'app-viajeService',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './viajes-disponibles.html',
  styleUrl: './viajes-disponibles.css',
})
export class viajesDisponibles {

  constructor(
      private viajeServicio: ViajeServicio,
      private router: Router
    ) {}

  destino: string = "";
  fecha: string = "";
  buscado = signal(false);
  viajesEncontrados = signal<ViajeEntidad[]>([]);

  buscar() {
    if (!this.destino || !this.fecha) {
      alert("Introduce destino y fecha, por favor");
      return;
    }
    
    this.viajeServicio.consultarViaje(this.destino, this.fecha).subscribe(dato => {
      this.viajesEncontrados.set(dato);
      this.buscado.set(true);
      console.log(dato);
    });
  }

  irAReservar(idViaje: number) {
    this.router.navigate(['/reservar', idViaje]);
  }
}