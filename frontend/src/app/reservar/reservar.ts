import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../servicio/reserva';
import { Viaje } from '../entidades/viaje';
import { viajeService } from '../servicio/viaje';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { Reserva } from '../entidades/reserva';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../entidades/usuario';

@Component({
  selector: 'app-reservar',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './reservar.html',
  styleUrl: './reservar.css',
})
export class Reservar implements OnInit {

  reserva: any = {usuario: new Usuario()};
  viajeSeleccionado = signal<Viaje | undefined>(undefined);

  private detector = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private reservaService: ReservaService,
    private viajeService: viajeService,
    private route: ActivatedRoute
  ) {}

  get horaFormateada(): string {
    const hora = this.viajeSeleccionado()?.horaSalida;
    if (!hora) return '';
    const [h, m] = hora.split(':');
    const hora12 = +h % 12 || 12;
    const ampm = +h < 12 ? 'AM' : 'PM';
    return `${hora12}:${m} ${ampm}`;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.detector)) {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.viajeService.BuscarViaje(id).subscribe(dato => {
        this.viajeSeleccionado.set(dato);
        this.cdr.detectChanges();
      });
    }
  }

  guardarReserva() {
    for (let campo in this.reserva.usuarioCedula) {
      if (!this.reserva.usuarioCedula[campo]) {
        alert('Faltan datos por completar');
        return;
      }
    }

    const viaje = this.viajeSeleccionado()!;

    this.reserva.fechaReserva = new Date();
    this.reserva.estado = 'pendiente';
    this.reserva.puestoAsignado = Math.floor(Math.random() * viaje.automovil.cantidadPuestos) + 1;
    this.reserva.totalPagar = viaje.precioViaje;
    this.reserva.viaje = viaje;
    this.reserva.administrador = null;

    this.reservaService.guardarReserva(this.reserva).subscribe(dato => {
      console.log(dato);
    });
  }
}