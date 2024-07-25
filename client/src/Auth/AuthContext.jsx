import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setUser(localStorage.getItem('username'));
      setRole(localStorage.getItem('role'));
    }
  }, []);

  const login = (token, username, userRole) => {
    if (isAuthenticated) {
      console.error('Un utilisateur est déjà connecté. Déconnectez-vous d\'abord.');
      return;
    }

    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', userRole);
    setIsAuthenticated(true);
    setUser(username);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, role }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
