import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutomovilEntidad } from '../entidades/automovil-entidad';
import { AutomovilServicio } from '../servicio/automovil-servicio';

@Component({
  selector: 'app-gestion-automoviles',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-automoviles.html',
  styleUrl: './gestion-automoviles.css',
})
export class GestionAutomoviles implements OnInit {

  private automovilServicio = inject(AutomovilServicio);

  automoviles = signal<AutomovilEntidad[]>([]);
  automovilesFiltrados = signal<AutomovilEntidad[]>([]);
  busqueda: string = '';

  // Modal agregar/editar
  mostrarModal = signal(false);
  modoEdicion = signal(false);
  automovilForm: AutomovilEntidad = { numeroAutomovil: null!, cantidadPuestos: null! };

  ngOnInit(){
    this.cargarAutomoviles();
  }

  onBusquedaChange(valor: string): void {
  if (!valor.trim()) {
    this.automovilesFiltrados.set(this.automoviles());
  }
}
  cargarAutomoviles(){
    this.automovilServicio.listarAutomoviles().subscribe({
      next: (lista) => {
        this.automoviles.set(lista);
        this.automovilesFiltrados.set(lista);
      },
      error: () => console.error('Error al cargar automóviles')
    });
  }

  buscarAutomovil(){
    const termino = this.busqueda.trim();
    if (!termino) {
      this.automovilesFiltrados.set(this.automoviles());
      return;
    }
    const filtrados = this.automoviles().filter(a =>
      a.numeroAutomovil.toString().includes(termino)
    );
    this.automovilesFiltrados.set(filtrados);
  }

  abrirModalAgregar(){
    this.automovilForm = { numeroAutomovil: 0, cantidadPuestos: 0 };
    this.modoEdicion.set(false);
    this.mostrarModal.set(true);
  }

  abrirModalEditar(automovil: AutomovilEntidad){
    this.automovilForm = { ...automovil };
    this.modoEdicion.set(true);
    this.mostrarModal.set(true);
  }

  cerrarModal(){
    this.mostrarModal.set(false);
  }

  guardarAutomovil(){
  if (this.modoEdicion()) {
    this.automovilServicio.editarAutomovil(this.automovilForm.numeroAutomovil, this.automovilForm).subscribe({
      next: () => {
        this.cargarAutomoviles();
        this.cerrarModal();
        alert('¡Automóvil editado exitosamente!');
      },
      error: () => alert('Error al editar el automóvil.')
    });
  } else {
    this.automovilServicio.crearAutomovil(this.automovilForm).subscribe({
      next: () => {
        this.cargarAutomoviles();
        this.cerrarModal();
        alert('¡Automóvil creado exitosamente!');
      },
      error: () => alert('Error al crear el automóvil.')
    });
  }
}

eliminarAutomovil(numeroAutomovil: number){
  if (!confirm(`¿Eliminar el automóvil #${numeroAutomovil}?`)) return;
  this.automovilServicio.eliminarAutomovil(numeroAutomovil).subscribe({
        next: () => {
      this.cargarAutomoviles();
      alert('Automóvil eliminado correctamente');
    },
    error: (err) => {
      if (err.status === 409) {
        alert('El automóvil tiene viajes programados y no puede eliminarse.');
      } else {
        alert('Error al eliminar el automóvil.');
      }
    }
  });
}

}
