package com.cacharrito.backend.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cacharrito.backend.modelo.Automovil;

public interface AutomovilRepositorio extends JpaRepository<Automovil, Integer> {

    // Listar Automóviles
    @Query("SELECT a FROM Automovil a")
    List<Automovil> listarAutomoviles();

    // Crear Automóvil - Editar Automóvil
    default Automovil guardar(Automovil automovil) {
    return save(automovil);
    }

    // Buscar Automóvil
    Optional<Automovil> findByNumeroAutomovil(Integer numeroAutomovil);
}


    

