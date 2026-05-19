package com.cacharrito.backend.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cacharrito.backend.modelo.Usuario;

public interface  UsuarioRepositorio extends JpaRepository<Usuario, String>{
    
}
