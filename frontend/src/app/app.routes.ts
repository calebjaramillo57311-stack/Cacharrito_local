import { Routes } from '@angular/router';
import { viajesDisponibles } from './viajes-disponibles/viajes-disponibles';
import { Reservar } from './reservar/reservar';
import { ReservaConfirmacion } from './reserva-confirmacion/reserva-confirmacion';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin';
import { login } from './login/login';
import { MisReservas } from './mis-reservas/mis-reservas';
import { GestionReservas } from './gestion-reservas/gestion-reservas';
import { ReservasDelDia } from './reservas-del-dia/reservas-del-dia';
import { GestionAutomoviles } from './gestion-automoviles/gestion-automoviles';
import { GestionViajes } from './gestion-viajes/gestion-viajes';
import { PasajerosPorAutomovil } from './pasajeros-por-automovil/pasajeros-por-automovil';

export const routes: Routes = [
    { path: '', redirectTo: 'viajesDisponibles', pathMatch: 'full' },
    { path: 'viajesDisponibles', component: viajesDisponibles },
    { path: 'reservar/:id', component: Reservar },
    { path: 'reservaConfirmacion', component: ReservaConfirmacion },
    { path: 'login', component: login },
    { path: 'dashboard', component: DashboardAdmin },
    { path: 'misReservas', component: MisReservas},
    { path: 'gestionReservas', component: GestionReservas },
    { path: 'reservasDelDia', component: ReservasDelDia },
    { path: 'gestionAutomoviles', component: GestionAutomoviles},
    { path: 'gestionViajes', component: GestionViajes},
    { path: 'pasajerosPorAutomovil', component: PasajerosPorAutomovil}
];
