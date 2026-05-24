import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservaEntidad } from '../entidades/reserva-entidad';

@Injectable({
    providedIn: 'root'
})
export class AdministradorServicio {

    private  apiUrl = 'http://localhost:8080/administrador/login';
    private listarRDia = 'http://localhost:8080/administrador/reservasDelDia';

    constructor(private http: HttpClient) { }
    
    login(usuario: string, contrasena: string): Observable<any> {
        const loginCodificado = btoa(`${usuario}:${contrasena}`);
        const headers = new HttpHeaders({'Authorization': `Basic ${loginCodificado}`});
        return this.http.get(this.apiUrl, { headers, responseType: 'text' as 'json' });
    }

    listarReservasDia(fecha: string) : Observable<ReservaEntidad[]> {
        const params = new HttpParams().set('fecha', fecha)
        return this.http.get<ReservaEntidad[]>(this.listarRDia, {params});
    }
}