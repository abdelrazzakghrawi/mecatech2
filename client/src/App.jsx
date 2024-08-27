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

Modal.setAppElement('#root');

const App = () => {
  const { role } = useAuth();
  console.log('Current role:', role);

  return (
   
    <Router>
      
      <div>
        <Animation/>
        <Routes>
          <Route path="/" element={<Home />} />
          {role === 'mecano' && (
            <Route path="/dashboard-mecano" element={<Espacemeca/>} />
          )}
                
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
