package com.cacharrito.backend.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cacharrito.backend.modelo.Reserva;
import com.cacharrito.backend.modelo.Viaje;
import com.cacharrito.backend.repositorio.ReservaRepositorio;
import com.cacharrito.backend.repositorio.UsuarioRepositorio;
import com.cacharrito.backend.repositorio.ViajeRepositorio;

@RestController
@RequestMapping("reserva/")
@CrossOrigin(origins= "http://localhost:4200/")
public class ReservaControlador {
    
    @Autowired
    private ReservaRepositorio repoReserva;

    @Autowired
    private ViajeRepositorio repoViaje;

    @Autowired
    private UsuarioRepositorio repoUsuario;

    // Mostrar todas las reservas
    @GetMapping("listarTodo/")
    public List<Reserva> mostrarRerservas () {
        return repoReserva.findAll();
    }

    // Guardar reserva
    @PostMapping("guardareserva/")
    public Reserva guardarReserva(@RequestBody Reserva reserva) {
    repoUsuario.save(reserva.getUsuario());

    Reserva guardada = repoReserva.save(reserva);

    Viaje viaje = reserva.getViaje();
    if (viaje != null && viaje.getPuestosDisponibles() > 0) {
        viaje.setPuestosDisponibles(viaje.getPuestosDisponibles() - 1);
        repoViaje.save(viaje);
    }

    return guardada;
}
    
    // Buscar reserva por cedula
    @GetMapping("listarReservas/")
    public List<Reserva> listarReservas(@RequestParam ("cedula") String cedula){
        List<Reserva> r = repoReserva.findByUsuarioCedula(cedula);
        return r;
    }

    // Eliminar reserva
    @DeleteMapping("eliminarReserva/")
    public Optional<Reserva> eliminarReserva(@RequestBody int idReserva){
        Optional<Reserva> reserva = repoReserva.findById(idReserva);
        repoReserva.deleteById(idReserva);
        return reserva;
    }

    // Actualizar reserva
    @PutMapping("actualizarReserva/")
    public Reserva actualizarReserva(@RequestBody Reserva reserva){
        return repoReserva.save(reserva);
    }
}