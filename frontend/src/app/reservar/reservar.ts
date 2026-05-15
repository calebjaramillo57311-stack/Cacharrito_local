import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Viaje } from '../entidades/viaje';
import { ViajeService } from '../servicio/viaje';
import { registerLocaleData, DecimalPipe } from '@angular/common';
import localeEs from '@angular/common/locales/es-CO';

registerLocaleData(localeEs);

@Component({
  selector: 'app-reservar',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './reservar.html',
  styleUrl: './reservar.css',
})
export class Reservar {
  destino: string = "";
  fecha: string = "";
  buscado = signal(false);
  viajesEncontrados = signal<Viaje[]>([]);

  constructor(private viajeService: ViajeService) {}

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
}