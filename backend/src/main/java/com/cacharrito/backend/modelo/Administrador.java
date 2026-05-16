package com.cacharrito.backend.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="administrador")
public class Administrador {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name="id_administrador", nullable = false,columnDefinition = "INT UNSIGNED")
    private  int idAdministrador;

    @Column(name="usuario", nullable = false, length = 45)
    private String usuario;

    @Column(name="contrasena", nullable = false, length = 45)
    private String contrasena;


    public Administrador() {
    }

    public Administrador(String contrasena, int idAdministrador, String usuario) {
        this.contrasena = contrasena;
        this.idAdministrador = idAdministrador;
        this.usuario = usuario;
    }

    public int getIdAdministrador() {
        return idAdministrador;
    }

    public void setIdAdministrador(int idAdministrador) {
        this.idAdministrador = idAdministrador;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }



}
