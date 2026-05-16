package com.cacharrito.backend.modelo;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name="id_usuario", nullable = false,columnDefinition = "INT UNSIGNED")
    private String cedula;

    @Column(name="contrasena", nullable = false, length = 45)
    private  String nombre;

    @Column(name="apellidos", nullable = false, length = 100)
    private String apellidos;

    @Column(name="correo_electronico", nullable = false, length = 20)
    private  String telefono;

    @Column(name="fecha_nacimiento", nullable = false)
    private Date fechaNacimiento;
}
