import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaServicio } from '../servicio/reserva-servicio';
import { ViajeEntidad } from '../entidades/viaje-entidad';
import { ViajeServicio } from '../servicio/viaje-servicio';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioEntidad } from '../entidades/usuario-entidad';
import { UsuarioServicio } from '../servicio/usuario-servicio';

@Component({
  selector: 'app-reservar',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './reservar.html',
  styleUrl: './reservar.css',
})
export class Reservar implements OnInit {

  reserva: any = { usuario: new UsuarioEntidad() };
  viajeSeleccionado = signal<ViajeEntidad | undefined>(undefined);

  private detector = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private reservaServicio: ReservaServicio,
    private viajeServicio: ViajeServicio,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioServicio: UsuarioServicio,
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
      this.viajeServicio.BuscarViaje(id).subscribe(dato => {
        this.viajeSeleccionado.set(dato);
        this.cdr.detectChanges();
      });
    }
  }

  buscarUsuario() {
    const cedula = String(this.reserva.usuario.cedula).trim();
    if (!cedula) return;

    this.usuarioServicio.buscarCedula(cedula).subscribe({
      next: (usuario: UsuarioEntidad) => {
        this.reserva.usuario = usuario;
        this.cdr.detectChanges();
      },
      error: () => {
        this.reserva.usuario = new UsuarioEntidad();
        this.reserva.usuario.cedula = cedula;
        this.cdr.detectChanges();
      }
    });
  }

  guardarReserva() {
    const u = this.reserva.usuario;
    if (!u.cedula || !u.nombre || !u.apellidos || !u.telefono || !u.fechaNacimiento) {
      alert('Completa todos los datos del usuario');
      return;
    }

    const viaje = this.viajeSeleccionado()!;

    const fechaNac = new Date(u.fechaNacimiento);
    u.fechaNacimiento = fechaNac.toISOString().split('T')[0];

    this.reserva.fechaReserva   = new Date().toISOString().split('T')[0];
    this.reserva.estado         = 'pendiente';
    this.reserva.puestoAsignado = Math.floor(Math.random() * viaje.automovil.cantidadPuestos) + 1;
    this.reserva.totalPagar     = viaje.precioViaje;
    this.reserva.viaje          = viaje;
    this.reserva.administrador  = null;

    this.reservaServicio.guardarReserva(this.reserva).subscribe(dato => {
      this.router.navigate(['/reservaconfirmacion'], {
        state: {
          reserva: {
            idReserva:      dato.idReserva,
            destino:        dato.viaje.destino,
            fechaHora:      dato.viaje.fechaSalida,
            vehiculo:       dato.viaje.automovil.numeroAutomovil,
            pasajero:       dato.usuario.nombre + ' ' + dato.usuario.apellidos,
            puestoAsignado: dato.puestoAsignado,
            total:          dato.totalPagar
          }
        }
      });
    });
  }
}