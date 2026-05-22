import { AdministradorServicio } from "../servicio/administrador-servicio";
import { Usuario } from "./usuario";
import { Viaje } from "./viaje";

export class Reserva {
    idReserva: number;
    fechaReserva: Date;
    estado: string;
    puestoAsignado: number;
    totalPagar: number;
    viaje: Viaje;    
    administrador: AdministradorServicio; 
    usuario: Usuario;       
}