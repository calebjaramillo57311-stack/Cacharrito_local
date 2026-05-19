import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../entidades/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  constructor(private httpCliente: HttpClient){}
  
  private guardarR = 'http://localhost:8080/reserva/guardareserva/';

  guardarReserva(reserva: Reserva): Observable<any> {
    return this.httpCliente.post(this.guardarR, reserva);
  }
}
