import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhoneAlt, FaLocationArrow } from 'react-icons/fa';
import profilePic from '../../assets/profile-pic.png';
import './about.css';

const About = () => {
  const education = [
    {
      title: 'Bachelor of Technology in Information Technology',
      institution: 'Dr. A.P.J. Abdul Kalam Technical University',
      year: 'July 2025',
    },
    {
      title: 'Diploma in Computer Science and Engineering',
      institution: 'Board of Technical Education Uttar Pradesh',
      year: 'June 2022',
    },
    {
      title: '10th Grade',
      institution: 'Maharshi Patanjali Vidya Mandir, CBSE Board',
      year: '2016',
    },
  ];

  const projects = [
    'College Website – Python, Django',
    'Online Book Store – Python, Django',
    'Digital Currency Tracker – MERN Stack',
    'Portfolio Website – React.js',
    'Photographer Website – WordPress',
    'Spandan Event Website – HTML, CSS, JS',
    'Smart-Ex Web App – React.js',
    'AI Project – Python, Flask',
  ];

  const skills = [
    'Programming: Python, JavaScript, PHP',
    'Web Development: HTML, CSS, React.js, Node.js, WordPress',
    'Databases: MongoDB, SQL',
    'Cloud: AWS EC2, S3',
    'Tools: Git, VS Code, Postman',
  ];

 const certifications = [
  'Python with Django – Techpile',
  'PHP – Acmegrade',
  'MERN Stack – Shape My Skills',
  'Digital Skills: AI – Accenture',
  'Python Basic – HackerRank',
  'Technology Job Simulation – Deloitte Australia (Forage)',
  'Python Essentials 1 – Cisco'
];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="profile-pic">
          <img src={profilePic} alt="Abhinav Tripathi" />
        </div>
        <h1 className="name">Abhinav Tripathi</h1>
        <h2 className="title">IT Graduate | MERN Stack Developer | Python Enthusiast</h2>

        <p className="description">
          Passionate full-stack developer with a strong foundation in Python, MERN stack, and modern web tools.
          From building scalable web apps to crafting user-friendly WordPress sites, I merge creativity and logic to deliver standout digital experiences.
          I’m also experienced with AWS (EC2, S3) and eager to contribute to innovative development teams.
        </p>

        <div className="social-links">
          <a href="https://www.linkedin.com/in/abhinav-tripathi-770224253/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
            <FaLinkedin className="icon" /> LinkedIn
          </a>
          <a href="mailto:abhinavtripathi6sep@gmail.com" className="social-link email">
            <FaEnvelope className="icon" /> Email
          </a>
          <a href="tel:9621854341" className="social-link phone">
            <FaPhoneAlt className="icon" /> Phone
          </a>
          <a href="https://github.com/0609Abhinav" target="_blank" rel="noopener noreferrer" className="social-link github">
            <FaGithub className="icon" /> GitHub
          </a>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Education</h3>
            {education.map((edu, idx) => (
              <div key={idx} className="education-item">
                <p><strong>{edu.title}</strong><br />
                  {edu.institution} <br />
                  {edu.year}</p>
              </div>
            ))}
          </div>

          <div className="info-card">
            <h3>Projects</h3>
            <ul>
              {projects.map((project, idx) => (
                <li key={idx}>{project}</li>
              ))}
            </ul>
          </div>

          <div className="info-card">
            <h3>Technical Skills</h3>
            <ul>
              {skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="info-card">
            <h3>Certifications</h3>
            <ul>
              {certifications.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
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
