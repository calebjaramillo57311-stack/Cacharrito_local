import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioEntidad } from '../entidades/usuario-entidad';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServicio {
  private buscarU = 'http://localhost:8080/usuario/buscar';

  constructor(private http: HttpClient) {}

  buscarCedula(cedula: string) {
    const params = new HttpParams().set('cedula', cedula)
    return this.http.get<UsuarioEntidad>(this.buscarU, {params});
  }

}
