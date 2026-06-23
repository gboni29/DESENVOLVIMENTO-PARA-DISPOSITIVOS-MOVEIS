package com.filmcatalog.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class WatchlistItem {

    private String id;

    private String usuarioId;

    private String filmeId;

    // Necessário para permitir avaliação apenas após assistir
    private boolean assistido;

    private LocalDateTime adicionadoEm;
}