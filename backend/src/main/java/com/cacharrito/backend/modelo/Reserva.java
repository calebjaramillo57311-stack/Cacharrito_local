package com.cacharrito.backend.modelo;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="reserva")
public class Reserva {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name="id_reserva", nullable = false,columnDefinition = "INT UNSIGNED")
    private int idReserva;
    
    @Column(name="fecha_reserva", nullable = false)
    private Date fechaReserva;
    

    @Column(name="estado", nullable = false, length = 20)
    private String estado;

    @Column(name="puesto_asignado", nullable = false)
    private int puestoAsignado;

    @Column(name="total_pagar", nullable = false)
    private Double totalPagar;

    @ManyToOne
    @JoinColumn(name = "usuarioCedula", nullable = false,columnDefinition = "INT UNSIGNED")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idViaje", nullable = false,columnDefinition = "INT UNSIGNED")
    private Viaje viaje;

    @ManyToOne
    @JoinColumn(name = "idAdministrador", nullable = false,columnDefinition = "INT UNSIGNED")
    private Administrador administrador;

    public Reserva() {
    }

    public Reserva(Date fechaReserva, String estado, int puestoAsignado, Double totalPagar,
            Usuario usuario, Viaje viaje, Administrador administrador) {
        
        this.fechaReserva = fechaReserva;
        this.estado = estado;
        this.puestoAsignado = puestoAsignado;
        this.totalPagar = totalPagar;
        this.usuario = usuario;
        this.viaje = viaje;
        this.administrador = administrador;
    }

    public int getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(int idReserva) {
        this.idReserva = idReserva;
    }

    public Date getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(Date fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public int getPuestoAsignado() {
        return puestoAsignado;
    }

    public void setPuestoAsignado(int puestoAsignado) {
        this.puestoAsignado = puestoAsignado;
    }

    public Double getTotalPagar() {
        return totalPagar;
    }

    public void setTotalPagar(Double totalPagar) {
        this.totalPagar = totalPagar;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Viaje getViaje() {
        return viaje;
    }

    public void setViaje(Viaje viaje) {
        this.viaje = viaje;
    }

    public Administrador getAdministrador() {
        return administrador;
    }

    public void setAdministrador(Administrador administrador) {
        this.administrador = administrador;
    }

    


}