import React, { useMemo } from 'react';
import { ScriptData, PlantDetails } from '../types';
import { Bar, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardChartsProps {
  scriptData: ScriptData;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ scriptData }) => {
  const plantData = useMemo(() => {
    const plantDataScript = scriptData['PlantData'];
    if (plantDataScript && plantDataScript.data) {
      return Object.entries(plantDataScript.data as Record<string, PlantDetails>).map(([name, details]) => ({
        name: name.replace(/_/g, ' '),
        ...details,
      }));
    }
    return [];
  }, [scriptData]);

  if (plantData.length === 0) {
    return null; // Don't render charts if there's no data
  }

  const rootStyles = getComputedStyle(document.documentElement);
  const textColor = rootStyles.getPropertyValue('--color-text-secondary').trim();
  const gridColor = rootStyles.getPropertyValue('--color-border').trim();
  const blueColor = rootStyles.getPropertyValue('--color-accent-blue').trim();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#1f2937', titleColor: '#e5e7eb', bodyColor: '#d1d5db' },
    },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } },
    },
  };

  const growthTimeData = {
    labels: plantData.map(p => p.name),
    datasets: [{
      label: 'Growth Time (seconds)',
      data: plantData.map(p => p.GrowthTime),
      backgroundColor: `${blueColor}40`,
      borderColor: blueColor,
      borderWidth: 1,
      borderRadius: 4,
    }],
  };
  
  const priceSellData = {
    datasets: [{
      label: 'Plant',
      data: plantData.map(p => ({ x: p.Price, y: p.SellMultiply })),
      backgroundColor: plantData.map(() => `hsla(${180 + Math.random() * 100}, 80%, 60%, 0.7)`),
    }],
  };

  return (
    <section id="dashboard" className="mt-12 glass-surface p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Game Data Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black/20 p-4 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold text-center text-[var(--color-accent-yellow)] mb-4">Plant Growth Time (seconds)</h3>
          <div className="relative h-[40vh] max-h-[400px]">
            <Bar data={growthTimeData} options={{...chartOptions, indexAxis: 'y', scales: { x: { ...chartOptions.scales.x, beginAtZero: true }, y: { ...chartOptions.scales.y, grid: { display: false } } }}} />
          </div>
        </div>
        <div className="bg-black/20 p-4 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold text-center text-[var(--color-accent-yellow)] mb-4">Price vs. Sell Multiplier</h3>
          <div className="relative h-[40vh] max-h-[400px]">
            <Scatter data={priceSellData} options={{...chartOptions, scales: { x: { ...chartOptions.scales.x, type: 'logarithmic', title: { display: true, text: 'Price (log scale)', color: textColor } }, y: { ...chartOptions.scales.y, title: { display: true, text: 'Sell Multiplier', color: textColor } } }, plugins: { ...chartOptions.plugins, tooltip: { ...chartOptions.plugins.tooltip, callbacks: { label: (c: any) => `${plantData[c.dataIndex].name}: Price $${c.parsed.x}, Multiplier x${c.parsed.y}`}}}}} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardCharts;