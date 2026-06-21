package com.filmcatalog.service;

import com.filmcatalog.model.Usuario;
import com.filmcatalog.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarTodos() throws IOException {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(String id) throws IOException {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> buscarPorEmail(String email) throws IOException {
        return usuarioRepository.findByEmail(email);
    }

    public Usuario salvar(Usuario usuario) throws IOException {
        return usuarioRepository.save(usuario);
    }

    public void deletar(String id) throws IOException {
        usuarioRepository.deleteById(id);
    }
}
