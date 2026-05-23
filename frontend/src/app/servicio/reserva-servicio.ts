import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservaEntidad } from '../entidades/reserva-entidad';

@Injectable({
  providedIn: 'root',
})
export class ReservaServicio {
  constructor(private httpCliente: HttpClient){}
  
  private guardarR = 'http://localhost:8080/reserva/guardareserva/';
  
  private listarR = 'http://localhost:8080/reserva/listarReservas/';
  

  guardarReserva(reserva: ReservaEntidad): Observable<any> {
    return this.httpCliente.post(this.guardarR, reserva);
  }
  buscarPorCedula(cedula: string): Observable<any> {
    const params = new HttpParams().set('cedula', cedula)
  return this.httpCliente.get<ReservaEntidad>(this.listarR, {params});
}
}
