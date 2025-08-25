import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Report = () => {
    const [selectedVegetable, setSelectedVegetable] = useState('tomato');

    // Data for multiple vegetables
    const vegetableData = {
        tomato: {
            marketTrends: [
                { date: '2025-01-01', highestPrice: 100, lowestPrice: 70, averagePrice: 85 },
                { date: '2025-01-02', highestPrice: 110, lowestPrice: 75, averagePrice: 90 },
                { date: '2025-01-03', highestPrice: 120, lowestPrice: 80, averagePrice: 95 },
                { date: '2025-01-04', highestPrice: 130, lowestPrice: 85, averagePrice: 105 },
                { date: '2025-01-05', highestPrice: 125, lowestPrice: 80, averagePrice: 105 }
            ],
            productDemand: [
                { date: '2025-01-01', demand: 150, supply: 120 },
                { date: '2025-01-02', demand: 160, supply: 130 },
                { date: '2025-01-03', demand: 170, supply: 140 },
                { date: '2025-01-04', demand: 180, supply: 150 },
                { date: '2025-01-05', demand: 140, supply: 140 }
            ]
        },
        potato: {
            marketTrends: [
                { date: '2025-01-01', highestPrice: 80, lowestPrice: 60, averagePrice: 70 },
                { date: '2025-01-02', highestPrice: 90, lowestPrice: 65, averagePrice: 77 },
                { date: '2025-01-03', highestPrice: 100, lowestPrice: 70, averagePrice: 85 },
                { date: '2025-01-04', highestPrice: 110, lowestPrice: 75, averagePrice: 92 },
                { date: '2025-01-05', highestPrice: 120, lowestPrice: 80, averagePrice: 100 }
            ],
            productDemand: [
                { date: '2025-01-01', demand: 120, supply: 100 },
                { date: '2025-01-02', demand: 130, supply: 110 },
                { date: '2025-01-03', demand: 140, supply: 120 },
                { date: '2025-01-04', demand: 150, supply: 130 },
                { date: '2025-01-05', demand: 160, supply: 140 }
            ]
        },
        beetroot: {
            marketTrends: [
                { date: '2025-01-01', highestPrice: 50, lowestPrice: 40, averagePrice: 45 },
                { date: '2025-01-02', highestPrice: 55, lowestPrice: 42, averagePrice: 48 },
                { date: '2025-01-03', highestPrice: 60, lowestPrice: 45, averagePrice: 52 },
                { date: '2025-01-04', highestPrice: 65, lowestPrice: 47, averagePrice: 56 },
                { date: '2025-01-05', highestPrice: 70, lowestPrice: 50, averagePrice: 60 }
            ],
            productDemand: [
                { date: '2025-01-01', demand: 80, supply: 75 },
                { date: '2025-01-02', demand: 85, supply: 78 },
                { date: '2025-01-03', demand: 90, supply: 85 },
                { date: '2025-01-04', demand: 95, supply: 90 },
                { date: '2025-01-05', demand: 100, supply: 95 }
            ]
        },
        onion: {
            marketTrends: [
                { date: '2025-01-01', highestPrice: 70, lowestPrice: 55, averagePrice: 62 },
                { date: '2025-01-02', highestPrice: 75, lowestPrice: 58, averagePrice: 66 },
                { date: '2025-01-03', highestPrice: 80, lowestPrice: 60, averagePrice: 70 },
                { date: '2025-01-04', highestPrice: 85, lowestPrice: 63, averagePrice: 74 },
                { date: '2025-01-05', highestPrice: 90, lowestPrice: 65, averagePrice: 77 }
            ],
            productDemand: [
                { date: '2025-01-01', demand: 110, supply: 95 },
                { date: '2025-01-02', demand: 120, supply: 100 },
                { date: '2025-01-03', demand: 130, supply: 115 },
                { date: '2025-01-04', demand: 140, supply: 120 },
                { date: '2025-01-05', demand: 150, supply: 130 }
            ]
        },
        brinjal: {
            marketTrends: [
                { date: '2025-01-01', highestPrice: 60, lowestPrice: 45, averagePrice: 52 },
                { date: '2025-01-02', highestPrice: 65, lowestPrice: 48, averagePrice: 56 },
                { date: '2025-01-03', highestPrice: 70, lowestPrice: 50, averagePrice: 60 },
                { date: '2025-01-04', highestPrice: 75, lowestPrice: 55, averagePrice: 65 },
                { date: '2025-01-05', highestPrice: 80, lowestPrice: 58, averagePrice: 69 }
            ],
            productDemand: [
                { date: '2025-01-01', demand: 100, supply: 90 },
                { date: '2025-01-02', demand: 110, supply: 95 },
                { date: '2025-01-03', demand: 120, supply: 105 },
                { date: '2025-01-04', demand: 130, supply: 115 },
                { date: '2025-01-05', demand: 140, supply: 120 }
            ]
        },
        radish: {
            marketTrends: [
                { date: '2025-01-01', highestPrice: 40, lowestPrice: 30, averagePrice: 35 },
                { date: '2025-01-02', highestPrice: 45, lowestPrice: 35, averagePrice: 40 },
                { date: '2025-01-03', highestPrice: 50, lowestPrice: 40, averagePrice: 45 },
                { date: '2025-01-04', highestPrice: 55, lowestPrice: 45, averagePrice: 50 },
                { date: '2025-01-05', highestPrice: 60, lowestPrice: 50, averagePrice: 55 }
            ],
            productDemand: [
                { date: '2025-01-01', demand: 50, supply: 40 },
                { date: '2025-01-02', demand: 55, supply: 45 },
                { date: '2025-01-03', demand: 60, supply: 50 },
                { date: '2025-01-04', demand: 65, supply: 55 },
                { date: '2025-01-05', demand: 70, supply: 60 }
            ]
        },
        mushroom: {
            marketTrends: [
                { date: '2025-01-01', highestPrice: 90, lowestPrice: 70, averagePrice: 80 },
                { date: '2025-01-02', highestPrice: 95, lowestPrice: 75, averagePrice: 85 },
                { date: '2025-01-03', highestPrice: 100, lowestPrice: 80, averagePrice: 90 },
                { date: '2025-01-04', highestPrice: 105, lowestPrice: 85, averagePrice: 95 },
                { date: '2025-01-05', highestPrice: 110, lowestPrice: 90, averagePrice: 100 }
            ],
            productDemand: [
                { date: '2025-01-01', demand: 80, supply: 70 },
                { date: '2025-01-02', demand: 85, supply: 75 },
                { date: '2025-01-03', demand: 90, supply: 80 },
                { date: '2025-01-04', demand: 95, supply: 85 },
                { date: '2025-01-05', demand: 100, supply: 90 }
            ]
        },
        ladiesFinger: {
            marketTrends: [
                { date: '2025-01-01', highestPrice: 65, lowestPrice: 50, averagePrice: 57 },
                { date: '2025-01-02', highestPrice: 70, lowestPrice: 55, averagePrice: 62 },
                { date: '2025-01-03', highestPrice: 75, lowestPrice: 60, averagePrice: 67 },
                { date: '2025-01-04', highestPrice: 80, lowestPrice: 65, averagePrice: 72 },
                { date: '2025-01-05', highestPrice: 85, lowestPrice: 70, averagePrice: 77 }
            ],
            productDemand: [
                { date: '2025-01-01', demand: 120, supply: 110 },
                { date: '2025-01-02', demand: 130, supply: 120 },
                { date: '2025-01-03', demand: 140, supply: 130 },
                { date: '2025-01-04', demand: 150, supply: 140 },
                { date: '2025-01-05', demand: 160, supply: 150 }
            ]
        }
    };

    const selectedData = vegetableData[selectedVegetable];

    const checkDemandSupply = (demand, supply) => {
        return demand <= supply ? 'Yes' : 'No';
    };

    const data = {
        labels: selectedData.marketTrends.map(mt => new Date(mt.date).toLocaleDateString('en-GB')),
        datasets: [
            {
                label: 'Highest Price',
                data: selectedData.marketTrends.map(mt => mt.highestPrice),
                borderColor: '#FF6347',
                backgroundColor: 'rgba(255, 99, 71, 0.2)',
                fill: true,
                yAxisID: 'y-axis-1',
                type: 'line'
            },
            {
                label: 'Lowest Price',
                data: selectedData.marketTrends.map(mt => mt.lowestPrice),
                borderColor: '#4682B4',
                backgroundColor: 'rgba(70, 130, 180, 0.2)',
                fill: true,
                yAxisID: 'y-axis-1',
                type: 'line'
            },
            {
                label: 'Average Price',
                data: selectedData.marketTrends.map(mt => mt.averagePrice),
                borderColor: '#32CD32',
                backgroundColor: 'rgba(50, 205, 50, 0.2)',
                fill: true,
                yAxisID: 'y-axis-1',
                type: 'line'
            },
            {
                label: 'Demand',
                data: selectedData.productDemand.map(pd => pd.demand),
                backgroundColor: 'rgba(255, 206, 86, 0.8)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
                yAxisID: 'y-axis-2',
                type: 'bar'
            },
            {
                label: 'Supply',
                data: selectedData.productDemand.map(pd => pd.supply),
                backgroundColor: 'rgba(0, 123, 255, 0.8)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
                yAxisID: 'y-axis-2',
                type: 'bar'
            }
        ]
    };

    const options = {
        scales: {
            'y-axis-1': {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    beginAtZero: true
                },
                title: {
                    display: true,
                    text: 'Price'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            'y-axis-2': {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    beginAtZero: true
                },
                title: {
                    display: true,
                    text: 'Demand/Supply'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: `${selectedVegetable.charAt(0).toUpperCase() + selectedVegetable.slice(1)} Market Trends and Product Demand`
            }
        }
    };

    const downloadReport = () => {
        const doc = new jsPDF();
        doc.text(`Market Trends for ${selectedVegetable.charAt(0).toUpperCase() + selectedVegetable.slice(1)}`, 10, 10);
        doc.text(`Date, Demand, Supply`, 10, 30);

        selectedData.productDemand.forEach((pd, index) => {
            doc.text(`${pd.date}, ${pd.demand}, ${pd.supply}`, 10, 40 + (index * 10));
        });

        doc.addPage();
        doc.text(`Generated Report for ${selectedVegetable}`, 10, 10);
        doc.save(`${selectedVegetable}_market_report.pdf`);
    };

    const exportCSV = () => {
        const csvData = selectedData.productDemand.map(pd => ({
            date: pd.date,
            demand: pd.demand,
            supply: pd.supply,
            demandSupplyStatus: checkDemandSupply(pd.demand, pd.supply)
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `${selectedVegetable}_demand_supply.csv`);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px', backgroundColor: 'white' }}>
            <h1>Vegetable Market Analysis</h1>
            <div>
                <label>Select Vegetable: </label>
                <select
                    value={selectedVegetable}
                    onChange={e => setSelectedVegetable(e.target.value)}
                    style={{ padding: '5px', fontSize: '16px' }}
                >
                    {Object.keys(vegetableData).map(veg => (
                        <option key={veg} value={veg}>
                            {veg.charAt(0).toUpperCase() + veg.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <Line data={data} options={options} />
            <div style={{ marginTop: '20px' }}>
                <h3>Demand vs. Supply Status</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>Date</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>Demand</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>Supply</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>Demand Meets Supply?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedData.productDemand.map((pd, index) => (
                            <tr key={index}>
                                <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{pd.date}</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{pd.demand}</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{pd.supply}</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                                    {checkDemandSupply(pd.demand, pd.supply)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: '20px' }}>
                <button onClick={downloadReport} style={buttonStyle}>Download PDF Report</button>
                <button onClick={exportCSV} style={buttonStyle}>Download CSV</button>
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s',
};

export default Report;
