import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

function TotalSpending() {
    // Mock data
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: "Monthly Spending",
                data: [200, 600, 2500, 1500, 2000, 1500, 100],
                borderColor: "#ffffff",
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, "rgba(72, 187, 120, 0.8)");
                    gradient.addColorStop(1, "rgba(72, 187, 120, 0.1)");
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: "#ffffff",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#2D3748",
                titleColor: "#48BB78",
                bodyColor: "#ffffff",
                borderColor: "#48BB78",
                borderWidth: 1,
                padding: 12,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#ffffff",
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                },
            },
        },
        animation: {
            duration: 2000,
        },
    };

    return (
        <div className="bg-gradient-to-r from-primary/60 to-primary/90 text-white p-6 rounded-xl mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold mb-2">Total Spendings</h2>
                    <p className="text-4xl font-bold">Rs. 606,940</p>
                </div>
                <button className="bg-white text-emerald-600 px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all font-semibold shadow-lg">
                    View All Transactions
                </button>
            </div>

            <div className="h-64">
                <Line data={data} options={options} />
            </div>

            <div className="mt-4 text-sm text-emerald-100">
                Updated in real-time • 15% increase from last month
            </div>
        </div>
    );
}

export default TotalSpending;
