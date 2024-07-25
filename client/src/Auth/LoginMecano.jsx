import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaWrench, FaUser, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import Modal from 'react-modal';
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

        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);

        login(data.token, data.username, data.role);

        closeModal();
        navigate('/dashboard-mecano');
      } catch (error) {
        setError('Erreur de connexion. Veuillez réessayer.');
      }
    },
  });

  const handleFocus = () => {
    setError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Login Mécano"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="auth-container">
        <h2 className="title">Connexion Mécanicien</h2>
        <form onSubmit={formik.handleSubmit} className="auth-form">
          {error && <div className="error">{error}</div>}

          <div className="input-group">
            <span className="icon"><FaUser className="icon-style" /></span>
            <input
              type="email"
              {...formik.getFieldProps('email')}
              onFocus={handleFocus}
              className="input"
              placeholder="Email"
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}

          <div className="input-group">
            <span className="icon"><FaWrench className="icon-style" /></span>
            <input
              type={showPassword ? 'text' : 'password'}
              {...formik.getFieldProps('password')}
              onFocus={handleFocus}
              className="input"
              placeholder="Mot de passe"
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

          <button type="submit" className="submit-button">Connexion</button>

          <div className="divider">ou</div>

          <button type="button" className="google-signin">
            <FaGoogle className="google-icon" />
            Se connecter avec Google
          </button>
        </form>

        <p className="signup-link">
          Pas de compte ? <button type="button" onClick={() => { closeModal(); openRegisterModal(); }} className="link">Inscrivez-vous ici</button>
        </p>
      </div>
    </Modal>
  );
};

LoginMecanoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openRegisterModal: PropTypes.func.isRequired,
};

export default LoginMecanoModal;
