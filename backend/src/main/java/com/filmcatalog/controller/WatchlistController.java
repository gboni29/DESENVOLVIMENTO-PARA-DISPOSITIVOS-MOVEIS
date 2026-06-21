package com.filmcatalog.controller;

import com.filmcatalog.model.WatchlistItem;
import com.filmcatalog.service.WatchlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<WatchlistItem>> listarPorUsuario(@PathVariable String usuarioId) throws IOException {
        return ResponseEntity.ok(watchlistService.listarPorUsuario(usuarioId));
    }

    @PostMapping
    public ResponseEntity<WatchlistItem> adicionar(@RequestBody WatchlistItem item) throws IOException {
        return ResponseEntity.ok(watchlistService.adicionar(item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable String id) throws IOException {
        watchlistService.remover(id);
        return ResponseEntity.noContent().build();
    }
}
