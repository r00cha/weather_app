import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    CategoryScale,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    CategoryScale,
    Legend
);

function WeatherChart({ hourlyData }) {
    const allLabels = hourlyData.time.map((time) =>
        new Date(time).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
        })
    );

    // Determine if the range is one day
    const isSingleDay =
        new Date(hourlyData.time[0]).toDateString() ===
        new Date(hourlyData.time[hourlyData.time.length - 1]).toDateString();

    // Format the labels
    const formattedLabels = hourlyData.time.map((time) => {
        const date = new Date(time);
        if (isSingleDay) {
            return date.toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } else {
            return date.toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
            });
        }
    });

    // Determine granularity for the X-axis labels
    const MAX_LABELS = 10; // Maximum number of labels to display
    const labelStep = Math.ceil(formattedLabels.length / MAX_LABELS);

    // Filter labels to display on the X-axis
    const displayedLabels = formattedLabels.map((label, index) =>
        index % labelStep === 0 ? label : ""
    );

    const data = {
        labels: allLabels, // All data points for precise plotting
        datasets: [
            {
                label: "Temperature (°C)",
                data: hourlyData.temperature_2m,
                borderColor: "#ff0000",
                backgroundColor: "#ff9999",
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
                yAxisID: "y", // Use primary Y-axis for temperature
            },
            {
                label: "Precipitation (mm)",
                data: hourlyData.precipitation,
                borderColor: "#0000ff",
                backgroundColor: "#9999ff",
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
                yAxisID: "y1", // Use secondary Y-axis for precipitation
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        if (context.dataset.label === "Temperature (°C)") {
                            return `Temperature: ${context.raw}°C`;
                        } else if (context.dataset.label === "Precipitation (mm)") {
                            return `Precipitation: ${context.raw} mm`;
                        }
                    },
                },
            },
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time",
                },
                ticks: {
                    autoSkip: true,
                    callback: function (value, index) {
                        return displayedLabels[index]; // Show only filtered labels
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Temperature (°C)",
                },
                beginAtZero: true,
            },
            y1: {
                title: {
                    display: true,
                    text: "Precipitation (mm)",
                },
                beginAtZero: true,
                position: "right", // Place on the right side
                grid: {
                    drawOnChartArea: false, // Prevent grid lines from overlapping
                },
            },
        },
    };

    return <Line data={data} options={options} />;
}

export default WeatherChart;
