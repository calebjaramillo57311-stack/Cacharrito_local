package com.cacharrito.backend.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cacharrito.backend.modelo.Reserva;

@Repository
public interface ReservaRepositorio  extends JpaRepository<Reserva,Integer> {
    public List<Reserva> findByUsuarioCedula(String cedula);

    @Query("SELECT r FROM Reserva r WHERE DATE(r.fechaReserva) = DATE(:fecha)")
    List<Reserva> listarPorDia(@Param("fecha") String fecha);
}
