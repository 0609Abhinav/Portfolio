import React, { useState, useEffect } from "react";
import './intro.css';
import { Link } from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import computerIcon from './computer-icon.svg'; // Adjust path if needed
import { faLinkedin, faGithub, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FaEnvelope } from "react-icons/fa";

// Array of titles to display with typing effect
const titles = [
  "Website Designer",
  "Frontend Developer",
  "Fullstack Developer",
  "Frontend Designer"
];

const Intro = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [typing, setTyping] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [delay, setDelay] = useState(200);

  // Typing effect logic
  useEffect(() => {
    const handleTyping = () => {
      const currentText = titles[currentTitle];

      if (!isDeleting && typing.length < currentText.length) {
        setTyping(currentText.slice(0, typing.length + 1));
        setDelay(200);
      } else if (isDeleting && typing.length > 0) {
        setTyping(currentText.slice(0, typing.length - 1));
        setDelay(100);
      } else if (!isDeleting && typing.length === currentText.length) {
        setIsDeleting(true);
        setDelay(1000);
      } else if (isDeleting && typing.length === 0) {
        setIsDeleting(false);
        setCurrentTitle((prev) => (prev + 1) % titles.length);
        setDelay(500);
      }
    };

    const typingInterval = setTimeout(handleTyping, delay);

    return () => clearTimeout(typingInterval);
  }, [typing, isDeleting, currentTitle, delay]);

  // Inline style for social media icons
  const socialLinkStyle = {
    fontSize: '3rem', // Increase size for better visibility
    color: 'white',
    transition: 'transform 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
    margin: '0 20px', // Adjust spacing between icons
    padding: '10px', // Add padding to create space around the icon
    borderRadius: '50%', // Circular background
    background: 'rgba(0, 0, 0, 0.2)', // Subtle background for contrast
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' // Shadow for depth
  };

  // Hover styles for each social media icon
  const socialLinkHoverStyles = {
    linkedin: { color: '#0a66c2' }, // LinkedIn color
    github: { color: '#333' }, // GitHub color
    instagram: { color: '#c13584' }, // Instagram color
    facebook: { color: '#1877f2' } // Facebook color
  };

  // Function to handle hover
  const handleMouseOver = (e, platform) => {
    e.currentTarget.style.color = socialLinkHoverStyles[platform].color;
  };

  // Function to handle mouse out
  const handleMouseOut = (e) => {
    e.currentTarget.style.color = socialLinkStyle.color;
  };

  // Inline styles for buttons
  const btnPrimaryStyle = {
    backgroundColor: '#ff5722', // New primary background color
    color: 'white',
    fontSize: '1.2rem',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background 0.3s ease, transform 0.3s ease',
    margin: '0 10px' // Added margin for spacing between buttons
  };

  const btnPrimaryHoverStyle = {
    backgroundColor: '#e64a19', // New primary hover color
    transform: 'scale(1.05)'
  };

  const btnSecondaryStyle = {
    backgroundColor: '#4caf50', // New secondary background color
    color: 'white',
    fontSize: '1.2rem',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background 0.3s ease, transform 0.3s ease',
    margin: '0 10px' // Added margin for spacing between buttons
  };

  const btnSecondaryHoverStyle = {
    backgroundColor: '#388e3c', // New secondary hover color
    transform: 'scale(1.05)'
  };

  return (
    <section id="intro" className="introSection" style={{ backgroundImage: `url(${computerIcon})` }}>
      <div className="introContent">
        <h1 className="hello">Hello</h1>
        <h2 className="introText">
          I'm <span className="introName">Abhinav</span><br />
          <span className="typing">{typing}</span>
        </h2>
        <p className="introPara">
          I am a skilled professional with experience in creating<br />
          visually appealing and user-friendly websites.
        </p>
        
        {/* Hire Me Button */}
        <Link to="contact" smooth={true} duration={500}>
          <button
            style={btnPrimaryStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, btnPrimaryHoverStyle)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, btnPrimaryStyle)}
          >
            Hire Me
          </button>
        </Link>
        
        {/* Download Resume Button */}
        <a
          href="/resume.pdf"
          download
          style={btnSecondaryStyle}
          onMouseOver={(e) => Object.assign(e.currentTarget.style, btnSecondaryHoverStyle)}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, btnSecondaryStyle)}
        >
          Get My CV
        </a>

        {/* Social Media Links */}
        <div className="socialLinks" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <a
            href="https://www.linkedin.com/in/abhinav-tripathi-770224253/"
            target="_blank"
            rel="noopener noreferrer"
            style={socialLinkStyle}
            onMouseOver={(e) => handleMouseOver(e, 'linkedin')}
            onMouseOut={handleMouseOut}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/0609Abhinav"
            target="_blank"
            rel="noopener noreferrer"
            style={socialLinkStyle}
            onMouseOver={(e) => handleMouseOver(e, 'github')}
            onMouseOut={handleMouseOut}
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.instagram.com/_abhinavtripathi/"
            target="_blank"
            rel="noopener noreferrer"
            style={socialLinkStyle}
            onMouseOver={(e) => handleMouseOver(e, 'instagram')}
            onMouseOut={handleMouseOut}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={socialLinkStyle}
            onMouseOver={(e) => handleMouseOver(e, 'facebook')}
            onMouseOut={handleMouseOut}
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="mailto:abhinavtripathi6sep@gmail.com" className="socialLink">
                        <FaEnvelope className="socialIcon" /> Email Me
                    </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;
