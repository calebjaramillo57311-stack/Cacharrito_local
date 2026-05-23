import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioEntidad } from '../entidades/usuario-entidad';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServicio {
  private buscarU = 'http://localhost:8080/usuario/';

  constructor(private http: HttpClient) {}

  buscarCedula(cedula: string) {
  return this.http.get<UsuarioEntidad>(`${this.buscarU}buscar?cedula=${cedula}`);
  }

}
