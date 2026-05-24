import { AdministradorEntidad } from "../entidades/administrador-entidad";
import { UsuarioEntidad } from "./usuario-entidad";
import { ViajeEntidad } from "./viaje-entidad";

export class ReservaEntidad {
    idReserva: number;
    fechaReserva: Date;
    estado: string;
    puestoAsignado: number;
    totalPagar: number;
    viaje: ViajeEntidad;
    administrador: AdministradorEntidad;
    usuario: UsuarioEntidad;
}