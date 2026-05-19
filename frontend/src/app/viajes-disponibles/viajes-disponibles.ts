import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Viaje } from '../entidades/viaje';
import { viajeService } from '../servicio/viaje';
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
      private viajeService: viajeService,
      private router: Router
    ) {}

  destino: string = "";
  fecha: string = "";
  buscado = signal(false);
  viajesEncontrados = signal<Viaje[]>([]);

  buscar() {
    if (!this.destino || !this.fecha) {
      alert("Introduce destino y fecha, por favor");
      return;
    }
    
    this.viajeService.consultarViaje(this.destino, this.fecha).subscribe(dato => {
      this.viajesEncontrados.set(dato);
      this.buscado.set(true);
      console.log(dato);
    });
  }

  irAReservar(idViaje: number) {
    this.router.navigate(['/reservar', idViaje]);
  }
}