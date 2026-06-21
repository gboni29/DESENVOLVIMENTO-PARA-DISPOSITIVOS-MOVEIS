package com.filmcatalog.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Avaliacao {
    private String id;
    private String usuarioId;
    private String filmeId;
    private int nota; // 1 a 10
    private String comentario;
    private LocalDateTime criadaEm;
}
