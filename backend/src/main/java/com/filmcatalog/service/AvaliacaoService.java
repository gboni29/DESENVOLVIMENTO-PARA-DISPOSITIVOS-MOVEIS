package com.filmcatalog.service;

import com.filmcatalog.model.Avaliacao;
import com.filmcatalog.repository.AvaliacaoRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class AvaliacaoService {

    private final AvaliacaoRepository avaliacaoRepository;

    public AvaliacaoService(AvaliacaoRepository avaliacaoRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
    }

    public List<Avaliacao> listarPorFilme(String filmeId) throws IOException {
        return avaliacaoRepository.findByFilmeId(filmeId);
    }

    public List<Avaliacao> listarPorUsuario(String usuarioId) throws IOException {
        return avaliacaoRepository.findByUsuarioId(usuarioId);
    }

    public Avaliacao salvar(Avaliacao avaliacao) throws IOException {
        return avaliacaoRepository.save(avaliacao);
    }

    public void deletar(String id) throws IOException {
        avaliacaoRepository.deleteById(id);
    }
}
