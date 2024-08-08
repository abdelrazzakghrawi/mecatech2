import { useState } from 'react';
import "./Navbar.css";
import Méca_tech from "./assets/Méca_tech.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='nav'>
      <header>
        <div className='navbar'>
          <a href="/">
            <img src={Méca_tech} alt="Logo" className='logo' />
          </a>  
          <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
            <button className="butt1">Espace Client</button>
            <button className="butt2">Espace Mecano</button>
            <a href='' className="besoin">Besoin Daide ?</a>
          </ul>
          <div className="navbar-right">
            <img src="" alt="" />
          </div>
          <div className="dropdown-button" onClick={toggleDropdown}>
            {isOpen ? '✖' : '☰'}
          </div>
        </div>
      </header>
      <h1 className={`h11 ${isOpen ? 'h11open' : ''}`}>
        Un mécanicien près de chez vous ?
        <br />
        Meca Tech vous le dit tout de suite !
      </h1>
    </div>
  );
}

export default Navbar;
