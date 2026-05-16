package com.cacharrito.backend.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cacharrito.backend.modelo.Reserva;
import com.cacharrito.backend.repositorio.ReservaRepositorio;





@RestController
@RequestMapping("reservas/")
public class ReservaControlador {
    @Autowired
    private ReservaRepositorio repoReserva;

    

    //  mostrar todas las reservas
    @GetMapping("listarTodo/")
    public List<Reserva>mostrarRerservas () {
        return repoReserva.findAll();
    }

    //guardar 
    @PostMapping("guardareserva/")
    public Reserva guardarReserva(@RequestBody Reserva reserva){
        return repoReserva.save(reserva);
    }
    
    // buscar reserva por id
    @GetMapping("buscarReserva/")
    public Reserva buscarReserva(@RequestBody int idReserva){
        return repoReserva.findById(idReserva).orElse(null);
    }

    //eliminar reserva
    @DeleteMapping("eliminarReserva/")
    public Optional<Reserva> eliminarReserva(@RequestBody int idReserva){
        Optional<Reserva> reserva = repoReserva.findById(idReserva);
        repoReserva.deleteById(idReserva);
        return reserva;
    }

    // actualizar reserva
    @PutMapping("actualizarReserva/")
    public Reserva actualizarReserva(@RequestBody Reserva reserva){
        return repoReserva.save(reserva);
    }

    
}


