package com.cacharrito.backend.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cacharrito.backend.modelo.Reserva;

@Repository
public interface ReservaRepositorio  extends JpaRepository<Reserva,Integer> {
    public List<Reserva> findByUsuarioCedula(String cedula);
}
