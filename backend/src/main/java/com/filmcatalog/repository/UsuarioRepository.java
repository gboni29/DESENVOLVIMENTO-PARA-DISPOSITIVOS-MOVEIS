package com.filmcatalog.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.filmcatalog.model.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class UsuarioRepository {

    private final File arquivo;
    private final ObjectMapper mapper;

    public UsuarioRepository(@Value("${app.data.path}") String dataPath) {
        this.arquivo = new File(dataPath + "/usuarios.json");
        this.mapper = new ObjectMapper().registerModule(new JavaTimeModule());
    }

    public List<Usuario> findAll() throws IOException {
        if (!arquivo.exists()) return new ArrayList<>();
        return mapper.readValue(arquivo, new TypeReference<List<Usuario>>() {});
    }

    public Optional<Usuario> findById(String id) throws IOException {
        return findAll().stream().filter(u -> u.getId().equals(id)).findFirst();
    }

    public Optional<Usuario> findByEmail(String email) throws IOException {
        return findAll().stream().filter(u -> u.getEmail().equals(email)).findFirst();
    }

    public Usuario save(Usuario usuario) throws IOException {
        List<Usuario> usuarios = findAll();
        usuarios.removeIf(u -> u.getId().equals(usuario.getId()));
        usuarios.add(usuario);
        mapper.writerWithDefaultPrettyPrinter().writeValue(arquivo, usuarios);
        return usuario;
    }

    public void deleteById(String id) throws IOException {
        List<Usuario> usuarios = findAll();
        usuarios.removeIf(u -> u.getId().equals(id));
        mapper.writerWithDefaultPrettyPrinter().writeValue(arquivo, usuarios);
    }
}
