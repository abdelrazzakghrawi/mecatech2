<<<<<<< HEAD
// App.js
import Modal from 'react-modal';
import Navbar from './components/Navbar';
import Home from './Auth/Home';
import DashboardMecano from './Auth/DashboardMecano';
import DashboardClient from './EspaceClient/DashboardClient'; // Importez le composant DashboardClient
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
// Importez le composant PrivateRoute

Modal.setAppElement('#root');

const App = () => {
  const { role } = useAuth();
  console.log('Current role:', role);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {role === 'mecano' && (
            <Route path="/dashboard-mecano" element={<DashboardMecano />} />
          )}
          {role === 'client' && (
            <Route path="/dashboard-client" element={<DashboardClient />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contactez from './components/contactez-nous/Contactez';
import Aclient from './components/profile/Aclient';
import Rendez from './components/rendez-vous/Rendez';
import Prestation from './components/choisir prestation/Prestation';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Contactez />} />
                    <Route path="/contactez-nous" element={<Contactez />} />
                    <Route path="/mes-rendez-vous" element={<Rendez />} />
                    <Route path="/choisir-prestation" element={<Prestation />} />
                    <Route path="/mon-compte" element={<Aclient />} />
                </Routes>
            </div>
        </Router>
        
    );
}



>>>>>>> 95d78a85bed1dbb235176af051af02a51b0c87bd
export default App;
