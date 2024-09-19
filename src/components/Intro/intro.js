import React, { useState, useEffect } from "react";
import './intro.css';
import { Link } from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import computerIcon from './computer-icon.svg'; // Adjust path if needed
import { faLinkedin, faGithub, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

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
          <button className="btn btn-primary">Hire Me</button>
        </Link>
        
        {/* Download Resume Button */}
        <a href="/resume.pdf" download className="btn btn-secondary">
          Get My CV
        </a>

        {/* Social Media Links */}
        <div className="socialLinks">
          <a href="https://www.linkedin.com/in/abhinav-tripathi-770224253/" target="_blank" rel="noopener noreferrer" className="socialLink">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com/0609Abhinav" target="_blank" rel="noopener noreferrer" className="socialLink">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.instagram.com/_abhinavtripathi/" target="_blank" rel="noopener noreferrer" className="socialLink">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="socialLink">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;
