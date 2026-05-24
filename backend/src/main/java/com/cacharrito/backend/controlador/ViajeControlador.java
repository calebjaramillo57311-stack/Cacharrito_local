package com.cacharrito.backend.controlador;

import java.util.List;

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

import com.cacharrito.backend.modelo.Automovil;
import com.cacharrito.backend.modelo.Reserva;
import com.cacharrito.backend.modelo.Viaje;
import com.cacharrito.backend.repositorio.AutomovilRepositorio;
import com.cacharrito.backend.repositorio.ReservaRepositorio;
import com.cacharrito.backend.repositorio.ViajeRepositorio;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/viaje/")
@CrossOrigin(origins= "http://localhost:4200")
public class ViajeControlador {
    
    @Autowired
    private ViajeRepositorio viajeRepositorio;

    @Autowired
    private ReservaRepositorio reservaRepositorio;

    @Autowired
    private AutomovilRepositorio automovilRepositorio;

    @GetMapping("listarViajes/")
    public List<Viaje> listarViajes(@RequestParam("destino") String destino, @RequestParam("fecha") String fecha){
        List<Viaje> viajes = viajeRepositorio.listarViajes(destino, fecha);
        return viajes;
    }

    @GetMapping("buscarViaje/")
    public Viaje buscarViaje(@RequestParam int idViaje) {
        Viaje viaje = viajeRepositorio.findById(idViaje).get();
        return viaje;
    }

    @Transactional
    @DeleteMapping("eliminarViaje/")
    public Boolean eliminarViaje(@RequestParam("idViaje") int idViaje) {
    
        List<Reserva> reservas = reservaRepositorio.findByViaje_IdViaje(idViaje);
    
        for (Reserva r : reservas) {
            reservaRepositorio.deleteById(r.getIdReserva());
        }
    
        viajeRepositorio.deleteById(idViaje);
    
        return true;
    }

    @GetMapping("listarTodo/")
    public List<Viaje> listarTodo() {
        return viajeRepositorio.findAll();
    }

    @PostMapping("guardarViaje/")
    public Viaje guardarViaje(@RequestBody Viaje viaje) {
        if (viaje.getAutomovil() != null) {
            Automovil automovil = automovilRepositorio
                .findById(viaje.getAutomovil().getNumeroAutomovil())
                .orElseThrow(() ->
                    new RuntimeException("El automóvil no existe")
                );
            viaje.setAutomovil(automovil); 
        }
        return viajeRepositorio.save(viaje);
    }

    @PutMapping("actualizarViaje/")
    public Viaje actualizarViaje(@RequestBody Viaje viaje) {
    
        if (viaje.getAutomovil() != null) {
        
            Automovil automovil = automovilRepositorio
                .findById(viaje.getAutomovil().getNumeroAutomovil())
                .orElseThrow(() ->
                    new RuntimeException("El automóvil no existe")
                );
            
            viaje.setAutomovil(automovil);
        }
    
        return viajeRepositorio.save(viaje);
    }
}