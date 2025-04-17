import React from 'react';
import "./changerPassword/changerPassword.css";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-5">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* En-tête */}
          <div className="changer-header">
          <h1>Profile</h1>
        </div>

          {/* Contenu */}
          <div className="px-6 py-8 space-y-6">
            {/* Photo de profil */}
            <div className="changer-content">
            <form action="">
            <div className="flex items-center space-x-6">
            
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                />
              </div>
              <button
                type="button"
                className="px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-md shadow hover:bg-indigo-100 transition"
              >
                Changer la photo
              </button>
            </div>

            {/* Grille de champs */}
         
          <div className="changer-grid">
            <div className="form-group">
              <label htmlFor="oldPassword">Nom</label>
              <input type="text" id="nom" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Prénom</label>
              <input type="text" id="prenom" />
            </div>
          </div>
          <div className="changer-grid">
            <div className="form-group">
              <label htmlFor="oldPassword">Email</label>
              <input type="email" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Date_De_Naissance </label>
              <input type="date" id="date" />
            </div>
          </div>
          <div className="changer-grid">
            <div className="form-group">
              <label htmlFor="oldPassword">Télephone</label>
              <input type="tel" id="tel" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Adresse</label>
              <input type="text" id="adresse" />
            </div>
          </div>
          <div className="changer-grid">
            <div className="form-group">
              <label htmlFor="oldPassword">faculté</label>
              <input type="text" id="faculté" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">sexe</label>
              <input type="text" id="sexe" />
            </div>
          </div>
            <div className="form-group">
              <label htmlFor="oldPassword">Origine</label>
              <input type="text" id="origine" />
            </div>
            
          
          <div className="changer-actions">
            <button type="button">Modifier</button>
          </div>
          </form>
        </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
