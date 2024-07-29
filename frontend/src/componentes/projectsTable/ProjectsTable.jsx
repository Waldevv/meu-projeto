// src/componentes/projectsTable/ProjectsTable.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './ProjectsTable.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

export default function ProjectsTable({ projects, onEdit, onDelete }) {

    const downloadProjectUsersPDF = async (project) => {
        try {
            const response = await axios.get(`http://localhost:8080/projetos/${project.id}/usuarios`);
            const users = response.data;

            if (!users || users.length === 0) {
                console.error('No users found for the project');
                return;
            }

            const doc = new jsPDF();
            doc.text(`Projeto: ${project.nome}`, 14, 16);
            doc.text(`Descrição: ${project.descricao}`, 14, 24);
            doc.text(`Data Início: ${project.datainicio}`, 14, 32);
            doc.text(`Data Fim: ${project.datafim}`, 14, 40);
            doc.text(`Status: ${project.status}`, 14, 48);
            doc.text(`Responsável: ${project.responsavel}`, 14, 56);
            doc.text('Lista de Usuários', 14, 64);

            const tableColumn = ["ID", "Nome", "Email", "Status"];
            const tableRows = [];

            users.forEach(user => {
                const userData = [
                    user.id,
                    user.nome,
                    user.email,
                    user.status,
                ];
                tableRows.push(userData);
            });

            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 70,
            });
            doc.save(`Projeto_${project.nome}_Usuarios.pdf`);
        } catch (error) {
            console.error('Error fetching project users:', error);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Data Início</th>
                    <th>Data Fim</th>
                    <th>Status</th>
                    <th>Responsável</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => (
                    <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>{project.nome}</td>
                        <td>{project.descricao}</td>
                        <td>{project.datainicio}</td>
                        <td>{project.datafim}</td>
                        <td>{project.status}</td>
                        <td>{project.responsavel}</td>
                        <td>
                            <button onClick={() => onEdit(project)}>Editar</button>
                            <button onClick={() => onDelete(project.id)}>Excluir</button>
                            <button onClick={() => downloadProjectUsersPDF(project)}>Detalhes</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

ProjectsTable.propTypes = {
    projects: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
