package br.com.sigli.sigli.service;

import br.com.sigli.sigli.dto.UsuarioDto;
import br.com.sigli.sigli.model.Usuario;
import br.com.sigli.sigli.model.UsuarioStatus;
import br.com.sigli.sigli.repository.UsuarioRepository;
import br.com.sigli.sigli.repository.ProjetoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Método para buscar usuário pelo email
    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com email: " + email));
    }

    // Método para salvar um novo usuário
    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Obtém um usuário pelo ID
    public UsuarioDto getUserById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + id));
        return modelMapper.map(usuario, UsuarioDto.class);
    }

    // Cria um novo usuário
    public UsuarioDto createUser(UsuarioDto userDTO) {
        Usuario usuario = modelMapper.map(userDTO, Usuario.class);
        usuario.setStatus(UsuarioStatus.NAO_ALOCADO); // Define o status padrão
        Usuario savedUser = usuarioRepository.save(usuario);
        return modelMapper.map(savedUser, UsuarioDto.class);
    }

    // Atualiza um usuário existente
    public UsuarioDto updateUser(Long id, UsuarioDto userDTO) {
        if (usuarioRepository.existsById(id)) {
            Usuario usuario = modelMapper.map(userDTO, Usuario.class);
            usuario.setId(id);
            Usuario updatedUser = usuarioRepository.save(usuario);
            return modelMapper.map(updatedUser, UsuarioDto.class);
        }
        throw new EntityNotFoundException("Usuário não encontrado com ID: " + id);
    }

    // Remove um usuário pelo ID
    public void deleteUser(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new EntityNotFoundException("Usuário não encontrado com ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    // Lista todos os usuários com paginação
    public Page<UsuarioDto> getAllUsers(Pageable pageable) {
        return usuarioRepository.findAll(pageable)
                .map(user -> modelMapper.map(user, UsuarioDto.class));
    }

    // Associa um projeto a um usuário
    public UsuarioDto assignProjeto(Long id, Long projetoId) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + id));
        usuario.setProjeto(projetoRepository.findById(projetoId)
                .orElseThrow(() -> new EntityNotFoundException("Projeto não encontrado com ID: " + projetoId)));
        Usuario updatedUser = usuarioRepository.save(usuario);
        return modelMapper.map(updatedUser, UsuarioDto.class);
    }

    // Remove a associação de um projeto a um usuário
    public UsuarioDto removeProjeto(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + id));
        usuario.setProjeto(null);
        Usuario updatedUser = usuarioRepository.save(usuario);
        return modelMapper.map(updatedUser, UsuarioDto.class);
    }

    // Obtém todos os usuários associados a um projeto pelo ID do projeto
    public List<Usuario> getUsuariosByProjetoId(Long projetoId) {
        return usuarioRepository.findByProjetoId(projetoId);
    }

    public UsuarioDto updateStatus(Long id, UsuarioStatus novoStatus) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + id));
        usuario.setStatus(novoStatus);
        Usuario usuarioAtualizado = usuarioRepository.save(usuario);
        return modelMapper.map(usuarioAtualizado, UsuarioDto.class);
    }
}
