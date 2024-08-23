// App.js
import Modal from 'react-modal';

import Home from './Auth/Home';
import Espacemeca from '../src/Espace-Mecano/Espacemeca';
import DashboardClient from './EspaceClient/DashboardClient'; // Importez le composant DashboardClient
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import VerifyEmail from './Auth/VerifyEmail/VerifyEmail';
import Animation from "../src/Animation/Animation"

import './App.css'
import axios from 'axios';
import { useEffect } from 'react';

Modal.setAppElement('#root');

const App = () => {
  const { role } = useAuth();
  console.log('Current role:', role);

  // Envoi de la requête POST lors du montage du composant
  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.post('http://deploy-mern-stack.vercel.app', {
          // Données à envoyer avec la requête POST
          role: role,
        });
        console.log('Réponse de la requête POST:', response.data);
      } catch (error) {
        console.error('Erreur lors de la requête POST:', error);
      }
    };

    postData();
  }, [role]); // La requête POST sera envoyée chaque fois que le rôle change

  return (
    <Router>
      <div>
        <Animation/>
        <Routes>
          <Route path="/" element={<Home />} />
          {role === 'mecano' && (
            <Route path="/dashboard-mecano" element={<Espacemeca/>} />
          )}
          <Route path="/dashboard-mecano" element={<Espacemeca/>} />
          {role === 'client' && (
            <Route path="/dashboard-client" element={<DashboardClient />} />
          )}
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;