import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViajeServicio } from '../servicio/viaje-servicio';
import { ViajeEntidad } from '../entidades/viaje-entidad';
import { AutomovilServicio } from '../servicio/automovil-servicio';

@Component({
  selector: 'app-gestion-viajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-viajes.html',
  styleUrl: './gestion-viajes.css',
})
export class GestionViajes implements OnInit {

  viajes = signal<ViajeEntidad[]>([]);
  viaje: any = { automovil: {} };
  tipo: number = 1;

  constructor (
    private cdr: ChangeDetectorRef,
    private viajeServicio: ViajeServicio,
    private AutomovilServicio: AutomovilServicio,
  ) {}

  private detector = inject(PLATFORM_ID);

  ngOnInit() {
    localStorage.setItem('token', 'admin');
    if (isPlatformBrowser(this.detector)) {
      this.listarV();

      const input = document.getElementById("inputSearch") as HTMLInputElement;
      if (input) {
        input.addEventListener('input', () => {
          if (input.value === '') {
            this.listarV();
          }
        });
      }
    }
  }

  listarV() {
    this.viajeServicio.ListarViajes().subscribe(dato => {
      this.viajes.set(dato);
      this.cdr.detectChanges();
    });
  }

  abrirModal() {
    const modal = document.getElementById("modalViaje");
    if (modal) modal.style.display = 'flex';
  }

  cerrarModal() {
    this.viaje = { automovil: {} };
    const modal = document.getElementById("modalViaje");
    if (modal) modal.style.display = 'none';
    this.tipo = 1;
  }

  abrirModalAgregar() {
    this.tipo = 1;
    this.viaje = {
      destino: '',
      fechaSalida: '',
      horaSalida: '',
      precioViaje: 0,
      automovil: { numeroAutomovil: 0 }
    };
    this.abrirModal();
  }

  guardar() {
    if (!this.viaje.destino || !this.viaje.precioViaje || !this.viaje.automovil.numeroAutomovil || 
    !this.viaje.fechaSalida || !this.viaje.horaSalida) {
      alert("Por favor, complete todos los campos");
      return;
    }

    const ahora = new Date();
    const fechaHoraViaje = new Date(`${this.viaje.fechaSalida}T${this.viaje.horaSalida}`);
    if (fechaHoraViaje <= ahora) {
      alert(`No se puede crear un viaje con una fecha y hora pasada. La fecha y hora de salida debe ser posterior a ${ahora.toLocaleDateString('es-CO')} ${ahora.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}.`);
      return;
    }

    if (this.viaje.horaSalida.length === 5) {
      this.viaje.horaSalida = this.viaje.horaSalida + ":00";
    }

    this.viaje.automovil.numeroAutomovil = +this.viaje.automovil.numeroAutomovil;
    this.viaje.precioViaje = +this.viaje.precioViaje;

    if (this.tipo === 1) {
      this.viajeServicio.GuardarViaje(this.viaje).subscribe({
        next: () => {
          this.listarV();
          this.cerrarModal();
          alert('¡Viaje creado exitosamente!');
        },
        error: (err) => {
          console.error("Error al guardar viaje:", err);
          alert(err.error?.message || "Ocurrió un error al guardar el viaje");
        }
      });
    } else {
      this.viajeServicio.actualizarViaje(this.viaje).subscribe({
        next: () => {
          this.listarV();
          this.cerrarModal();
          alert('¡Viaje editado exitosamente!');
        },
        error: (err) => {
          console.error("Error al actualizar viaje:", err);
          alert(err.error?.message || "Ocurrió un error al actualizar el viaje. Verifique la capacidad del automóvil.");
        }
      });
    }
  }

  editar(v: ViajeEntidad) {
    this.tipo = 0;
    this.viaje = JSON.parse(JSON.stringify(v));
    this.viaje.fechaSalida = this.viaje.fechaSalida.split('T')[0];
    this.abrirModal();
  }

  eliminar(id: number) {
  if (confirm("¿Está seguro de eliminar este viaje?")) {
    this.viajeServicio.EliminarViaje(id).subscribe({
      next: () => {
        this.listarV();
        this.cdr.detectChanges();
        alert('¡Viaje eliminado exitosamente!');
      },
      error: (err) => {
        if (err.status === 409) {
          alert('No se puede eliminar el viaje porque tiene reservas activas.');
        } else {
          alert(err.error?.message || 'Ocurrió un error al eliminar el viaje.');
        }
      }
    });
  }
}

  buscar() {
    const id = (document.getElementById("inputSearch") as HTMLInputElement).value;

    if (!id) {
      this.listarV();
      return;
    }

    this.viajeServicio.BuscarViaje(id).subscribe(dato => {
      if (dato) {
        this.viajes.set([dato]);
      } else {
        this.viajes.set([]);
        alert("No se encontró ningún viaje con ese ID");
      }
      this.cdr.detectChanges();
    });
  }
}