package br.com.sigli.sigli.controller;

import br.com.sigli.sigli.dto.UsuarioDto;
import br.com.sigli.sigli.model.Usuario;
import br.com.sigli.sigli.model.UsuarioStatus;
import br.com.sigli.sigli.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UsuarioDto usuarioDto) {
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(usuarioDto.getNome());
        novoUsuario.setNomeuser(usuarioDto.getNomeuser());
        novoUsuario.setEmail(usuarioDto.getEmail());
        novoUsuario.setPassword(usuarioDto.getPassword());
        novoUsuario.setStatus(UsuarioStatus.NAO_ALOCADO);
        novoUsuario.setProjeto(null);

        usuarioService.save(novoUsuario);
        return ResponseEntity.ok("Usuário registrado com sucesso");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UsuarioDto usuarioDto) {
        Usuario usuario = usuarioService.findByEmail(usuarioDto.getEmail());
        if (usuario != null && usuario.getPassword().equals(usuarioDto.getPassword())) {
            return ResponseEntity.ok("Login realizado com sucesso");
        }
        return ResponseEntity.status(401).body("Credenciais inválidas");
    }
}
