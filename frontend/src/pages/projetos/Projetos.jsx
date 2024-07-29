// src/pages/projetos/Projetos.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectsTable from '../../componentes/projectsTable/ProjectsTable';
import ProjectForm from '../../componentes/projectForm/ProjectForm';
import ProjectPieChart from '../../componentes/projectPieChart/ProjectPieChart';
import './Projetos.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Projetos() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchId, setSearchId] = useState('');
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            fetchProjects();
        }
    }, [isAuthenticated, navigate]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:8080/projetos');
            setProjects(response.data.content || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleSearch = async () => {
        if (searchId) {
            try {
                const response = await axios.get(`http://localhost:8080/projetos/${searchId}`);
                setProjects([response.data]);
            } catch (error) {
                console.error('Error fetching project by ID:', error);
            }
        } else {
            fetchProjects();
        }
    };

    const handleAddProject = () => {
        setSelectedProject(null);
        setIsFormOpen(true);
    };

    const handleEditProject = (project) => {
        setSelectedProject(project);
        setIsFormOpen(true);
    };

    const handleDeleteProject = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/projetos/${id}`);
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleFormSubmit = () => {
        setIsFormOpen(false);
        fetchProjects();
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Lista de Projetos', 14, 16);
        const tableColumn = ["ID", "Nome", "Descrição", "Data Início", "Data Fim", "Status", "Responsável"];
        const tableRows = [];

        projects.forEach(project => {
            const projectData = [
                project.id,
                project.nome,
                project.descricao,
                project.datainicio,
                project.datafim,
                project.status,
                project.responsavel,
            ];
            tableRows.push(projectData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });
        doc.save('projects.pdf');
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="projetos-page">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Digite o ID do Projeto"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">🔍</button>
            </div>
            <div className="content">
                <ProjectsTable
                    projects={projects}
                    onEdit={handleEditProject}
                    onDelete={handleDeleteProject}
                />
                <ProjectPieChart data={projects} />
            </div>
            <div className="button-group">
                <button onClick={handleAddProject} className="add-button">Novo Projeto</button>
                <button onClick={downloadPDF} className="download-button">Download</button>
            </div>
            {isFormOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <ProjectForm
                            project={selectedProject}
                            onClose={() => setIsFormOpen(false)}
                            onSubmit={handleFormSubmit}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
