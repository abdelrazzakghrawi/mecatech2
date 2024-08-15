import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaWrench, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import Modal from 'react-modal';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Auth.css/LoginMecano.css';

const LoginMecanoModal = ({ isOpen, closeModal, openRegisterModal }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email invalide').required('Champ requis'),
      password: Yup.string().required('Champ requis'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post('http://localhost:5000/api/auth/login', values);
  
        if (data.role !== 'mecano') {
          setError('Accès refusé pour les utilisateurs avec le rôle client');
          return;
        }
  
        const { token, username, role, _id } = data;
  
        // Stocker les informations dans le localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        localStorage.setItem('_id', _id);  // Stocker l'ID utilisateur
  
        // Appeler la fonction `login` avec tous les paramètres nécessaires
        login(token, username, role, _id);
  
        closeModal(); // Fermer la modal
        navigate('/dashboard-mecano'); // Redirection vers le tableau de bord des mécaniciens après la connexion
      } catch (error) {
        setError('Erreur de connexion. Veuillez réessayer.');
      }
    },
  });

  const handleFocus = () => {
    setError('');
  };

  const handleGoogleSuccess = async (response) => {
    console.log('Google login success:', response);
    try {
      const token = response.credential;
      const res = await axios.post('http://localhost:5000/api/auth/google/google-login', { token });
      console.log('Server response:', res.data);
  
      if (res.data.role !== 'mecano') {
        setError('Accès refusé pour les utilisateurs avec le rôle client');
        return;
      }
  
      const { token: jwtToken, username, role, _id } = res.data;
  
      // Stocker les informations dans le localStorage
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      localStorage.setItem('_id', _id);  // Stocker l'ID utilisateur
  
      // Appeler la fonction `login` avec tous les paramètres nécessaires
      login(jwtToken, username, role, _id);
      localStorage.setItem('authToken', res.data.token);
      closeModal(); // Fermer la modal
      navigate('/dashboard-mecano'); // Redirection vers le tableau de bord des mécaniciens après la connexion
    } catch (error) {
      console.error('Error during Google login:', error);
      setError("Erreur lors de l'authentification avec Google. Veuillez réessayer.");
    }
  };
  

  const handleGoogleFailure = (response) => {
    console.log('Google Sign-In a échoué', response);
    setError("Erreur lors de l'authentification avec Google. Veuillez réessayer.");
  };

  return (
    <GoogleOAuthProvider clientId="961029157972-u1snijjdd7vpdqverlns8oiuj17f374d.apps.googleusercontent.com">
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Login Mécano"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="auth-container">
          <h2 className="title">Connexion Mécanicien</h2>
          <p className="info-text">Connectez-vous en entrant votre adresse e-mail et votre mot de passe</p>
          <form onSubmit={formik.handleSubmit} className="auth-form">
            {error && <div className="error">{error}</div>}

            <label className="label">Adresse e-mail</label>
            <div className="input-group">
              <span className="icon"><FaUser className="icon-style" /></span>
              <input
                type="email"
                {...formik.getFieldProps('email')}
                onFocus={handleFocus}
                className="input"
                placeholder="Entrez votre adresse e-mail"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}

            <label className="label">Mot de passe</label>
            <div className="input-group">
              <span className="icon"><FaWrench className="icon-style" /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                {...formik.getFieldProps('password')}
                onFocus={handleFocus}
                className="input"
                placeholder="Entrez votre mot de passe"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="show-password-icon"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}

            <Link to="/forgot-password" className="forgot-password">Mot de passe oublié ?</Link>
            <button type="submit" className="submit-button">Connexion</button>

            <div className="remember-me">
              <input type="checkbox" id="remember-me" className="checkbox" />
              <label htmlFor="remember-me" className="remember-me-label">Se souvenir de moi</label>
            </div>

            <div className="divider">ou</div>

            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                buttonText="Connexion avec Google"
                className="google-signin"
              />
            </div>
          </form>

          <p className="signup-link">
            Pas de compte ? <button type="button" onClick={() => { closeModal(); openRegisterModal(); }} className="link">Inscrivez-vous ici</button>
          </p>
        </div>
      </Modal>
    </GoogleOAuthProvider>
  );
};

LoginMecanoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openRegisterModal: PropTypes.func.isRequired,
};

export default LoginMecanoModal;
