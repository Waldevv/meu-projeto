// src/pages/usuarios/Usuarios.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsuariosTable from '../../componentes/usuariosTable/UsuariosTable';
import UsuarioForm from '../../componentes/usuarioForm/UsuarioForm';
import UsuarioPieChart from '../../componentes/usuarioPieChart/UsuarioPieChart';
import './Usuarios.css';

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:8080/usuarios');
            setUsuarios(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            console.error('Error fetching usuarios:', error);
            setUsuarios([]);
        }
    };

    const handleAddUsuario = () => {
        setSelectedUsuario(null);
        setIsFormOpen(true);
    };

    const handleDeleteUsuario = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/usuarios/${id}`);
            fetchUsuarios();
        } catch (error) {
            console.error('Error deleting usuario:', error);
        }
    };

    const handleFormSubmit = () => {
        setIsFormOpen(false);
        fetchUsuarios();
    };

    return (
        <div className="usuarios-page">
            <div className="content">
                <UsuariosTable
                    usuarios={usuarios}
                    onDelete={handleDeleteUsuario}
                    onEdit={(usuario) => {
                        setSelectedUsuario(usuario);
                        setIsFormOpen(true);
                    }}
                />
                <UsuarioPieChart data={usuarios} />
            </div>
            <button onClick={handleAddUsuario}>Novo Usuário</button>
            {isFormOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <UsuarioForm
                            usuario={selectedUsuario}
                            onClose={() => setIsFormOpen(false)}
                            onSubmit={handleFormSubmit}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
