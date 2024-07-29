package br.com.sigli.sigli.dto;

import br.com.sigli.sigli.model.UsuarioStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDto {
    private Long id;
    private String nome;
    private String nomeuser;
    private String email;
    private String password;
    private UsuarioStatus status;
    private Long projetoId;
}
