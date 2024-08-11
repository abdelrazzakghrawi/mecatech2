import  { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext'; // Import useAuth
import './Auth.css/RegisterMecano.css';

const RegisterMecanoModal = ({ isOpen, closeModal, openLoginModal }) => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Champ requis'),
      email: Yup.string().email('Email invalide').required('Champ requis'),
      password: Yup.string().required('Champ requis').min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
      phone: Yup.string().required('Champ requis'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username: values.username,
          email: values.email,
          password: values.password,
          phone: values.phone,
          role: 'mecano',
        });
        localStorage.setItem('_id', response.data.userId);
        closeModal();
        openLoginModal();
      } catch (error) {
        console.error('Error during registration:', error.response?.data || error.message);
        setError(error.response?.data?.message || "Erreur lors de l'inscription. Veuillez réessayer.");
      }
    },
  });

  const handleGoogleSuccess = async (response) => {
    console.log('Google login success:', response);
    try {
      const token = response.credential;
      const role = 'mecano'; // Set the role to 'mecano' for this modal
      console.log('Google token:', token); // Log the Google token

      const res = await axios.post('http://localhost:5000/api/auth/google-login', { token, role });
      console.log('Server response:', res.data);
      closeModal(); // Close the modal
      login(res.data.token, res.data.username, res.data.role); // Store user info in AuthContext with the provided role
      navigate('/dashboard-mecano'); // Redirect to the application homepage after successful login
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
        contentLabel="Register Mecano"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="auth-container">
          <h2 className="title">Inscription Mécanicien</h2>
          <form onSubmit={formik.handleSubmit} className="auth-form">
            {error && <div className="error">{error}</div>}

            <label className="label">Nom dutilisateur</label>
            <div className="input-group">
              <span className="icon">👤</span>
              <input
                type="text"
                {...formik.getFieldProps('username')}
                className="input"
                placeholder="Entrez votre nom d'utilisateur"
              />
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}

            <label className="label">Adresse e-mail</label>
            <div className="input-group">
              <span className="icon"><MdEmail className="icon-style" /></span>
              <input
                type="email"
                {...formik.getFieldProps('email')}
                className="input"
                placeholder="Entrez votre adresse e-mail"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}

            <label className="label">Mot de passe</label>
            <div className="input-group">
              <span className="icon"><RiLockPasswordFill className="icon-style" /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                {...formik.getFieldProps('password')}
                className="input"
                placeholder="Entrez votre mot de passe"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="show-password-icon"
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}

            <label className="label">Téléphone</label>
            <div className="input-group">
              <span className="icon">📞</span>
              <input
                type="text"
                {...formik.getFieldProps('phone')}
                className="input"
                placeholder="Entrez votre numéro de téléphone"
              />
            </div>
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error">{formik.errors.phone}</div>
            ) : null}

            <button type="submit" className="submit-button">Sinscrire</button>

            <div className="divider">ou</div>

            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                buttonText="S'inscrire avec Google"
                className="google-signin"
              />
            </div>
          </form>

          <p className="login-link">
            Vous avez déjà un compte ? <button type="button" onClick={() => { closeModal(); openLoginModal(); }} className="link">Connectez-vous ici</button>
          </p>
        </div>
      </Modal>
    </GoogleOAuthProvider>
  );
};

RegisterMecanoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
};

export default RegisterMecanoModal;
