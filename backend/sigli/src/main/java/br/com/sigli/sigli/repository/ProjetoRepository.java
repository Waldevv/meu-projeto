package br.com.sigli.sigli.repository;

import br.com.sigli.sigli.model.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
}
