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

  private detector = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private servicioViaje = inject(ViajeServicio);
  private servicioAutomovil = inject(AutomovilServicio);

  ngOnInit() {
    localStorage.setItem('token', 'admin')
    if (isPlatformBrowser(this.detector)) {
      this.listarV();
    }
  }

  listarV() {
    this.servicioViaje.ListarViajes().subscribe(dato => {
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
      this.servicioAutomovil.buscarAutomovil(this.viaje.automovil.numeroAutomovil).subscribe(automovilData => {
        this.viaje.automovil = automovilData;
        this.viaje.puestosDisponibles = automovilData.cantidadPuestos;
        this.servicioViaje.GuardarViaje(this.viaje).subscribe(() => {
          this.listarV();
          this.cerrarModal();
        });
      }, error => {
        console.error('Error al buscar automóvil:', error);
        alert('No se encontró el automóvil con el número especificado.');
      });
    } else {
      this.servicioViaje.actualizarViaje(this.viaje).subscribe(() => {
        this.listarV();
        this.cerrarModal();
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
      this.servicioViaje.EliminarViaje(id).subscribe(() => {
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

    this.servicioViaje.BuscarViaje(id).subscribe(dato => {
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