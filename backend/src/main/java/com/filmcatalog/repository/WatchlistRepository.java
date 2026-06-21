package com.filmcatalog.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.filmcatalog.model.WatchlistItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class WatchlistRepository {

    private final File arquivo;
    private final ObjectMapper mapper;

    public WatchlistRepository(@Value("${app.data.path}") String dataPath) {
        this.arquivo = new File(dataPath + "/watchlist.json");
        this.mapper = new ObjectMapper().registerModule(new JavaTimeModule());
    }

    public List<WatchlistItem> findAll() throws IOException {
        if (!arquivo.exists()) return new ArrayList<>();
        return mapper.readValue(arquivo, new TypeReference<List<WatchlistItem>>() {});
    }

    public List<WatchlistItem> findByUsuarioId(String usuarioId) throws IOException {
        return findAll().stream().filter(w -> w.getUsuarioId().equals(usuarioId)).toList();
    }

    public WatchlistItem save(WatchlistItem item) throws IOException {
        List<WatchlistItem> lista = findAll();
        lista.removeIf(w -> w.getId().equals(item.getId()));
        lista.add(item);
        mapper.writerWithDefaultPrettyPrinter().writeValue(arquivo, lista);
        return item;
    }

    public void deleteById(String id) throws IOException {
        List<WatchlistItem> lista = findAll();
        lista.removeIf(w -> w.getId().equals(id));
        mapper.writerWithDefaultPrettyPrinter().writeValue(arquivo, lista);
    }
}
