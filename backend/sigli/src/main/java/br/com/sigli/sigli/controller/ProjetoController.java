package br.com.sigli.sigli.controller;

import br.com.sigli.sigli.dto.ProjetoDto;
import br.com.sigli.sigli.model.ProjetoStatus;
import br.com.sigli.sigli.service.ProjetoService;
import br.com.sigli.sigli.model.Usuario;
import br.com.sigli.sigli.service.UsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/projetos")
public class ProjetoController {

    @Autowired
    private ProjetoService projetoService;

    private static final Logger logger = LoggerFactory.getLogger(ProjetoController.class);

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public Page<ProjetoDto> listarProjetos(Pageable pageable) {
        return projetoService.getAllProjetos(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjetoDto> obterProjetoPorId(@PathVariable Long id) {
        ProjetoDto projetoDto = projetoService.getProjetoById(id);
        return ResponseEntity.ok(projetoDto);
    }

    @PostMapping
    public ResponseEntity<ProjetoDto> criarProjeto(@RequestBody ProjetoDto projetoDto) {
        ProjetoDto novoProjeto = projetoService.createProjeto(projetoDto);
        return ResponseEntity.ok(novoProjeto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjetoDto> atualizarProjeto(@PathVariable Long id, @RequestBody ProjetoDto projetoDto) {
        try {
            ProjetoDto projetoAtualizado = projetoService.updateProjeto(id, projetoDto);
            return ResponseEntity.ok(projetoAtualizado);
        } catch (EntityNotFoundException e) {
            logger.error("Projeto não encontrado com ID: " + id, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            logger.error("Erro ao atualizar o projeto com ID: " + id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ProjetoDto> atualizarStatus(@PathVariable Long id, @RequestParam ProjetoStatus status) {
        ProjetoDto projetoAtualizado = projetoService.updateStatus(id, status);
        return ResponseEntity.ok(projetoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProjeto(@PathVariable Long id) {
        projetoService.deleteProjeto(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{projetoId}/usuarios")
    public List<Usuario> getUsuariosByProjetoId(@PathVariable Long projetoId) {
        return usuarioService.getUsuariosByProjetoId(projetoId);
    }
}
