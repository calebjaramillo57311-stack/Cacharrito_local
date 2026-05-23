import { AdministradorServicio } from "../servicio/administrador-servicio";
import { UsuarioEntidad } from "./usuario-entidad";
import { ViajeEntidad } from "./viaje-entidad";

export class ReservaEntidad {
    idReserva: number;
    fechaReserva: Date;
    estado: string;
    puestoAsignado: number;
    totalPagar: number;
    viaje: ViajeEntidad;
    administrador: AdministradorServicio;
    usuario: UsuarioEntidad;
}