import React from 'react';
import './navbar.css';
import logo from "../../assets/logo.png";
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <img src={logo} alt="logo" className='logo' />
            <div className='desktopMenu'>
                <Link to='intro' smooth={true} duration={500} className='desktopMenuListItem'>Home</Link>
                <Link to='client' smooth={true} duration={500} className='desktopMenuListItem'>Client</Link>
                <Link to='about' smooth={true} duration={500} className='desktopMenuListItem'>About</Link>
                <Link to='portfolio' smooth={true} duration={500} className='desktopMenuListItem'>Portfolio</Link>
            </div>
            <button className='desktopMenuBtn'>
                <FontAwesomeIcon icon={faEnvelope} className='desktopMenuIcon' />
                Contact me
            </button>
        </nav>
    );
}

export default Navbar;
