package com.filmcatalog.service;

import com.filmcatalog.model.Filme;
import com.filmcatalog.repository.FilmeRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class FilmeService {

    private final FilmeRepository filmeRepository;

    public FilmeService(FilmeRepository filmeRepository) {
        this.filmeRepository = filmeRepository;
    }

    public List<Filme> listarTodos() throws IOException {
        return filmeRepository.findAll();
    }

    public Optional<Filme> buscarPorId(String id) throws IOException {
        return filmeRepository.findById(id);
    }

    public Filme salvar(Filme filme) throws IOException {
        return filmeRepository.save(filme);
    }

    public void deletar(String id) throws IOException {
        filmeRepository.deleteById(id);
    }
}
