// src/componentes/usuarioPieChart/UsuarioPieChart.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import PropTypes from 'prop-types';

export default function UsuarioPieChart({ data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        let chartStatus = Chart.getChart(ctx); 
        if (chartStatus != undefined) {
          chartStatus.destroy();
        }
        
        const alocado = data.filter(user => user.status === 'ALOCADO').length;
        const naoAlocado = data.filter(user => user.status === 'NAO_ALOCADO').length;

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Alocado', 'Não Alocado'],
                datasets: [{
                    label: 'Status dos Usuários',
                    data: [alocado, naoAlocado],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                    hoverBackgroundColor: ['#36A2EB', '#FF6384']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });

    }, [data]);

    return (
        <div className="usuario-pie-chart">
            <canvas ref={chartRef} />
        </div>
    );
}

UsuarioPieChart.propTypes = {
    data: PropTypes.array.isRequired,
};
