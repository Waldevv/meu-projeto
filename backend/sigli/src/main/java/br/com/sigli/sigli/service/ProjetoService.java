package br.com.sigli.sigli.service;

import br.com.sigli.sigli.dto.ProjetoDto;
import br.com.sigli.sigli.dto.UsuarioDto;
import br.com.sigli.sigli.model.Projeto;
import br.com.sigli.sigli.model.ProjetoStatus;
import br.com.sigli.sigli.model.Usuario;
import br.com.sigli.sigli.model.UsuarioStatus;
import br.com.sigli.sigli.repository.ProjetoRepository;
import br.com.sigli.sigli.repository.UsuarioRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ModelMapper modelMapper;

    private static final Logger logger = LoggerFactory.getLogger(ProjetoService.class);


    // Obtém um projeto pelo ID
    public ProjetoDto getProjetoById(Long id) {
        Projeto projeto = projetoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Projeto não encontrado com ID: " + id));
        return modelMapper.map(projeto, ProjetoDto.class);
    }

    // Cria um novo projeto
    public ProjetoDto createProjeto(ProjetoDto projetoDTO) {
        Projeto projeto = modelMapper.map(projetoDTO, Projeto.class);
        Projeto savedProjeto = projetoRepository.save(projeto);
        return modelMapper.map(savedProjeto, ProjetoDto.class);
    }

    // Atualiza um projeto existente
    public ProjetoDto updateProjeto(Long id, ProjetoDto projetoDTO) {
        Projeto projeto = projetoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Projeto não encontrado com ID: " + id));

        logger.info("Atualizando projeto com ID: {}", id);

        try {
            // Atualizar campos do projeto
            projeto.setNome(projetoDTO.getNome());
            projeto.setDescricao(projetoDTO.getDescricao());
            projeto.setDatainicio(projetoDTO.getDatainicio());
            projeto.setDatafim(projetoDTO.getDatafim());
            projeto.setStatus(projetoDTO.getStatus());
            projeto.setResponsavel(projetoDTO.getResponsavel());

            // Atualizar a coleção de usuários, garantir que a lista de usuários não seja nula
            if (projetoDTO.getUsuarios() != null) {
                List<Usuario> novosUsuarios = new ArrayList<>();
                for (UsuarioDto usuarioDto : projetoDTO.getUsuarios()) {
                    Usuario usuario = modelMapper.map(usuarioDto, Usuario.class);
                    usuario.setProjeto(projeto); // Associar o projeto ao usuário
                    novosUsuarios.add(usuario);
                }
                projeto.getUsuarios().clear();
                projeto.getUsuarios().addAll(novosUsuarios);
            }

            Projeto updatedProjeto = projetoRepository.save(projeto);
            return modelMapper.map(updatedProjeto, ProjetoDto.class);
        } catch (Exception e) {
            logger.error("Erro ao atualizar o projeto com ID: " + id, e);
            throw e;
        }
    }

    // Atualiza o status de um projeto existente
    public ProjetoDto updateStatus(Long id, ProjetoStatus novoStatus) {
        Projeto projeto = projetoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Projeto não encontrado com ID: " + id));
        projeto.setStatus(novoStatus);
        Projeto projetoAtualizado = projetoRepository.save(projeto);
        return modelMapper.map(projetoAtualizado, ProjetoDto.class);
    }

    // Remove um projeto pelo ID
    public void deleteProjeto(Long id) {
        if (!projetoRepository.existsById(id)) {
            throw new EntityNotFoundException("Projeto não encontrado com ID: " + id);
        }

        // Atualizar associação dos usuários com o projeto
        List<Usuario> usuarios = usuarioRepository.findByProjetoId(id);
        for (Usuario usuario : usuarios) {
            usuario.setProjeto(null);
            usuario.setStatus(UsuarioStatus.NAO_ALOCADO);
            usuarioRepository.save(usuario);
        }

        projetoRepository.deleteById(id);
    }

    // Lista todos os projetos com paginação
    public Page<ProjetoDto> getAllProjetos(Pageable pageable) {
        return projetoRepository.findAll(pageable)
                .map(projeto -> modelMapper.map(projeto, ProjetoDto.class));
    }
}
