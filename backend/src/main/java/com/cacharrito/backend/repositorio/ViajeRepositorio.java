package com.cacharrito.backend.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cacharrito.backend.modelo.Viaje;

public interface ViajeRepositorio extends JpaRepository<Viaje, Integer>{
    
    @Query(value="SELECT * "
        + " FROM viaje"
        + " WHERE destino = :destino AND fecha_salida = :fecha"
        + " AND puestos_disponibles > 0", nativeQuery = true)
    public List<Viaje> listarViajes(@Param ("destino") String destino, @Param ("fecha") String fecha);

    List<Viaje> findByPuestosDisponiblesGreaterThan(int cantidad);
}
