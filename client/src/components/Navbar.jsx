import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importer useNavigate
import Modal from 'react-modal';
import LoginClient from '../Auth/LoginClient';
import RegisterClientModal from '../Auth/RegisterClient';
import LoginMecano from '../Auth/LoginMecano';
import RegisterMecano from '../Auth/RegisterMecano';
import { useAuth } from '../Auth/AuthContext';
import './Navbar.css';
import logo from './assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginClientModalOpen, setIsLoginClientModalOpen] = useState(false);
  const [isRegisterClientModalOpen, setIsRegisterClientModalOpen] = useState(false);
  const [isLoginMecanoModalOpen, setIsLoginMecanoModalOpen] = useState(false);
  const [isRegisterMecanoModalOpen, setIsRegisterMecanoModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); // Initialiser useNavigate
  const username = localStorage.getItem('username');
  


  const toggleDropdown = () => setIsOpen(!isOpen);

  const openModal = (modalSetter) => modalSetter(true);
  const closeModal = (modalSetter) => modalSetter(false);

  const handleLogout = () => {
    logout();
    setIsLoginClientModalOpen(false);
    setIsRegisterClientModalOpen(false);
    setIsLoginMecanoModalOpen(false);
    setIsRegisterMecanoModalOpen(false);
    navigate('/'); // Rediriger vers la page d'accueil après déconnexion
  };

  // Modals Clients
  const openLoginClientModal = () => openModal(setIsLoginClientModalOpen);
  const closeLoginClientModal = () => closeModal(setIsLoginClientModalOpen);
  const openRegisterClientModal = () => {
    closeModal(setIsLoginClientModalOpen);
    openModal(setIsRegisterClientModalOpen);
  };
  const closeRegisterClientModal = () => closeModal(setIsRegisterClientModalOpen);

  // Mécano Modals
  const openLoginMecanoModal = () => openModal(setIsLoginMecanoModalOpen);
  const closeLoginMecanoModal = () => closeModal(setIsLoginMecanoModalOpen);
  const openRegisterMecanoModal = () => {
    closeModal(setIsLoginMecanoModalOpen);
    openModal(setIsRegisterMecanoModalOpen);
  };
  const closeRegisterMecanoModal = () => closeModal(setIsRegisterMecanoModalOpen);

  // Déterminer la couleur de fond de la navbar en fonction de la route
  const navbarClass = location.pathname === '/dashboard-client' ? 'navbar dashboard-navbar' : 'navbar';

  return (
    <div className='nav'>
      <header>
        <div className={navbarClass}>
          <a href="/">
            <img src={logo} alt="Logo" className='logo' />
          </a>
          <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
            {user ? (
              <div className="user-info">
                <Link to="/dashboard-client" className="navbar-username">
                  Bienvenue {username}
                </Link>
                <div className="auth-buttons">
                  <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
                  <a href="#" className="besoin">Besoin daide ?</a>
                </div>
              </div>
            ) : (
              <>
                <button className="butt1" onClick={openLoginClientModal}>Espace Client</button>
                <button className="butt2" onClick={openLoginMecanoModal}>Espace Mecano</button>
                <a href="#" className="besoin">Besoin daide ?</a>
              </>
            )}
          </ul>
          <div className="dropdown-button" onClick={toggleDropdown}>
            ☰
          </div>
        </div>
      </header>
    
      {/* Modals Clients */}
      <Modal
        isOpen={isLoginClientModalOpen}
        onRequestClose={closeLoginClientModal}
        contentLabel="Login Client"
        className="modal"
        overlayClassName="overlay"
      >
        <LoginClient
          isOpen={isLoginClientModalOpen}
          closeModal={closeLoginClientModal}
          openRegisterModal={openRegisterClientModal}
        />
      </Modal>

      <Modal
        isOpen={isRegisterClientModalOpen}
        onRequestClose={closeRegisterClientModal}
        contentLabel="Register Client"
        className="modal"
        overlayClassName="overlay"
      >
        <RegisterClientModal
          isOpen={isRegisterClientModalOpen}
          closeModal={closeRegisterClientModal}
          openLoginModal={() => {
            closeModal(setIsRegisterClientModalOpen);
            openModal(setIsLoginClientModalOpen);
          }}
        />
      </Modal>

      {/* Modals Mécano */}
      <Modal
        isOpen={isLoginMecanoModalOpen}
        onRequestClose={closeLoginMecanoModal}
        contentLabel="Login Mecano"
        className="modal"
        overlayClassName="overlay"
      >
        <LoginMecano
          isOpen={isLoginMecanoModalOpen}
          closeModal={closeLoginMecanoModal}
          openRegisterModal={openRegisterMecanoModal}
        />
      </Modal>

      <Modal
        isOpen={isRegisterMecanoModalOpen}
        onRequestClose={closeRegisterMecanoModal}
        contentLabel="Register Mecano"
        className="modal"
        overlayClassName="overlay"
      >
        <RegisterMecano
          isOpen={isRegisterMecanoModalOpen}
          closeModal={closeRegisterMecanoModal}
          openLoginModal={() => {
            closeModal(setIsRegisterMecanoModalOpen);
            openModal(setIsLoginMecanoModalOpen);
          }}
        />
      </Modal>
    </div>
  );
};

export default Navbar;
