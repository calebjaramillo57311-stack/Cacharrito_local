import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginServicio {

    private  apiUrl = 'http://localhost:8080/login';

    constructor(private http: HttpClient) { }
    

    login(usuario: string, contrasena: string): Observable<any> {

    const loginCodificado = btoa(`${usuario}:${contrasena}`);

    const headers = new HttpHeaders({
    'Authorization': `Basic ${loginCodificado}`
    });

    
    return this.http.get(this.apiUrl, { headers, responseType: 'text' as 'json' });
    }
}
