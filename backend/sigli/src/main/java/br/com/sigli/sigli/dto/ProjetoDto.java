package br.com.sigli.sigli.dto;

import br.com.sigli.sigli.model.ProjetoStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjetoDto {
    private Long id;
    private String nome;
    private String descricao;
    private LocalDate datainicio;
    private LocalDate datafim;
    private ProjetoStatus status;
    private String responsavel;
    private List<UsuarioDto> usuarios;
}
