// line chart

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Apr 14', 'Apr 15', 'Apr 16', 'Apr 17', 'Apr 18', 'Apr 19', 'Apr 20'],
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
                borderSkipped: false

            },
            {
                label: 'Dataset 2',
                data: [5, 8, 2, 6, 8, 3, 1],
                borderColor: "#00AAFF",
                label: "Writing",
                borderWidth: 2,
                fill: false,
                backgroundColor: '#00AAFF',
                hoverBackgroundColor: "#00AAFF",
                tension: 0.4,
                pointHoverBorderColor: 'white',
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHitRadius: 30,
                pointStyle: 'circle',
                pointHoverBorderWidth: 2,
                borderSkipped: false

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
                    pointStyle: "circle"
                }
            }
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
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
            y: {
                stacked: false,
                beginAtZero: true,
                min: 0,
                max: 10,

                grid: {

                    display: false,
                    borderColor: 'white',
                    borderWidth: 0,
                    
                },
                ticks: {
                    beginAtZero: true,
                    zeroLineColor: "#E3E6EF",
                    color: "#8C90A4",
                    padding: 30,
                    max: 3,
                    stepSize: 2,
                    callback(value, index, values) {
                        return `${value}k`;
                    },
                },
            },
            x: {

                stacked: false,

                grid: {
                    display: true,
                    color: '#FFF4FE',
                    borderColor: 'white',
                    borderWidth: 0,
                    

                },
                ticks: {

                    zeroLineColor: "#E3E6EF",
                    color: "#8C90A4",
                    padding: 30,

                },

            }
        }
    }
});