import { Automovil } from "./automovil";

export class ViajeEntidad {
    idViaje: number;
    destino: string;
    fechaSalida: Date;
    horaSalida: string;
    puestosDisponibles: number;
    precioViaje: number;
    automovil: Automovil;
}
