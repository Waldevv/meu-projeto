package br.com.sigli.sigli.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "projetos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Projeto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 150)
    private String nome;

    @NotBlank
    @Size(max = 300)
    private String descricao;

    @NotNull
    private LocalDate datainicio;

    @NotNull
    private LocalDate datafim;

    @Enumerated(EnumType.STRING)
    private ProjetoStatus status;

    @NotBlank
    @Size(max = 100)
    private String responsavel;

    @OneToMany(mappedBy = "projeto", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Usuario> usuarios;
}
