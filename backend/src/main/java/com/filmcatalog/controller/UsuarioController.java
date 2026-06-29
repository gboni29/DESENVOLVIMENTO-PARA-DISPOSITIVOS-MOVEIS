package com.filmcatalog.controller;

import com.filmcatalog.model.Usuario;
import com.filmcatalog.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import java.util.Optional;


@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() throws IOException {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable String id) throws IOException {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) throws IOException {
        return ResponseEntity.ok(usuarioService.salvar(usuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable String id, @RequestBody Usuario usuario) throws IOException {
        usuario.setId(id);
        return ResponseEntity.ok(usuarioService.salvar(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) throws IOException {
        usuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody java.util.Map<String, String> body) throws IOException {
        String email = body.get("email");
        String senha = body.get("senha");

        java.util.Optional<Usuario> opt = usuarioService.buscarPorEmail(email);
        if (opt.isEmpty()) {
            return ResponseEntity.status(401).body("E-mail ou senha inválidos.");
        }

        Usuario u = opt.get();
        if (!senha.equals(u.getSenhaCriptografada())) {
            return ResponseEntity.status(401).body("E-mail ou senha inválidos.");
        }

        u.setSenhaCriptografada(null);
        return ResponseEntity.ok(u);
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastro(@RequestBody java.util.Map<String, String> body) throws IOException {
        String email = body.get("email");

        if (usuarioService.buscarPorEmail(email).isPresent()) {
            return ResponseEntity.status(409).body("E-mail já cadastrado.");
        }

        Usuario novo = new Usuario();
        novo.setId(java.util.UUID.randomUUID().toString());
        novo.setNome(body.get("nome"));
        novo.setEmail(email);
        novo.setSenhaCriptografada(body.get("senha"));
        novo.setPapel("USER");
        novo.setCriadoEm(java.time.LocalDateTime.now());

        Usuario salvo = usuarioService.salvar(novo);
        salvo.setSenhaCriptografada(null);
        return ResponseEntity.ok(salvo);
    }
}