// src/componentes/projectPieChart/ProjectPieChart.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import 'chart.js/auto';

export default function ProjectPieChart({ data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const currentChartRef = chartRef.current;
        return () => {
            if (currentChartRef) {
                currentChartRef.destroy();
            }
        };
    }, []);

    const projectsByStatus = {
        PLANEJADO: data.filter(project => project.status === 'PLANEJADO').length,
        EM_ANDAMENTO: data.filter(project => project.status === 'EM_ANDAMENTO').length,
        CONCLUIDO: data.filter(project => project.status === 'CONCLUIDO').length,
    };

    const chartData = {
        labels: ['Planejado', 'Em Andamento', 'Concluído'],
        datasets: [
            {
                data: [
                    projectsByStatus.PLANEJADO,
                    projectsByStatus.EM_ANDAMENTO,
                    projectsByStatus.CONCLUIDO,
                ],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div className="project-pie-chart" style={{ maxWidth: '400px' }}>
            <Pie ref={chartRef} data={chartData} />
        </div>
    );
}

ProjectPieChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            nome: PropTypes.string.isRequired,
            descricao: PropTypes.string.isRequired,
            datainicio: PropTypes.string.isRequired,
            datafim: PropTypes.string.isRequired,
            status: PropTypes.oneOf(['PLANEJADO', 'EM_ANDAMENTO', 'CONCLUIDO']).isRequired,
            responsavel: PropTypes.string.isRequired,
        })
    ).isRequired,
};
