import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../entidades/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  constructor(private httpCliente: HttpClient){}
  
  private guardarR = 'http://localhost:8080/reserva/guardareserva/';
  private listarR = 'http://localhost:8080/reserva/listarReservas/';
  

  guardarReserva(reserva: Reserva): Observable<any> {
    return this.httpCliente.post(this.guardarR, reserva);
  }
  buscarPorCedula(cedula: string): Observable<any> {
    const params = new HttpParams().set('cedula', cedula)
  return this.httpCliente.get<Reserva>(this.listarR, {params});
}
}
