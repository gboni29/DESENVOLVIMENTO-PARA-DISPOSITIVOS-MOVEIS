package com.filmcatalog.controller;

import com.filmcatalog.model.Avaliacao;
import com.filmcatalog.service.AvaliacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/avaliacoes")
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    public AvaliacaoController(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    @GetMapping("/filme/{filmeId}")
    public ResponseEntity<List<Avaliacao>> listarPorFilme(@PathVariable String filmeId) throws IOException {
        return ResponseEntity.ok(avaliacaoService.listarPorFilme(filmeId));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Avaliacao>> listarPorUsuario(@PathVariable String usuarioId) throws IOException {
        return ResponseEntity.ok(avaliacaoService.listarPorUsuario(usuarioId));
    }

    @PostMapping
    public ResponseEntity<Avaliacao> criar(@RequestBody Avaliacao avaliacao) throws IOException {
        return ResponseEntity.ok(avaliacaoService.salvar(avaliacao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) throws IOException {
        avaliacaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
