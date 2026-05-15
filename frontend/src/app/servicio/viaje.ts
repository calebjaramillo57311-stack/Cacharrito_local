import { Injectable } from '@angular/core';
import { Viaje } from '../entidades/viaje';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams  } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  constructor(private httpCliente: HttpClient){}

  private listarV = 'http://localhost:8080/viaje/listarViajes/';

  consultarViaje(destino: string, fecha: string) : Observable<Viaje[]>  {
    const params = new HttpParams().set('destino', destino).set('fecha', fecha);
    return this.httpCliente.get<Viaje[]>(this.listarV, {params});
  }
}
