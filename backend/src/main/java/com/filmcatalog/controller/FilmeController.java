package com.filmcatalog.controller;

import com.filmcatalog.model.Filme;
import com.filmcatalog.service.FilmeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

// Controller: recebe as requisições HTTP e delega ao Service.
// Não contém lógica de negócio — apenas converte HTTP ↔ objetos Java e retorna a resposta.
@RestController
@RequestMapping("/api/filmes")
public class FilmeController {

    private final FilmeService filmeService;

    public FilmeController(FilmeService filmeService) {
        this.filmeService = filmeService;
    }

    @GetMapping
    public ResponseEntity<List<Filme>> listarTodos() throws IOException {
        return ResponseEntity.ok(filmeService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filme> buscarPorId(@PathVariable String id) throws IOException {
        return filmeService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Filme> criar(@RequestBody Filme filme) throws IOException {
        return ResponseEntity.ok(filmeService.salvar(filme));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Filme> atualizar(@PathVariable String id, @RequestBody Filme filme) throws IOException {
        filme.setId(id);
        return ResponseEntity.ok(filmeService.salvar(filme));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) throws IOException {
        filmeService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
