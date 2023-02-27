/* ======= Custom Tooltip ====== */
const customTooltips = function (context) {
    // Tooltip Element
    let tooltipEl = document.getElementById('chartjs-tooltip');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.className = "chartjs-tooltip";
        tooltipEl.innerHTML = '<table></table>';
        document.body.appendChild(tooltipEl);
    }

    // Hide if no tooltip
    const tooltipModel = context.tooltip;
    if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
        tooltipEl.classList.add('no-transform');
    }

    function getBody(bodyItem) {
        return bodyItem.lines;
    }

    // Set Text
    if (tooltipModel.body) {
        const titleLines = tooltipModel.title || [];
        const bodyLines = tooltipModel.body.map(getBody);

        let innerHtml = '<thead>';

        titleLines.forEach(function (title) {
            innerHtml += `<div class='tooltip-title'>${title}</div>`;
        });
        innerHtml += '</thead><tbody>';

        bodyLines.forEach(function (body, i) {
            const colors = tooltipModel.labelColors[i];
            let style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            style += "; border-radius: 30px";
            const span = `<span class="chartjs-tooltip-key" style="${style}"></span>`;
            innerHtml += `<tr><td>${span}${body}</td></tr>`;
        });
        innerHtml += '</tbody>';

        let tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
    }

    const toolTip = document.querySelector('.chartjs-tooltip');
    const position = context.chart.canvas.getBoundingClientRect();
    const toolTipHeight = toolTip.clientHeight;
    const rtl = document.querySelector('html[dir="rtl"]');


    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.left = `${position.left + window.pageXOffset + tooltipModel.caretX - (rtl !== null ? toolTip.clientWidth : 0)}px`;
    tooltipEl.style.top = `${position.top + window.pageYOffset + tooltipModel.caretY-(tooltipModel.caretY > 10 ? (toolTipHeight > 100 ? toolTipHeight + 5 : toolTipHeight + 15) : 70)}px`;
    tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
    tooltipEl.style.pointerEvents = 'none';
}



/* ======= Line chart ======= */
function chartjsAreaChart(selector, height) {
    let delayed;
    const legendMargin = {
        id: 'legendMargin',
        beforeInit(chart, legend, options) {
            const fitValue = chart.legend.fit;
            chart.legend.fit = function fit() {
                fitValue.bind(chart.legend)();
                return this.height += 24;
            }
        }
    };
    var ctx = document.getElementById(selector);
    if (ctx) {
        ctx.getContext("2d");
        ctx.height = window.innerWidth <= 575 ? 200 : height;
        
        var chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [
                    'Apr 14', 'Apr 15', 'Apr 16', 'Apr 17', 'Apr 18', 'Apr 19', 'Apr 20'
                ],
                datasets: [{
                        data: [2, 9, 3, 5, 2, 3, 9],
                        borderColor: "#7811FF",
                        label: "Reading",
                        borderWidth: 2,
                        fill: false,
                        backgroundColor: "#7811FF",
                        hoverBackgroundColor: "#7811FF",
                        tension: 0.8,
                        pointHoverBorderColor: 'white',
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHitRadius: 30,
                        pointStyle: 'circle',
                        pointHoverBorderWidth: 2,
                    },
                    {
                        data: [5, 8, 2, 6, 8, 3, 1],
                        borderColor: "#00AAFF",
                        label: "Writing",
                        borderWidth: 2,
                        fill: false,
                        backgroundColor: "#00AAFF",
                        hoverBackgroundColor: "#00AAFF",
                        tension: 0.8,
                        pointHoverBorderColor: 'white',
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHitRadius: 30,
                        pointStyle: 'circle',
                        pointHoverBorderWidth: 2,
                    },
                ],
            },
            options: {
                maintainAspectRatio: true,
                responsive: true,
                interaction: {
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        position: "top",
                        align: "center",
                        labels: {
                            usePointStyle: true,
                            color: "#525768",
                            textAlign: 'center',
                            boxWidth: 4,
                            boxHeight: 4,
                            maxHeight: 100,
                            pointStyleWidth: 6,
                            padding: 40,
                            family: "Kumbh Sans, sans-serif",
                            font: {
                                size: 14,
                                weight: 400,
                            },
                        },
                    },
                    tooltip: {
                        usePointStyle: true,
                        enabled: false,
                        external: customTooltips,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';

                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat().format(context.parsed.y);
                                }
                                return `<span class="data-label">${label}k</span>`;
                            }
                        },
                    },
                },
                animation: {
                    onComplete: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !delayed) {
                            delay = context.dataIndex * 200 + context.datasetIndex * 50;
                        }
                        return delay;
                    },
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
                scales: {
                    y: {
                        beginAtZero: true,
                        stacked: false,
                        min: 0,
                        max: 10,
                        grid: {
                            color: "#E3E6EF",
                            borderDash: [3, 3],
                            zeroLineColor: "#E3E6EF",
                            zeroLineWidth: 1,
                            zeroLineBorderDash: [3, 3],
                            drawTicks: false,
                            drawBorder: false,
                            zeroLineWidth: 3,
                            borderWidth: 0,
                            stepped: true
                        },
                        ticks: {
                            beginAtZero: true,
                            font: {
                                size: 14,
                            },
                            color: "#8C90A4",
                            padding: 40,
                            
                            stepSize: 2, // Set the step size to 1
                            callback: function(value, index, values) {
                              // Only show labels for even numbers (step size 2)
                              if (value % 2 === 0) {
                                return value;
                              }
                              return null;
                            },
                            // beginAtZero: true,
                                                  
                            callback(value, index, values) {
                                return `${value}k`;
                            },
                        },
                    },
                    x: {
                        stacked: false,
                        grid: {
                            display: true,
                            zeroLineWidth: 2,
                            zeroLineColor: "transparent",
                            color: "transparent",
                            z: 1,
                            tickMarkLength: 10,
                            drawTicks: true,
                            drawBorder: false,
                        },

                        ticks: {
                            beginAtZero: true,
                            font: {
                                size: 14,
                            },
                            color: "#8C90A4",
                            padding: 20,
                        },
                    },
                },
            },
            plugins: [legendMargin]
        });
    }
}
chartjsAreaChart("areaChart", "100");



