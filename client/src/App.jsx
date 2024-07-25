
import Modal from 'react-modal';
import Navbar from './components/Navbar';
import Home from './Auth/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardMecano from './Auth/DashboardMecano';
import { useAuth } from './Auth/AuthContext';

// Set the app element to ensure proper accessibility
Modal.setAppElement('#root');

const App = () => {
  const { role } = useAuth();

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {role === 'mecano' && <Route path="/dashboard-mecano" element={<DashboardMecano />} />}
          {/* Ajoutez d'autres routes ici selon les besoins */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
