import { Automovil } from "./automovil";

export class Viaje {
    idViaje: number;
    destino: string;
    fechaSalida: Date;
    horaSalida: string;
    puestosDisponibles: number;
    precioViaje: number;
    automovil: Automovil;
}
