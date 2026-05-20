import { Routes } from '@angular/router';
import { viajesDisponibles } from './viajes-disponibles/viajes-disponibles';
import { Reservar } from './reservar/reservar';
import { ReservaConfirmacion } from './reservaconfirmacion/reservaconfirmacion';
import { LoginEntidad } from './login/login';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin';

export const routes: Routes = [
    { path: '', redirectTo: 'viajesDisponibles', pathMatch: 'full' },
    { path: 'viajesDisponibles', component: viajesDisponibles },
    { path: 'reservar/:id', component: Reservar },
    { path: 'reservaconfirmacion', component: ReservaConfirmacion },
    { path: 'loginentidad', component: LoginEntidad },
    { path: 'dashboard', component: DashboardAdmin }
];
