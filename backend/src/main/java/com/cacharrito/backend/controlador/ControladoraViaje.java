package com.cacharrito.backend.controlador;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

import com.cacharrito.backend.repositorio.viaje;
import com.cacharrito.backend.modelo.Viaje;

@RestController
@RequestMapping("/viaje")
@CrossOrigin(origins= "http://localhost:4200")
public class ControladoraViaje {
    
    @Autowired
    private viaje repositorioViaje;

    @GetMapping("listarViajes/")
    public List<Viaje> listarViajes(@RequestParam("destino") String destino, @RequestParam("fecha") String fecha){
        List<Viaje> viajes = repositorioViaje.listarViajes(destino, fecha);
        return viajes;
    }
}