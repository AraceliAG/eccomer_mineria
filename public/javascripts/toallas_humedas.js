// Datos JSON
const data = {
    "historico_toallas_humedas": [
        {"fecha": "2010-05-16", "precio": 30.00},
        {"fecha": "2011-01-10", "precio": 35.00},
        {"fecha": "2012-11-21", "precio": 40.00},
        {"fecha": "2014-03-10", "precio": 45.00},
        {"fecha": "2015-04-11", "precio": 50.00},
        {"fecha": "2015-06-01", "precio": 55.00},
        {"fecha": "2017-02-15", "precio": 60.00},
        {"fecha": "2018-07-05", "precio": 65.00},
        {"fecha": "2018-08-11", "precio": 70.00},
        {"fecha": "2019-05-20", "precio": 75.00},
        {"fecha": "2019-12-01", "precio": 80.00},
        {"fecha": "2020-03-01", "precio": 85.00},
        {"fecha": "2020-08-15", "precio": 90.00},
        {"fecha": "2021-01-10", "precio": 95.00},
        {"fecha": "2022-01-10", "precio": 100.00},
        {"fecha": "2022-04-15", "precio": 100.00},
        {"fecha": "2023-01-16", "precio": 95.00},
        {"fecha": "2023-04-05", "precio": 90.00},
        {"fecha": "2023-10-01", "precio": 85.00},
        {"fecha": "2024-04-11", "precio": 80.00}
    ]
};

// Extraer fechas y precios
const fechas = data.historico_toallas_humedas.map(entry => entry.fecha);
const precios = data.historico_toallas_humedas.map(entry => entry.precio);

// Crear la gráfica
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: fechas,
        datasets: [{
            label: 'Precio (MXN)',
            data: precios,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});