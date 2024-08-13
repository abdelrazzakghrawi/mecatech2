import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('Vérification en cours, veuillez patienter...');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('_id');

    if (!userId) {
      setMessage("Aucun ID d'utilisateur trouvé.");
      return;
    }

    const verifyEmail = async () => {
      try {
        await axios.get(`http://localhost:5000/api/auth/verify-email/${userId}`);
        setMessage('Votre email a été vérifié avec succès!');
        // Supprimer l'ID après la vérification
        localStorage.removeItem('_id'); // Correction ici
        setTimeout(() => navigate('/'), 3000); 
      } catch (error) {
        setMessage('Erreur lors de la vérification de l\'email.');
      }
    };

    verifyEmail();
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.messageBox}>
        <h1 style={styles.messageText}>{message}</h1>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  messageBox: {
    padding: '20px 40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  messageText: {
    fontSize: '24px',
    color: '#333333',
    fontFamily: 'Arial, sans-serif',
  },
};

export default VerifyEmail;
