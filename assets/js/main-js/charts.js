var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
                label: 'Dataset 1',
                data: [2, 9, 3, 5, 2, 3, 9],
                borderColor: "#7811FF",
                label: "Reading",
                borderWidth: 2,
                fill: false,
                backgroundColor: "#7811FF",
                hoverBackgroundColor: "#7811FF",
                tension: 0.4,
                pointHoverBorderColor: 'white',
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHitRadius: 30,
                pointStyle: 'circle',
                pointHoverBorderWidth: 2,
            },
            {
                label: 'Dataset 2',
                data: [5, 8, 2, 6, 8, 3, 1],
                borderColor: "#00AAFF",
                label: "Writing",
                borderWidth: 2,
                fill: false,
                backgroundColor: 'transparent',
                hoverBackgroundColor: "#00AAFF",
                tension: 0.4,
                pointHoverBorderColor: 'white',
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHitRadius: 30,
                pointStyle: 'circle',
                pointHoverBorderWidth: 2,
            }
        ]
    },
    options: {
        maintainAspectRatio: true,
        responsive: true,
        interaction: {
            mode: 'index',
        },


        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 50,
                    usePointStyle: true,
                    pointStyle: "line"
                }
            }
        },
        layout: {
            padding: {
                left: -13,
                right: -10,
                top: 0,
                bottom: 0,
            },
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },


        scales: {
            x: {
                grid: {
                    display: true,
                    color: "#ccc",
                    borderDash: [20, 4],
                    borderColor: "transparent",
                    tickColor: "transparent",
                    z: 1,
                    tickMarkLength: 6,
                    drawTicks: true,
                    drawBorder: false,

                },

            },
            y: {
                beginAtZero: true,
                stacked: false,
                min: 1,
                max: 10,
                grid: {
                    display: false
                }

            }
        }
    }
});