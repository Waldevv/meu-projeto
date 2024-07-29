package br.com.sigli.sigli.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.sigli.sigli.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    List<Usuario> findByProjetoId(Long projetoId);
    Optional<Usuario> findByEmail(String email); // Método para buscar usuário pelo email
}
