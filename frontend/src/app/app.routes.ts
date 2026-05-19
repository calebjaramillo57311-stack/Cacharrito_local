import { Routes } from '@angular/router';
import { viajesDisponibles } from './viajes-disponibles/viajes-disponibles';
import { Reservar } from './reservar/reservar';

export const routes: Routes = [
    { path: '', redirectTo: 'viajesDisponibles', pathMatch: 'full' },
    {path: 'viajesDisponibles', component: viajesDisponibles},
    { path: 'reservar/:id', component: Reservar }
];
