import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import './Auth.css/RegisterMecano.css';

const RegisterMecanoModal = ({ isOpen, closeModal, openLoginModal }) => {
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

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
        await axios.post('http://localhost:5000/api/auth/register', {
          username: values.username,
          email: values.email,
          password: values.password,
          phone: values.phone,
          role: 'mecano',
        });
        closeModal(); // Close the register modal
        openLoginModal(); // Open the login modal
      } catch (error) {
        setError('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    },
  });

  return (
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

          <button type="button" className="google-signin">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google icon" className="google-icon" />
            Sinscrire avec Google
          </button>
        </form>

        <p className="login-link">
          Vous avez déjà un compte ? <button type="button" onClick={() => { closeModal(); openLoginModal(); }} className="link">Connectez-vous ici</button>
        </p>
      </div>
    </Modal>
  );
};

RegisterMecanoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
};

export default RegisterMecanoModal;
