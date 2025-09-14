document.addEventListener('DOMContentLoaded', function() {
    // Dados para o Gráfico de Barras
    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Result',
            data: [30, 45, 20, 35, 55, 40, 50, 60, 48, 52, 65, 70],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    // Configuração do Gráfico de Barras
    const barConfig = {
        type: 'bar',
        data: barData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    };

    // Renderizar o Gráfico de Barras
    new Chart(
        document.getElementById('barChart'),
        barConfig
    );

    // Dados para o Gráfico de Rosca (Doughnut)
    const doughnutData = {
        labels: ['Lorem Ipsum 1', 'Lorem Ipsum 2', 'Lorem Ipsum 3'],
        datasets: [{
            data: [45, 30, 25],
            backgroundColor: ['#3b5998', '#ff9800', '#eee'],
            hoverOffset: 4
        }]
    };

    // Configuração do Gráfico de Rosca
    const doughnutConfig = {
        type: 'doughnut',
        data: doughnutData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeInOutBounce'
            }
        }
    };

    // Renderizar o Gráfico de Rosca
    new Chart(
        document.getElementById('doughnutChart'),
        doughnutConfig
    );
});