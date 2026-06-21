package com.filmcatalog.service;

import com.filmcatalog.model.WatchlistItem;
import com.filmcatalog.repository.WatchlistRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;

    public WatchlistService(WatchlistRepository watchlistRepository) {
        this.watchlistRepository = watchlistRepository;
    }

    public List<WatchlistItem> listarPorUsuario(String usuarioId) throws IOException {
        return watchlistRepository.findByUsuarioId(usuarioId);
    }

    public WatchlistItem adicionar(WatchlistItem item) throws IOException {
        return watchlistRepository.save(item);
    }

    public void remover(String id) throws IOException {
        watchlistRepository.deleteById(id);
    }
}
