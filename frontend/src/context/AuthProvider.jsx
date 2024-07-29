// src/context/AuthProvider.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/login', { email, password });
            if (response.status === 200) {
                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated', 'true');
                return true;
            }
        } catch (error) {
            console.error('Login failed:', error);
            setIsAuthenticated(false);
            localStorage.setItem('isAuthenticated', 'false');
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};
