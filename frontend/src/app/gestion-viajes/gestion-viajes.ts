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

  private viajeServicio = inject(ViajeServicio);
  private automovilServicio = inject(AutomovilServicio);
  private cdr = inject(ChangeDetectorRef);
  private detector = inject(PLATFORM_ID);

  ngOnInit() {
    localStorage.setItem('token', 'admin')
    if (isPlatformBrowser(this.detector)) {
      this.listarV();
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

  abrirModalAgregar() {
    this.tipo = 1;
    this.viaje = {
      destino: '',
      fechaSalida: '',
      horaSalida: '',
      precioViaje: null,
      automovil: { numeroAutomovil: '' }
    };
    this.abrirModal();
  }

  cerrarModal() {
    this.viaje = { automovil: {} };
    const modal = document.getElementById("modalViaje");
    if (modal) modal.style.display = 'none';
    this.tipo = 1;
  }

  guardar() {
    if (!this.viaje.destino || !this.viaje.precioViaje || !this.viaje.automovil.numeroAutomovil || 
    !this.viaje.fechaSalida || !this.viaje.horaSalida) {
      alert("Por favor, complete todos los campos");
      return;
    }

    if (this.viaje.horaSalida.length === 5) {
      this.viaje.horaSalida = this.viaje.horaSalida + ":00";
    }

    if (this.tipo === 1) {
      this.viajeServicio.GuardarViaje(this.viaje).subscribe({
        next: () => {
          this.listarV();
          this.cerrarModal();
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
      this.viajeServicio.EliminarViaje(id).subscribe(() => {
        this.listarV();
        this.cdr.detectChanges(); 
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