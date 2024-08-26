import React, { useState } from 'react';
import './navbar.css';
import logo from "../../assets/logo.png";
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

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
                    <Link to='intro' smooth={true} duration={500} className='menuItem'>Home</Link>
                    <Link to='client' smooth={true} duration={500} className='menuItem'>Client</Link>
                    <Link to='about' smooth={true} duration={500} className='menuItem'>About</Link>
                    <Link to='portfolio' smooth={true} duration={500} className='menuItem'>Portfolio</Link>
                    <button className='contactBtn'>
                    <FontAwesomeIcon icon={faEnvelope} className='contactIcon' />
                    Contact me
                </button>
                </div>
             
            </div>
        </nav>
    );
}

export default Navbar;
