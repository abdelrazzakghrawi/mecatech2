import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import LoginClient from '../Auth/LoginClient';
import RegisterClientModal from '../Auth/RegisterClient';
import LoginMecano from '../Auth/LoginMecano';
import RegisterMecano from '../Auth/RegisterMecano';
import { useAuth } from '../Auth/AuthContext';
import './Navbar.css';
import Méca_tech from './assets/Méca_tech.png';
import { SearchProvider } from '../searchService/searchComponent/context/SearchContext';
import useSearch from '../searchService/hooks/useSearch';
import SearchInputs from '../searchService/searchComponent/SearchInputs';
import SearchDisplay from '../searchService/searchComponent/SearchDisplay';
import 'leaflet/dist/leaflet.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginClientModalOpen, setIsLoginClientModalOpen] = useState(false);
  const [isRegisterClientModalOpen, setIsRegisterClientModalOpen] = useState(false);
  const [isLoginMecanoModalOpen, setIsLoginMecanoModalOpen] = useState(false);
  const [isRegisterMecanoModalOpen, setIsRegisterMecanoModalOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const {
    searchResults,
    showMap,
    userLocation,
    distanceFilter,
    setDistanceFilter,
    showFilter,
    filterEnabled,
    setFilterEnabled,
    handleSearchClick,
  } = useSearch();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const openModal = (modalSetter) => modalSetter(true);
  const closeModal = (modalSetter) => modalSetter(false);

  const handleLogout = () => {
    logout();
    setIsLoginClientModalOpen(false);
    setIsRegisterClientModalOpen(false);
    setIsLoginMecanoModalOpen(false);
    setIsRegisterMecanoModalOpen(false);
    navigate('/');
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

  return (
    <div>
      <div className='body'>
        <div className='nav'>
          <header>
            <div className='navbar'>
              <a href="/">
                <img src={Méca_tech} alt="Logo" className='logo' />
              </a>
              <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                {user ? (
                  <div className="user-info">
                    {role === 'client' ? (
                      <Link to="/dashboard-client" className="navbar-username">
                        Bienvenue {username}
                      </Link>
                    ) : (
                      <Link to="/dashboard-mecano" className="navbar-username">
                        Bienvenue {username}
                      </Link>
                    )}
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
          <h1 className='h11'>
            Un mécanicien près de chez vous ? 
            <br />
            Meca Tech vous le dit tout de suite !
          </h1>

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

        <div className='search'>
          <SearchProvider>
            <div className="container mx-auto p-4">
              <SearchInputs onSearch={handleSearchClick} />
            </div>
          </SearchProvider>
        </div>
      </div>
      <div className="container mx-auto p-4" >
        <SearchProvider>
          <SearchDisplay
            searchResults={searchResults}
            userLocation={userLocation}
            distanceFilter={distanceFilter}
            setDistanceFilter={setDistanceFilter}
            showFilter={showFilter}
            filterEnabled={filterEnabled}
            setFilterEnabled={setFilterEnabled}
            showMap={showMap}
          />
        </SearchProvider>
      </div>
    </div>
  );
};

export default Navbar;
