package com.cacharrito.backend.modelo;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @Column(name="cedula", nullable = false)
    private String cedula;

    @Column(name="nombre", nullable = false, length = 45)
    private String nombre;

    @Column(name="apellidos", nullable = false, length = 100)
    private String apellidos;

    @Column(name="telefono", nullable = false, length = 20)
    private String telefono;

    @Column(name="fecha_nacimiento", nullable = false)
    private Date fechaNacimiento;

    public Usuario() {}

    public Usuario(String cedula, String nombre, String apellidos, String telefono, Date fechaNacimiento) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getCedula() { return cedula; }
    public void setCedula(String cedula) { this.cedula = cedula; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public Date getFechaNacimiento() { return fechaNacimiento; }
    public void setFechaNacimiento(Date fechaNacimiento) { this.fechaNacimiento = fechaNacimiento; }
}