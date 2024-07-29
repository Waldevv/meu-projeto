// src/componentes/login/Login.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/projetos');
        } else {
            setError('Login failed. Please check your credentials.');
        }
    };

    const handleCancel = () => {
        navigate('/'); 
    };

    return (
        <div className="login-modal">
            <div className="login-modal-content">
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
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
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
