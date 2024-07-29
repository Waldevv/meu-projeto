
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './UsuariosTable.css';

export default function UsuariosTable({ usuarios, onDelete, onEdit }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Projeto ID</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(usuarios) && usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.status}</td>
                        <td>{usuario.projetoId}</td>
                        <td>
                            <button onClick={() => onEdit(usuario)}>Editar</button>
                            <button onClick={() => onDelete(usuario.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

UsuariosTable.propTypes = {
    usuarios: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};
