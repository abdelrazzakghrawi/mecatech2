import  { useState } from 'react';
import "./Navbar.css";
import logo from "./assets/logo.png"; 
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {  logout } = useAuth();
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleLogout = () => {
    logout();

    navigate('/'); // Rediriger vers la page d'accueil après déconnexion
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='navvv'>
      <header className={` ${isOpen ? 'navbaropen' : 'header'}`}>
        <div className='navbar2'>
          <a href='' >
            <img src={logo} alt="Logo" className='logo2' />
          </a>  
          <ul className={`navba-menu2 ${isOpen ? 'open2' : ''}`}>
          <a href=''  className="besoin2">Besoin aide ?</a>

            <button onClick={handleLogout} className="butt22">Déconnexion </button>
            <LogOut onClick={handleLogout} className="log2"  />
          </ul>
          <div className="navbar-right2">
            <img src="" alt="" />
          </div>
          <div className="dropdown-button2" onClick={toggleDropdown}>
            {isOpen ? '✖' : '☰'}
          </div>
        
          
        </div>
      </header>

    </div>
    
  );
}

export default Navbar;
