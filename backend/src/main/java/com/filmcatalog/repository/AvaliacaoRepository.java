package com.filmcatalog.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.filmcatalog.model.Avaliacao;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AvaliacaoRepository {

    private final File arquivo;
    private final ObjectMapper mapper;

    public AvaliacaoRepository(@Value("${app.data.path}") String dataPath) {
        this.arquivo = new File(dataPath + "/avaliacoes.json");
        this.mapper = new ObjectMapper().registerModule(new JavaTimeModule());
    }

    public List<Avaliacao> findAll() throws IOException {
        if (!arquivo.exists()) return new ArrayList<>();
        return mapper.readValue(arquivo, new TypeReference<List<Avaliacao>>() {});
    }

    public List<Avaliacao> findByFilmeId(String filmeId) throws IOException {
        return findAll().stream().filter(a -> a.getFilmeId().equals(filmeId)).toList();
    }

    public List<Avaliacao> findByUsuarioId(String usuarioId) throws IOException {
        return findAll().stream().filter(a -> a.getUsuarioId().equals(usuarioId)).toList();
    }

    public Avaliacao save(Avaliacao avaliacao) throws IOException {
        List<Avaliacao> avaliacoes = findAll();
        avaliacoes.removeIf(a -> a.getId().equals(avaliacao.getId()));
        avaliacoes.add(avaliacao);
        mapper.writerWithDefaultPrettyPrinter().writeValue(arquivo, avaliacoes);
        return avaliacao;
    }

    public void deleteById(String id) throws IOException {
        List<Avaliacao> avaliacoes = findAll();
        avaliacoes.removeIf(a -> a.getId().equals(id));
        mapper.writerWithDefaultPrettyPrinter().writeValue(arquivo, avaliacoes);
    }
}
