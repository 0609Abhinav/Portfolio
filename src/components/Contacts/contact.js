import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa"; // Add icons
import './contact.css';

const Contact = () => {
    return (
        <section className="contactPage">
            {/* Let's Connect Section */}
            <div id="letsConnect">
                <h1 className="connectTitle">Let's Connect</h1>
                <p className="connectDesc">
                    I'm passionate about collaborating on exciting projects and bringing new ideas to life. Let's get in touch and build something awesome together!
                </p>
                <div className="socialLinks">
                    <a href="https://www.linkedin.com/in/abhinav-tripathi-770224253" target="_blank" rel="noopener noreferrer" className="socialLink">
                        <FaLinkedin className="socialIcon" /> LinkedIn
                    </a>
                    <a href="https://github.com/0609Abhinav" target="_blank" rel="noopener noreferrer" className="socialLink">
                        <FaGithub className="socialIcon" /> GitHub
                    </a>
                    <a href="mailto:abhinavtripathi6sep@gmail.com" className="socialLink">
                        <FaEnvelope className="socialIcon" /> Email Me
                    </a>
                </div>
            </div>

            {/* Contact Section */}
            <div id="contact">
                <h2 className="contactTitle">Get in Touch</h2>
                <form className="contactForm">
                    <input type="text" className="contactInput" placeholder="Your Name" required />
                    <input type="email" className="contactInput" placeholder="Your Email" required />
                    <textarea className="contactInput" placeholder="Your Message" required></textarea>
                    <button type="submit" className="contactButton">Send Message</button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
