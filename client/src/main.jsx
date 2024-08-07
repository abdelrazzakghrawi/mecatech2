<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './Auth/AuthContext.jsx';
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
>>>>>>> 95d78a85bed1dbb235176af051af02a51b0c87bd

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
