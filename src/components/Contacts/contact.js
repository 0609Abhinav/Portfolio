import React from "react";
import './contact.css';
import Walmart from '../../assets/walmart.png';
import Facebook from '../../assets/facebook.png';
import Adobe from '../../assets/adobe.png';
import Microsoft from '../../assets/microsoft.png';

const Contact = () => {
    return (
        <section className="contactPage">
            <div id="clients">
                <h1 className="contactPageTitle">My Clients</h1>
                <p className="clientDesc">
                    I have worked with a variety of clients, from small businesses to large enterprises.
                </p>
                <div className="clientImgs">
                    <img src={Walmart} alt="Walmart" className="clientImg" />
                    <img src={Facebook} alt="Facebook" className="clientImg" />
                    <img src={Adobe} alt="Adobe" className="clientImg" />
                    <img src={Microsoft} alt="Microsoft" className="clientImg" />
                </div>
            </div>
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
