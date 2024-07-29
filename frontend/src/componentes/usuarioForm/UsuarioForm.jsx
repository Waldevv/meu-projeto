// src/componentes/usuarioForm/UsuarioForm.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './UsuarioForm.css';

export default function UsuarioForm({ usuario, onClose, onSubmit }) {
    const [nome, setNome] = useState(usuario ? usuario.nome : '');
    const [email, setEmail] = useState(usuario ? usuario.email : '');
    const [nomeuser, setNomeUser] = useState(usuario ? usuario.nomeuser : '');
    const [password, setPassword] = useState(usuario ? '' : '');
    const [status, setStatus] = useState(usuario ? usuario.status : 'NAO_ALOCADO');
    const [projetoId, setProjetoId] = useState(usuario ? usuario.projetoId : '');
    const [projetos, setProjetos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProjetos();
    }, []);

    const fetchProjetos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/projetos');
            setProjetos(response.data.content || []);
        } catch (error) {
            console.error('Error fetching projetos:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (status === 'ALOCADO' && !projetoId) {
            setError('Por favor, selecione um projeto para um usuário alocado.');
            return;
        }

        const updatedUsuario = {
            nome,
            email,
            nomeuser,
            password: password || undefined, 
            status,
            projetoId: status === 'NAO_ALOCADO' ? null : projetoId,
        };

        console.log('Enviando dados:', updatedUsuario); 

        try {
            if (usuario && usuario.id) {
                await axios.put(`http://localhost:8080/usuarios/${usuario.id}`, updatedUsuario);
            } else {
                await axios.post('http://localhost:8080/usuarios', updatedUsuario);
            }
            onSubmit();
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Error submitting form. Please try again.');
        }
    };

    return (
        <div className="usuario-form">
            <h2>{usuario ? 'Edit' : 'Add'} Usuario</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Nome de Usuário:
                    <input
                        type="text"
                        value={nomeuser}
                        onChange={(e) => setNomeUser(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Senha:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    Status:
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="ALOCADO">Alocado</option>
                        <option value="NAO_ALOCADO">Não Alocado</option>
                    </select>
                </label>
                {status === 'ALOCADO' && (
                    <label>
                        Projeto ID:
                        <select
                            value={projetoId}
                            onChange={(e) => setProjetoId(e.target.value)}
                            required={status === 'ALOCADO'}
                        >
                            <option value="">Selecione um projeto</option>
                            {projetos.map((projeto) => (
                                <option key={projeto.id} value={projeto.id}>
                                    {projeto.nome}
                                </option>
                            ))}
                        </select>
                    </label>
                )}
                <div className="button-group">
                    <button type="button" onClick={onClose}>Cancelar</button>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    );
}

UsuarioForm.propTypes = {
    usuario: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
