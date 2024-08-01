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



export default App;
