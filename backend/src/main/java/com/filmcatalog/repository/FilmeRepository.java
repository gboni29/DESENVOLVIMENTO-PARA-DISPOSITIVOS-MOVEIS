package com.filmcatalog.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.filmcatalog.model.Filme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class FilmeRepository {

    private final File arquivo;
    private final ObjectMapper mapper;

    public FilmeRepository(@Value("${app.data.path}") String dataPath) {
        this.arquivo = new File(dataPath + "/filmes.json");
        this.mapper = new ObjectMapper().registerModule(new JavaTimeModule());
    }

    public List<Filme> findAll() throws IOException {
        if (!arquivo.exists()) return new ArrayList<>();
        return mapper.readValue(arquivo, new TypeReference<List<Filme>>() {});
    }

    public Optional<Filme> findById(String id) throws IOException {
        return findAll().stream().filter(f -> f.getId().equals(id)).findFirst();
    }

    public Filme save(Filme filme) throws IOException {
        List<Filme> filmes = findAll();
        filmes.removeIf(f -> f.getId().equals(filme.getId()));
        filmes.add(filme);
        mapper.writerWithDefaultPrettyPrinter().writeValue(arquivo, filmes);
        return filme;
    }

    public void deleteById(String id) throws IOException {
        List<Filme> filmes = findAll();
        filmes.removeIf(f -> f.getId().equals(id));
        mapper.writerWithDefaultPrettyPrinter().writeValue(arquivo, filmes);
    }
}
