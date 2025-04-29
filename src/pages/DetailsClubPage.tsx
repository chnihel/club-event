// src/pages/DetailsClubPage.tsx
import React from 'react';
import ClubDetails from '../component/pageClub';

const DetailsClubPage = () => {
  // ici tu peux appeler une API plus tard ou utiliser un state global
  const data = {
    name: "Club IT & Innovation",
    mission: "Favoriser l'innovation technologique chez les étudiants.",
    vision: "Devenir un pôle de créativité reconnu à l’échelle nationale.",
    objectives: [
      "Encourager les projets open-source",
      "Organiser des hackathons",
      "Sensibiliser à la cybersécurité",
    ],
    activities: [
      "Ateliers mensuels",
      "Conférences avec des experts",
      "Compétitions annuelles",
    ],
    leaders: [
      {
        name: "Sami Ben Ali",
        role: "Président",
        email: "sami@club.tn",
        phone: "55 123 456",
      },
      {
        name: "Noura Toumi",
        role: "Vice-présidente",
        email: "noura@club.tn",
        phone: "55 654 321",
      },
      {
        name: "Sami Ben Ali",
        role: "Président",
        email: "sami@club.tn",
        phone: "55 123 456",
      },
      {
        name: "Sami Ben Ali",
        role: "Président",
        email: "sami@club.tn",
        phone: "55 123 456",
      },
    ]
  };

  return <ClubDetails {...data} />;
};

export default DetailsClubPage;
