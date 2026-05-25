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
import { authGuard } from './authGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'viajesDisponibles', pathMatch: 'full' },
  { path: 'viajesDisponibles', component: viajesDisponibles },
  { path: 'reservar/:id', component: Reservar },
  { path: 'reservaConfirmacion', component: ReservaConfirmacion },
  { path: 'login', component: login },
  { path: 'misReservas', component: MisReservas },

  { path: 'dashboard', component: DashboardAdmin, canActivate: [authGuard] },
  { path: 'gestionReservas', component: GestionReservas, canActivate: [authGuard] },
  { path: 'reservasDelDia', component: ReservasDelDia, canActivate: [authGuard] },
  { path: 'gestionAutomoviles', component: GestionAutomoviles, canActivate: [authGuard] },
  { path: 'gestionViajes', component: GestionViajes, canActivate: [authGuard] },
  { path: 'pasajerosPorAutomovil', component: PasajerosPorAutomovil, canActivate: [authGuard] },
];