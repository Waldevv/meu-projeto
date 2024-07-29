package br.com.sigli.sigli.controller;

import br.com.sigli.sigli.dto.UsuarioDto;
import br.com.sigli.sigli.model.UsuarioStatus;
import br.com.sigli.sigli.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public Page<UsuarioDto> listarUsuarios(Pageable pageable) {
        return usuarioService.getAllUsers(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDto> obterUsuarioPorId(@PathVariable Long id) {
        UsuarioDto usuarioDto = usuarioService.getUserById(id);
        return ResponseEntity.ok(usuarioDto);
    }

    @PostMapping
    public ResponseEntity<UsuarioDto> criarUsuario(@RequestBody UsuarioDto usuarioDto) {
        UsuarioDto novoUsuario = usuarioService.createUser(usuarioDto);
        return ResponseEntity.ok(novoUsuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDto> atualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDto usuarioDto) {
        UsuarioDto usuarioAtualizado = usuarioService.updateUser(id, usuarioDto);
        return ResponseEntity.ok(usuarioAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {
        usuarioService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/projeto/{projetoId}")
    public ResponseEntity<UsuarioDto> assignProjeto(@PathVariable Long id, @PathVariable Long projetoId) {
        UsuarioDto usuarioAtualizado = usuarioService.assignProjeto(id, projetoId);
        return ResponseEntity.ok(usuarioAtualizado);
    }

    @PutMapping("/{id}/remove-projeto")
    public ResponseEntity<UsuarioDto> removeProjeto(@PathVariable Long id) {
        UsuarioDto usuarioAtualizado = usuarioService.removeProjeto(id);
        return ResponseEntity.ok(usuarioAtualizado);
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<UsuarioDto> atualizarStatus(@PathVariable Long id, @RequestParam UsuarioStatus status) {
        UsuarioDto usuarioAtualizado = usuarioService.updateStatus(id, status);
        return ResponseEntity.ok(usuarioAtualizado);
    }

}
