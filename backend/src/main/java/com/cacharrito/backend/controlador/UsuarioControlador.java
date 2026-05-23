package com.cacharrito.backend.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cacharrito.backend.modelo.Usuario;
import com.cacharrito.backend.repositorio.UsuarioRepositorio;

@RestController
@RequestMapping("/usuario/")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioControlador {

    @Autowired
    private UsuarioRepositorio repoUsuario;

    // Buscar usuario por cédula
    @GetMapping("buscar")
public ResponseEntity<Usuario> buscarCedula(@RequestParam String cedula) {
    return repoUsuario.findById(cedula)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}
}
