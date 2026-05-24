package com.cacharrito.backend.controlador;

import com.cacharrito.backend.modelo.Automovil;
import com.cacharrito.backend.repositorio.AutomovilRepositorio;
import com.cacharrito.backend.repositorio.ViajeRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/automoviles")
@CrossOrigin(origins = "http://localhost:4200")
public class AutomovilControlador {

    @Autowired
    private AutomovilRepositorio repoAuto;

    @Autowired
    private ViajeRepositorio repoViaje;

    // Listar Automóviles
    @GetMapping("/listarAutomoviles")
    public List<Automovil> listarAutomoviles() {
        return repoAuto.listarAutomoviles();
    }

    // Crear Automóvil
    @PostMapping("/crearAutomovil")
    public Automovil guardar(@RequestBody Automovil automovil) {
        return repoAuto.guardar(automovil);
    }

    //Buscar Automóvil
    @GetMapping("/buscarAutomovil")
    public ResponseEntity<Automovil> buscarPorNumero(@RequestParam Integer numeroAutomovil) {
        return repoAuto.findByNumeroAutomovil(numeroAutomovil)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Editar Automóvil
    @PutMapping("/editarAutomovil")
    public Automovil actualizar(@RequestParam Integer numeroAutomovil, @RequestBody Automovil automovil) {
        automovil.setNumeroAutomovil(numeroAutomovil);
        return repoAuto.save(automovil);
    }

    // Eliminar Automóvil
    @DeleteMapping("/eliminarAutomovil")
    public ResponseEntity<?> eliminar(@RequestParam Integer numeroAutomovil) {
        try {
            if (repoViaje.existsByAutomovil_NumeroAutomovil(numeroAutomovil)) {
                return ResponseEntity.status(409).build();
            }
            repoAuto.deleteById(numeroAutomovil);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}