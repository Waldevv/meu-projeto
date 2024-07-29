package br.com.sigli.sigli.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String nome;

    @NotBlank
    @Size(max = 20)
    private String nomeuser;

    @NotBlank
    @Size(max = 50)
    private String email;

    @NotBlank
    @Size(max = 100) // Tamanho máximo ajustável conforme necessário
    private String password; // Campo de senha adicionado

    @Enumerated(EnumType.STRING)
    private UsuarioStatus status;

    @ManyToOne
    @JoinColumn(name = "projeto_id")
    @JsonBackReference
    private Projeto projeto;
}
