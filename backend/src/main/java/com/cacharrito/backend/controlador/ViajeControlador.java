package com.cacharrito.backend.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cacharrito.backend.modelo.Viaje;
import com.cacharrito.backend.repositorio.ViajeRepositorio;

@RestController
@RequestMapping("/viaje/")
@CrossOrigin(origins= "http://localhost:4200")
public class ViajeControlador {
    
    @Autowired
    private ViajeRepositorio repositorioViaje;

    @GetMapping("listarViajes/")
    public List<Viaje> listarViajes(@RequestParam("destino") String destino, @RequestParam("fecha") String fecha){
        List<Viaje> viajes = repositorioViaje.listarViajes(destino, fecha);
        return viajes;
    }

    @GetMapping("buscarViaje/")
    public Viaje buscarViaje(@RequestParam int idViaje) {
        Viaje viaje = repositorioViaje.findById(idViaje).get();
        return viaje;
    }
}