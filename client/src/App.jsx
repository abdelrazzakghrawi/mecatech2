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

export default App;
