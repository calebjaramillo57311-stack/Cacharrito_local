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

  consultarViaje(destino: string, fecha: string) : Observable<ViajeEntidad[]>  {
    const params = new HttpParams().set('destino', destino).set('fecha', fecha);
    return this.httpCliente.get<ViajeEntidad[]>(this.listarV, {params});
  }

  BuscarViaje(idViaje: string) : Observable<ViajeEntidad>  {
    const params = new HttpParams().set('idViaje', idViaje)
    return this.httpCliente.get<ViajeEntidad>(this.obtenerV, {params});
  }
}