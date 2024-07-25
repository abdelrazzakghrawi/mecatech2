import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
 // Assure-toi que ce fichier existe

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setMessage('Votre mot de passe a été réinitialisé avec succès');
    } catch (error) {
      setMessage('Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="title">Réinitialiser le mot de passe</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {message && <div className="info-text">{message}</div>}
        <label className="label">Nouveau mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
        <label className="label">Confirmer le mot de passe</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="submit-button">Réinitialiser le mot de passe</button>
      </form>
    </div>
  );
};

export default ResetPassword;
