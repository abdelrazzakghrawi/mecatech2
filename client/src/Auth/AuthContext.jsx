import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);  // Ajout d'un état pour `userId`

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setUser(localStorage.getItem('username'));
      setRole(localStorage.getItem('role'));
      setUserId(localStorage.getItem('_id'));  // Stocker `userId` dans l'état
    }
  }, []);

  const login = (token, username, userRole, userId) => {
    if (isAuthenticated) {
      console.error('Un utilisateur est déjà connecté. Déconnectez-vous d\'abord.');
      return;
    }
  
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', userRole);
    localStorage.setItem('_id', userId);  
    setIsAuthenticated(true);
    setUser(username);
    setRole(userRole);
    setUserId(userId);  // Stocker `userId` lors du login
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('_id');  // Supprimer `userId` du stockage local
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    setUserId(null);  // Réinitialiser `userId`
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, role, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
