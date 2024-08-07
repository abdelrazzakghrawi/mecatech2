// App.js
import Modal from 'react-modal';
import Navbar from './components/Navbar';
import Home from './Auth/Home';
import DashboardMecano from './Auth/DashboardMecano';
import DashboardClient from './EspaceClient/DashboardClient'; // Importez le composant DashboardClient
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import SearchBar from './searchService/searchComponent/SearchBar'
import './App.css'

Modal.setAppElement('#root');

const App = () => {
  const { role } = useAuth();
  console.log('Current role:', role);

  return (
   
    <Router>
      
      <div>
        
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
