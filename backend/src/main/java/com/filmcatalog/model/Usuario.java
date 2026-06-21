package com.filmcatalog.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Usuario {
    private String id;
    private String nome;
    private String email;
    private String senhaCriptografada;
    private LocalDateTime criadoEm;
}
