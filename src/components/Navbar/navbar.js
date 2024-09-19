import React, { useState } from 'react';
import './navbar.css';
import logo from "../../assets/logo.png";
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className='navbar'>
      <img src={logo} alt="logo" className='logo' />
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <button className='menuToggle' onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className='menuToggleIcon' />
        </button>
        <div className={`desktopMenu ${isOpen ? 'open' : ''}`}>
          <Link to='intro' smooth={true} duration={500} className='menuItem' onClick={toggleMenu}>
            Home
          </Link>
          <Link to='about' smooth={true} duration={500} className='menuItem' onClick={toggleMenu}>
            About {/* Add About link */}
          </Link>
          <Link to='skills' smooth={true} duration={500} className='menuItem' onClick={toggleMenu}>
            Skills
          </Link>
          <Link to='works' smooth={true} duration={500} className='menuItem' onClick={toggleMenu}>
            Works
          </Link>
          <Link to='contact' smooth={true} duration={500} className='menuItem' onClick={toggleMenu}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
