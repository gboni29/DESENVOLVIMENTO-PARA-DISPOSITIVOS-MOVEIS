package com.filmcatalog.model;

import lombok.Data;
import java.util.List;

@Data
public class Filme {
    private String id;
    private String titulo;
    private String diretor;
    private int anoLancamento;
    private List<String> generos;
    private String sinopse;
    private String posterUrl;
    private int duracaoMinutos;
}
