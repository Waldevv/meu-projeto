// src/componentes/register/Register.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

export default function Register() {
    const [nome, setNome] = useState('');
    const [nomeuser, setNomeUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/auth/register', {
                nome,
                nomeuser,
                email,
                password,
            });
            navigate('/login');
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="register-modal">
            <div className="register-modal-content">
                <h2>Cadastro</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <label>
                        Nome de Usuário:
                        <input
                            type="text"
                            value={nomeuser}
                            onChange={(e) => setNomeUser(e.target.value)}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <div className="button-group">
                        <button type="button" onClick={handleCancel}>Cancelar</button>
                        <button type="submit">Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
