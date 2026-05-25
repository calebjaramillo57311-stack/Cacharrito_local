package com.cacharrito.backend.modelo;

import java.sql.Time;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Viaje")
public class Viaje {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name="idViaje", nullable = false, columnDefinition = "INT UNSIGNED")
    private Integer idViaje;

    @Column(name="destino", nullable = false, length = 100)
    private String destino;

    @Column(name="fechaSalida", nullable = false)
    private Date fechaSalida;

    @Column(name="horaSalida", nullable = false)
    private Time horaSalida;

    @Column(name="puestosDisponibles", nullable = false)
    private Integer puestosDisponibles;

    @Column(name="precioViaje", nullable = false)
    private Double precioViaje;

    @ManyToOne
    @JoinColumn(name = "numeroAutomovil", nullable = false, columnDefinition = "INT UNSIGNED")
    private Automovil automovil;


    public Viaje() {
    }


    public Viaje(String destino, Date fechaSalida, Time horaSalida, int puestosDisponibles, Double precioViaje, Automovil automovil) {
        this.destino = destino;
        this.fechaSalida = fechaSalida;
        this.horaSalida = horaSalida;
        this.puestosDisponibles = puestosDisponibles;
        this.precioViaje = precioViaje;
        this.automovil = automovil;
    }


    public int getIdViaje() {
        return idViaje;
    }


    public void setIdViaje(int idViaje) {
        this.idViaje = idViaje;
    }


    public String getDestino() {
        return destino;
    }


    public void setDestino(String destino) {
        this.destino = destino;
    }


    public Date getFechaSalida() {
        return fechaSalida;
    }


    public void setFechaSalida(Date fechaSalida) {
        this.fechaSalida = fechaSalida;
    }


    public Time getHoraSalida() {
        return horaSalida;
    }


    public void setHoraSalida(Time horaSalida) {
        this.horaSalida = horaSalida;
    }

    public int getPuestosDisponibles() {
        return puestosDisponibles;
    }

    public void setPuestosDisponibles(int puestosDisponibles) {
        this.puestosDisponibles = puestosDisponibles;
    }

    public Double getPrecioViaje() {
        return precioViaje;
    }


    public void setPrecioViaje(Double precioViaje) {
        this.precioViaje = precioViaje;
    }


    public Automovil getAutomovil() {
        return automovil;
    }


    public void setAutomovil(Automovil automovil) {
        this.automovil = automovil;
    }
}