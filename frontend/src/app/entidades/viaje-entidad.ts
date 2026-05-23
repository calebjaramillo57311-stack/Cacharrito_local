import { AutomovilEntidad } from "./automovil-entidad";

export class ViajeEntidad {
    idViaje: number;
    destino: string;
    fechaSalida: Date;
    horaSalida: string;
    puestosDisponibles: number;
    precioViaje: number;
    automovil: AutomovilEntidad;
}
