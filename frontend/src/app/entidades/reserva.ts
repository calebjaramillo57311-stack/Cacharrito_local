import { Administrador } from "./administrador";
import { Usuario } from "./usuario";
import { Viaje } from "./viaje";

export class Reserva {
    idReserva: number;
    fechaReserva: Date;
    estado: string;
    puestoAsignado: number;
    totalPagar: number;
    viaje: Viaje;    
    administrador: Administrador; 
    usuario: Usuario;       
}