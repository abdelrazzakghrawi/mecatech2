import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // Ajout de l'état pour l'image de profil

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setUser(localStorage.getItem('username'));
      setRole(localStorage.getItem('role'));
      setUserId(localStorage.getItem('_id'));
      setProfileImage(localStorage.getItem('profileImage')); // Charger l'image de profil
    }
  }, []);

  const login = (token, username, userRole, userId, userProfileImage) => {
    if (isAuthenticated) {
      console.error('Un utilisateur est déjà connecté. Déconnectez-vous d\'abord.');
      return;
    }

    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', userRole);
    localStorage.setItem('_id', userId);
    localStorage.setItem('profileImage', userProfileImage); // Stocker l'image de profil

    setIsAuthenticated(true);
    setUser(username);
    setRole(userRole);
    setUserId(userId);
    setProfileImage(userProfileImage); // Stocker l'image de profil lors du login
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('_id');
    localStorage.removeItem('profileImage'); // Supprimer l'image de profil du stockage local

    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    setUserId(null);
    setProfileImage(null); // Réinitialiser l'image de profil
  };

  const updateProfileImage = (newProfileImage) => {
    setProfileImage(newProfileImage); // Mettre à jour l'image de profil dans l'état
    localStorage.setItem('profileImage', newProfileImage); // Mettre à jour l'image de profil dans le stockage local
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, role, userId, profileImage, updateProfileImage }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
