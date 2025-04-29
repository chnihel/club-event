import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Enregistrement des composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const DashbordDerigeant: React.FC = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Nombre d\'utilisateurs',
        data: [10, 20, 15, 30, 25, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Statistiques des utilisateurs',
      },
    },
  }

  return (
    <div>
      <h1>Hello Dirigeant</h1>
      <div style={{ width: '600px', margin: 'auto' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default DashbordDerigeant
