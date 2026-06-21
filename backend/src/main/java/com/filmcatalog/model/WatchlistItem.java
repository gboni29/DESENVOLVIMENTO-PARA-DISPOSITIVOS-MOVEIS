package com.filmcatalog.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class WatchlistItem {
    private String id;
    private String usuarioId;
    private String filmeId;
    private LocalDateTime adicionadoEm;
}
