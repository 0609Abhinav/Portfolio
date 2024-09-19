import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhoneAlt, FaLocationArrow } from 'react-icons/fa';
import profilePic from '../../assets/profile-pic.png';
import './about.css'; // Import the updated CSS file

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="profile-pic">
          <img src={profilePic} alt="Abhinav Tripathi" />
        </div>
        <h1 className="name">Abhinav Tripathi</h1>
        <h2 className="title">Recent IT Graduate | MERN Stack Developer | Python Enthusiast</h2>
        <p className="description">
          I’m a passionate web developer with experience in Python programming and MERN stack technologies (MongoDB, Express.js, React.js, Node.js). I specialize in creating responsive, user-centric web applications using modern technologies like HTML, CSS, JavaScript, and SQL. I also have foundational knowledge of AWS services like EC2 and S3, ready to contribute to dynamic IT teams.
        </p>

        <div className="social-links">
          <a href="https://www.linkedin.com/in/abhinav-tripathi-770224253/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
            <FaLinkedin className="icon" /> LinkedIn
          </a>
          <a href="mailto:abhinavtripathi6sep@gmail.com" className="social-link email">
            <FaEnvelope className="icon" /> Email Me
          </a>
          <a href="tel:9621854341" className="social-link phone">
            <FaPhoneAlt className="icon" /> Call Me
          </a>
          <a href="https://github.com/0609Abhinav" target="_blank" rel="noopener noreferrer" className="social-link github">
            <FaGithub className="icon" /> GitHub
          </a>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3 className="text-2xl font-semibold mb-3">Education</h3>
            <div className="education-info">
              <div className="education-item">
                <p>Bachelor of Technology in Information Technology | <br />Dr. A.P.J. Abdul Kalam Technical University, <br />Graduating June 2025</p>
              </div>
              <div className="education-item">
                <p>Diploma in Computer Science and Engineering | <br />Board of Technical Education Uttar Pradesh, <br />June 2022</p>
              </div>
              <div className="education-item">
                <p>10th Grade | Maharshi Patanjali Vidya Mandir | <br />CBSE Board, 2016</p>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3 className="text-2xl font-semibold mb-3">Projects</h3>
            <p>College Website – Python, Django</p>
            <p>Online Book Store – Python, Django</p>
            <p>Digital Currency Tracker – MERN Stack</p>
            <p>Portfolio Website – React.js</p>
          </div>

          <div className="info-card">
            <h3 className="text-2xl font-semibold mb-3">Technical Skills</h3>
            <ul>
              <li>Programming: Python, JavaScript, PHP</li>
              <li>Web Development: HTML, CSS, React.js, Node.js</li>
              <li>Databases: MongoDB, SQL</li>
              <li>Cloud: AWS EC2, S3</li>
              <li>Tools: Git, VS Code</li>
            </ul>
          </div>

          <div className="info-card">
            <h3 className="text-2xl font-semibold mb-3">Training & Certifications</h3>
            <ul>
              <li>Python with Django – Techpile</li>
              <li>PHP – Acmegrade</li>
              <li>MERN Stack – Shape My Skills</li>
              <li>Digital Skills: AI – Accenture</li>
            </ul>
          </div>
        </div>

        <div className="additional-info">
          <p><FaLocationArrow className="location-icon" /> Allahabad, India</p>
        </div>
      </div>
    </section>
  );
};

export default About;
