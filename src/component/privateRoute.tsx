import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation(); // pour récupérer le path actuel

  // Récupérer les données de l'utilisateur dans le localStorage
  const localStorageData = localStorage.getItem('userClub')
    ? JSON.parse(localStorage.getItem('userClub') as string)
    : null;

  const roleUser = localStorageData ? localStorageData.user?.role : null;

  console.log('Rôle de l\'utilisateur:', roleUser);

  if (!roleUser) {
    return <Navigate to="/" replace />;
  }

  // Gestion des redirections selon le rôle et la route actuelle
  if (roleUser === 'membre' && !location.pathname.startsWith('/homeMembre')) {
    return <Navigate to="/homeMembre" replace />;
  }

  if (roleUser === 'derigeant_club' && !location.pathname.startsWith('/homeDerigeant')) {
    return <Navigate to="/homeDerigeant" replace />;
  }
  if (roleUser === 'super_admin' && !location.pathname.startsWith('/homeAdmin')) {
    return <Navigate to="/homeAdmin" replace />;
  }

  // Si tout est bon, afficher les enfants
  return <>{children}</>;
};

export default PrivateRoute;
