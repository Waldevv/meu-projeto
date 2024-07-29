// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './ProjectForm.css';

const statusOptions = [
    { value: 'PLANEJADO', label: 'Planejado' },
    { value: 'EM_ANDAMENTO', label: 'Em Andamento' },
    { value: 'CONCLUIDO', label: 'Concluído' },
];

export default function ProjectForm({ project, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        datainicio: '',
        datafim: '',
        status: 'PLANEJADO',
        responsavel: '',
        usuarios: []
    });

    useEffect(() => {
        if (project) {
            setFormData({
                nome: project.nome || '',
                descricao: project.descricao || '',
                datainicio: project.datainicio || '',
                datafim: project.datafim || '',
                status: project.status || 'PLANEJADO',
                responsavel: project.responsavel || '',
                usuarios: project.usuarios || []
            });
        }
    }, [project]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (project) {
                await axios.put(`http://localhost:8080/projetos/${project.id}`, formData);
            } else {
                await axios.post('http://localhost:8080/projetos', formData);
            }
            onSubmit();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="project-form">
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                </label>
                <label>
                    Descrição:
                    <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} required />
                </label>
                <label>
                    Data de Início:
                    <input type="date" name="datainicio" value={formData.datainicio} onChange={handleChange} required />
                </label>
                <label>
                    Data de Fim:
                    <input type="date" name="datafim" value={formData.datafim} onChange={handleChange} required />
                </label>
                <label>
                    Status:
                    <select name="status" value={formData.status} onChange={handleChange} required>
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Responsável:
                    <input type="text" name="responsavel" value={formData.responsavel} onChange={handleChange} required />
                </label>
                <div className="form-buttons">
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

ProjectForm.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.number,
        nome: PropTypes.string,
        descricao: PropTypes.string,
        datainicio: PropTypes.string,
        datafim: PropTypes.string,
        status: PropTypes.string,
        responsavel: PropTypes.string,
        usuarios: PropTypes.array,
    }),
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
