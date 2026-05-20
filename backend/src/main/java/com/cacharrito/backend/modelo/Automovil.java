package com.cacharrito.backend.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
@Table(name="Automovil")
public class Automovil {
    
    @Id
    @Column(name="numeroAutomovil", nullable=false, columnDefinition = "INT UNSIGNED")
    private int numeroAutomovil;

    @Column(name="cantidadPuestos", nullable=false)
    private int cantidadPuestos;

    public Automovil(int numeroAutomovil, int cantidadPuestos) {
        this.numeroAutomovil = numeroAutomovil;
        this.cantidadPuestos = cantidadPuestos;
    }

    public Automovil() {}

    public int getNumeroAutomovil() {
        return this.numeroAutomovil;
    }

    public void setNumeroAutomovil(int numeroAutomovil) {
        this.numeroAutomovil = numeroAutomovil; 
    }

    public int getCantidadPuestos() {
        return this.cantidadPuestos;
    }

    public void setCantidadPuestos(int cantidadPuestos) {
        this.cantidadPuestos = cantidadPuestos; 
    }
}
