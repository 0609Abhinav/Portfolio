import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhoneAlt, FaLocationArrow } from 'react-icons/fa';
import profilePic from './path-to-your-photo.jpg'; // Add the path to your photo

const About = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-5">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <div className="w-40 h-40 mb-5 rounded-full overflow-hidden border-4 border-white shadow-lg transform hover:scale-105 transition duration-500">
          <img src={profilePic} alt="Abhinav Tripathi" className="object-cover w-full h-full" />
        </div>
        <h1 className="text-5xl font-bold mb-4 animate-pulse">Abhinav Tripathi</h1>
        <h2 className="text-xl font-semibold mb-6">Recent IT Graduate | MERN Stack Developer | Python Enthusiast</h2>
        <p className="text-lg max-w-2xl mb-8 animate-fadeInUp">
          I’m a passionate web developer with experience in Python programming and MERN stack technologies (MongoDB, Express.js, React.js, Node.js). I specialize in creating responsive, user-centric web applications using modern technologies like HTML, CSS, JavaScript, and SQL. I also have foundational knowledge of AWS services like EC2 and S3, ready to contribute to dynamic IT teams.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
          <a href="https://www.linkedin.com/in/abhinav-tripathi-770224253/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 bg-blue-700 hover:bg-blue-800 transition duration-300 px-5 py-3 rounded-lg shadow-lg">
            <FaLinkedin className="text-2xl" /> <span>LinkedIn</span>
          </a>
          <a href="mailto:abhinavtripathi6sep@gmail.com" className="flex items-center space-x-3 bg-green-600 hover:bg-green-700 transition duration-300 px-5 py-3 rounded-lg shadow-lg">
            <FaEnvelope className="text-2xl" /> <span>Email Me</span>
          </a>
          <a href="tel:9621854341" className="flex items-center space-x-3 bg-orange-500 hover:bg-orange-600 transition duration-300 px-5 py-3 rounded-lg shadow-lg">
            <FaPhoneAlt className="text-2xl" /> <span>Call Me</span>
          </a>
          <a href="https://github.com/0609Abhinav" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-800 transition duration-300 px-5 py-3 rounded-lg shadow-lg">
            <FaGithub className="text-2xl" /> <span>GitHub</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fadeInUp">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500">
            <h3 className="text-2xl font-semibold mb-3">Education</h3>
            <p>Bachelor of Technology in Information Technology | <br/>Dr. A.P.J. Abdul Kalam Technical University, <br/>Graduating June 2025</p>
            <p className="mt-4">Diploma in Computer Science and Engineering | <br/>Board of Technical Education Uttar Pradesh, <br/>June 2022</p>
          </div>

          <div className="bg-white text-black p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500">
            <h3 className="text-2xl font-semibold mb-3">Projects</h3>
            <p>College Website – Python, Django</p>
            <p>Online Book Store – Python, Django</p>
            <p>Digital Currency Tracker – MERN Stack</p>
            <p>Portfolio Website – React.js</p>
          </div>

          <div className="bg-white text-black p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500">
            <h3 className="text-2xl font-semibold mb-3">Technical Skills</h3>
            <ul>
              <li>Programming: Python, JavaScript, PHP</li>
              <li>Web Development: HTML, CSS, React.js, Node.js</li>
              <li>Databases: MongoDB, SQL</li>
              <li>Cloud: AWS EC2, S3</li>
              <li>Tools: Git, VS Code</li>
            </ul>
          </div>

          <div className="bg-white text-black p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500">
            <h3 className="text-2xl font-semibold mb-3">Training & Certifications</h3>
            <ul>
              <li>Python with Django – Techpile</li>
              <li>PHP – Acmegrade</li>
              <li>MERN Stack – Shape My Skills</li>
              <li>Digital Skills: AI – Accenture</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-gray-300 text-sm animate-fadeInUp">
          <p><FaLocationArrow className="inline-block" /> Allahabad, India</p>
          <p>3-year gap explained: Took time off to recover from tuberculosis, now fully recovered and ready to contribute professionally.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
