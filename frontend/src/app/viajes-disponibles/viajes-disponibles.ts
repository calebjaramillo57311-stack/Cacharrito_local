import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViajeEntidad } from '../entidades/viaje-entidad';
import { ViajeServicio} from '../servicio/viaje-servicio';
import { registerLocaleData, DecimalPipe, isPlatformBrowser } from '@angular/common';
import localeEs from '@angular/common/locales/es-CO';
import { Router } from '@angular/router';

registerLocaleData(localeEs);

@Component({
  selector: 'app-viajeService',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './viajes-disponibles.html',
  styleUrl: './viajes-disponibles.css',
})
export class viajesDisponibles implements OnInit {

  constructor(
      private viajeServicio: ViajeServicio,
      private router: Router
    ) {}

  private platformId = inject(PLATFORM_ID);
  isAdmin: boolean = false;
  destino: string = "";
  fecha: string = "";
  buscado = signal(false);
  viajesEncontrados = signal<ViajeEntidad[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isAdmin = localStorage.getItem('token') === 'admin';
    }
  }

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