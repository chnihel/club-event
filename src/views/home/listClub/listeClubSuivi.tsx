import React from 'react';
import './listeClubSuivi.css';

const ListeClubSuivi = () => {
  const clubs = [
    { nom: 'Google Club', statut: 'Unstirw' },
    { nom: 'Tunivisions FSB', statut: 'Unstirw' },
    { nom: 'TPL', statut: 'Unstirw' },
    { nom: 'IEEE', statut: 'Unstirw' },
    { nom: 'ATAST', statut: 'Unstirw' }
  ];

  return (
    <div className="club-container">
      <h2>Clubs Suivis</h2>
      
      <ul className="club-list">
        {clubs.map((club, index) => (
          <li key={index} className="club-item">
            <div className="club-info">
              <div className="club-logo-circle">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt={`${club.nom} logo`}
                  className="club-logo"
                />
              </div>
              <div>
                <div className="club-name">{club.nom}</div>
                
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="see-all-container">
        <button className="see-all-button">
          See All
        </button>
      </div>
    </div>
  );
};

export default ListeClubSuivi;