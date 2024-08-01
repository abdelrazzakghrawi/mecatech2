import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/request-password-reset', { email });
      setMessage('Un email a été envoyé avec les instructions pour réinitialiser votre mot de passe');
      setTimeout(() => navigate('/login-client'), 5000); // Rediriger après 5 secondes
    } catch (error) {
      setMessage('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="title">Mot de passe oublié</h2>
      <p className="info-text">Entrez votre adresse e-mail pour demander une réinitialisation de mot de passe</p>
      <form onSubmit={handleSubmit} className="auth-form">
        {message && <div className="info-text">{message}</div>}
        <label className="label">Adresse e-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="submit-button">Envoyer</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
