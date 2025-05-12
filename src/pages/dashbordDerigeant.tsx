import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Doughnut, Line } from 'react-chartjs-2';
import type { JSX } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import api from '../service/api';
import { FaClipboard, FaEdit } from 'react-icons/fa';


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

ChartJS.register(ArcElement, Tooltip, Legend, Title);
const FaEditIcon = FaEdit as unknown as () => JSX.Element;

const DashbordDerigeant: React.FC = () => {
  const { clubId } = useParams();
  const [count, setCount] = useState<number | null>(null);
  const [nomClub, setNomClub] = useState<string>('Chargement...');
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
const [monthlyStats, setMonthlyStats] = useState<{ month: string; count: number }[]>([]);


  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/club/statistique/club/${clubId}`);
      setCount(res.data.count);
      setNomClub(res.data.nomClub);
    } catch (error) {
      console.error('Erreur lors du fetch de statistiques:', error);
    }
  };

  const fetchEventStats = async (eventId: string) => {
    try {
      const res = await axios.get(`http://localhost:5000/evenement/statistique/event-month/${eventId}`);
      setSelectedEvent((prev: any) => ({ ...prev, ...res.data }));
          setMonthlyStats(res.data.data); // contient [{ month: "5/2025", count: 3 }, ...]

    } catch (error) {
      console.error('Erreur lors du fetch de statistiques d\'événement:', error);
    }
  };

  const getEventByClub = async () => {
    try {
      const getEvent = await api.getClub(clubId);
      setEvents(getEvent.data.getclub.evenement);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (clubId) {
      fetchData();
      getEventByClub();
    }
  }, [clubId]);

  const data = {
    labels: ['Membres inscrits', 'Autres'],
    datasets: [
      {
        label: 'Statistique',
        data: [count ?? 0, 100 - (count ?? 0)],
        backgroundColor: ['#36A2EB', '#E0E0E0'],
        hoverBackgroundColor: ['#36A2EB', '#C0C0C0'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Membres du club',
        font: {
          size: 18,
        },
      },
    },
  };
  const monthlyChartData = {
  labels: monthlyStats.map(item => item.month),
  datasets: [
    {
      label: 'Nombre de participants',
      data: monthlyStats.map(item => item.count),
      fill: false,
      borderColor: '#42A5F5',
      backgroundColor: '#42A5F5',
      tension: 0.3,
    },
  ],
};

const monthlyChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Nombre de membres par mois',
    },
  },
};

 const handleClick = (event: any) => {
  setSelectedEvent(event);
  fetchEventStats(event._id);
};
const navigate=useNavigate()
const navigateToRapport=()=>{
   navigate(`/homeDerigeant/${clubId}/rapport`)
}

  if (loading) return <p>Chargement des événements...</p>;

  return (
    <div style={{ padding: '2rem' }}>
        <div
        onClick={() => navigateToRapport()}
        style={{
          cursor: 'pointer',
          position: 'fixed',
          top: '100px',
          right: '20px',
          backgroundColor: '#42A5F5',
          padding: '10px',
          borderRadius: '50%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <FaEditIcon/> 
      </div>
      <h2>Club : {nomClub}</h2>

      <div style={{ width: '400px', margin: '0 auto' }}>
        <Doughnut data={data} options={options} />
      </div>

      <p style={{ fontWeight: 'bold', marginTop: '20px' }}>
        Total membres inscrits : {count ?? 0}
      </p>

      <div style={{ marginTop: '3rem' }}>
        <h3>Liste des événements</h3>
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: '1rem 0' }}>
          {events.map((event, index) => (
            <div
              key={index}
              onClick={() => handleClick(event)}
              style={{
                display: 'inline-block',
                minWidth: '200px',
                marginRight: '1rem',
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor:
                  selectedEvent?._id === event._id ? '#BBDEFB' : '#f9f9f9',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <h4>{event.nomEvent}</h4>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
  <div style={{ marginTop: '2rem', textAlign: 'center' }}>
    <h2>{selectedEvent.nomEvent || selectedEvent.nom}</h2>

   

    

    {/* Courbe des participations mensuelles */}
    {monthlyStats.length > 0 && (
      <div style={{ marginTop: '2rem' }}>
        <Line data={monthlyChartData} options={monthlyChartOptions} />
      </div>
    )}
  </div>
)}
    </div>
  );
};

export default DashbordDerigeant;
