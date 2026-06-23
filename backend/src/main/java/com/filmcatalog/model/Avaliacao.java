package com.filmcatalog.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Avaliacao {

    private String id;

    private String usuarioId;

    private String filmeId;

    // Avaliação por múltiplos critérios
    private int notaRoteiro;
    private int notaAtuacao;
    private int notaDirecao;
    private int notaEfeitos;

    // Média geral
    private double notaFinal;

    private String comentario;

    // Preparação para curtidas e denúncias
    private int curtidas;
    private int denuncias;

    // Controle de moderação
    private boolean oculta;

    private LocalDateTime criadaEm;
}