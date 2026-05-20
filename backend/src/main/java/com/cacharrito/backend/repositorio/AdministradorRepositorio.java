package com.cacharrito.backend.repositorio;

import com.cacharrito.backend.modelo.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdministradorRepositorio extends JpaRepository<Administrador, Integer> {
    Optional<Administrador> findByUsuarioAndContrasena(String usuario, String contrasena);
}
