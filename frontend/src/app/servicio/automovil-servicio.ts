import { Injectable } from '@angular/core';
import { AutomovilEntidad } from '../entidades/automovil-entidad';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutomovilServicio {
  constructor(private httpCliente: HttpClient){}
}
