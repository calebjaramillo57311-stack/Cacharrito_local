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
  private listarT = 'http://localhost:8080/reserva/listarTodo/';
  private cancelarR = 'http://localhost:8080/reserva/actualizarReserva/';
  private eliminarR = 'http://localhost:8080/reserva/eliminarReserva/';
  private buscarPorA = 'http://localhost:8080/reserva/buscarPorAutomovil/';

  guardarReserva(reserva: ReservaEntidad): Observable<any> {
    return this.httpCliente.post(this.guardarR, reserva);
  }
  buscarPorCedula(cedula: string): Observable<any> {
    const params = new HttpParams().set('cedula', cedula)
    return this.httpCliente.get<ReservaEntidad>(this.listarR, {params});
  }

  buscarPorAutomovil(numeroAutomovil: string): Observable<ReservaEntidad[]> {
    const params = new HttpParams().set('numeroAutomovil', numeroAutomovil);
    return this.httpCliente.get<ReservaEntidad[]>(this.buscarPorA, { params });
  }

  listarTodo(): Observable<ReservaEntidad[]> {
    return this.httpCliente.get<ReservaEntidad[]>(this.listarT);
  }

  cancelarReserva(reserva: ReservaEntidad): Observable<any> {
    return this.httpCliente.put(this.cancelarR, reserva);
  }

  eliminarReserva(idReserva: number): Observable<any> {
    return this.httpCliente.delete(this.eliminarR, { body: idReserva });
  }
}
