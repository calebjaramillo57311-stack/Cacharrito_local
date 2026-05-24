import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutomovilServicio {

  private listarA = 'http://localhost:8080/automoviles/listarAutomoviles';

  private crearA = 'http://localhost:8080/automoviles/crearAutomovil';

  private buscarA = 'http://localhost:8080/automoviles/buscarAutomovil'

  private editarA = 'http://localhost:8080/automoviles/editarAutomovil';

  private eliminarA = 'http://localhost:8080/automoviles/eliminarAutomovil';

  constructor(private http: HttpClient) {}

  listarAutomoviles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.listarA}`);
  }

  crearAutomovil(automovil: any): Observable<any> {
    return this.http.post<any>(`${this.crearA}`, automovil);
  }

  buscarAutomovil(numeroAutomovil: number): Observable<any> {
    return this.http.get<any>(`${this.buscarA}`, {
      params: { numeroAutomovil }
    });
  }

  editarAutomovil(numeroAutomovil: number, automovil: any): Observable<any> {
    return this.http.put<any>(`${this.editarA}`, automovil, {
      params: { numeroAutomovil }
    });
  }

  eliminarAutomovil(numeroAutomovil: number): Observable<any> {
    return this.http.delete<any>(`${this.eliminarA}`, {
      params: { numeroAutomovil }
    });
  }
}