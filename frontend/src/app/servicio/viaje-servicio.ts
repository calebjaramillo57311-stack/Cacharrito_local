import { Injectable } from '@angular/core';
import { ViajeEntidad } from '../entidades/viaje-entidad';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams  } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ViajeServicio {
  constructor(private httpCliente: HttpClient){}

  private listarV = 'http://localhost:8080/viaje/listarViajes/';
  private obtenerV = 'http://localhost:8080/viaje/buscarViaje/';
  private listarTodo = 'http://localhost:8080/viaje/listarTodo/';
  private guardarV = 'http://localhost:8080/viaje/guardarViaje/';
  private actualizarV = 'http://localhost:8080/viaje/actualizarViaje/';
  private eliminarV = 'http://localhost:8080/viaje/eliminarViaje/';

  consultarViaje(destino: string, fecha: string) : Observable<ViajeEntidad[]>  {
    const params = new HttpParams().set('destino', destino).set('fecha', fecha);
    return this.httpCliente.get<ViajeEntidad[]>(this.listarV, {params});
  }

  BuscarViaje(idViaje: string) : Observable<ViajeEntidad>  {
    const params = new HttpParams().set('idViaje', idViaje)
    return this.httpCliente.get<ViajeEntidad>(this.obtenerV, {params});
  }
  
  ListarViajes() : Observable<any> {
    return this.httpCliente.get(this.listarTodo);
  }

  GuardarViaje(viaje: ViajeEntidad): Observable<any> {
    return this.httpCliente.post(this.guardarV, viaje);
  }

  actualizarViaje(viaje: ViajeEntidad): Observable<any> {
    return this.httpCliente.put(this.actualizarV, viaje);
  }

  EliminarViaje(idViaje: number): Observable<any> {
    const params = new HttpParams().set('idViaje', idViaje.toString());
    return this.httpCliente.delete(this.eliminarV, { params });
  }
}