import { Routes } from '@angular/router';
import { viajesDisponibles } from './viajes-disponibles/viajes-disponibles';
import { Reservar } from './reservar/reservar';
import { ReservaConfirmacion } from './reservaconfirmacion/reservaconfirmacion';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin';
import { AdministradorEntidad } from './entidades/administrador-entidad';
import { login } from './login/login';
import { MisReservas } from './mis-reservas/mis-reservas';

export const routes: Routes = [
    { path: '', redirectTo: 'viajesDisponibles', pathMatch: 'full' },
    { path: 'viajesDisponibles', component: viajesDisponibles },
    { path: 'reservar/:id', component: Reservar },
    { path: 'reservaconfirmacion', component: ReservaConfirmacion },
    { path: 'login', component: login },
    { path: 'dashboard', component: DashboardAdmin },
    {path: 'misReservas', component: MisReservas}
];
