package com.cacharrito.backend.controlador;

import java.util.Base64;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.cacharrito.backend.modelo.Administrador;
import com.cacharrito.backend.repositorio.AdministradorRepositorio;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AdministradorControlador {

    @Autowired
    private AdministradorRepositorio administradorRepositorio;


@PostMapping("/registro")
public ResponseEntity<?> registro(@RequestBody Map<String, String> body) {
    String usuario = body.get("usuario");
    String contrasena = body.get("contrasena");

    String usuarioCodificado = Base64.getEncoder().encodeToString(usuario.getBytes());
    String passwordCodificado = Base64.getEncoder().encodeToString(contrasena.getBytes());

    Administrador admin = new Administrador();
    admin.setUsuario(usuarioCodificado);
    admin.setContrasena(passwordCodificado);

    administradorRepositorio.save(admin);

    return ResponseEntity.ok("Administrador registrado correctamente");
}

@GetMapping("/login")
public ResponseEntity<?> login(@RequestHeader("Authorization") String authHeader) {
    if (authHeader != null && authHeader.startsWith("Basic ")) {
        String base64Credentials = authHeader.substring(6);
        byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
        String credentials = new String(decodedBytes);
        String[] values = credentials.split(":", 2);
        String username = values[0];
        String password = values[1];

        String usuarioCodificado = Base64.getEncoder().encodeToString(username.getBytes());
        String passwordCodificado = Base64.getEncoder().encodeToString(password.getBytes());
        Optional<Administrador> admin = administradorRepositorio
        .findByUsuarioAndContrasena(usuarioCodificado, passwordCodificado);

        if (admin.isPresent()) {
            return ResponseEntity.ok("Login exitoso");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Header de autorización faltante");
}
}