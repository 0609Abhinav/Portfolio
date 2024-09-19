import React, { useState } from "react";
import './works.css';
import CollegeWebsite from '../../assets/college-website.jpg'; // Replace with correct path
import CryptoTracker from '../../assets/crypto-currency.jpeg'; // Replace with correct path
import MyPortfolio from '../../assets/portfolio.jpg'; // Replace with correct path
import BookFromSeniors from '../../assets/book-from-senior.jpeg'; // Replace with correct path
import PhoneTracking from '../../assets/phone-tracking.jpg'; // Replace with correct path
import { FaHeart } from 'react-icons/fa';

const Works = () => {
    const [showAll, setShowAll] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const projects = [
        { id: 1, src: CollegeWebsite, title: 'College Website', description: 'A comprehensive website for college management and student engagement.', category: 'Web Design', githubLink: 'https://github.com/0609Abhinav/College_Website' },
        { id: 2, src: CryptoTracker, title: 'Crypto Tracker', description: 'An application for tracking cryptocurrency prices and trends.', category: 'App Development', githubLink: 'https://github.com/0609Abhinav/Crypto-Tracker' },
        { id: 3, src: MyPortfolio, title: 'My Portfolio', description: 'A personal portfolio showcasing various projects and skills.', category: 'Web Design', githubLink: 'https://github.com/0609Abhinav/Portfolio' },
        { id: 4, src: BookFromSeniors, title: 'Book from Seniors', description: 'A digital library for accessing books from seniors.', category: 'UI/UX', githubLink: 'https://github.com/0609Abhinav/Online-Book-Store' },
        { id: 5, src: PhoneTracking, title: 'Phone Tracking', description: 'A tool for tracking and managing phone locations and activities.', category: 'App Development', githubLink: 'https://github.com/yourusername/phone-tracking' }
    ];

    const categories = ['All', 'Web Design', 'App Development', 'UI/UX'];

    const filteredProjects = projects.filter(project => 
        selectedCategory === 'All' || project.category === selectedCategory
    );

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    };

    const openModal = (project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    return (
        <section id="works">
            <div className="worksContainer">
                <h2 className="worksTitle">My Portfolio</h2>
                <p className="worksDesc">
                    Welcome to my portfolio, where creativity meets functionality in the digital world. As a dedicated website designer, I specialize in crafting visually stunning and user-friendly websites that elevate brands and leave lasting impressions. Each project in my portfolio is a testament to my passion for blending design with seamless functionality. Whether it's creating responsive layouts, optimizing user experiences, or implementing cutting-edge technologies, I take pride in delivering solutions that exceed expectations. Explore my work below and envision how we can collaborate to bring your digital presence to life.
                </p>
                <div className="categories">
                    {categories.map(category => (
                        <button 
                            key={category} 
                            onClick={() => setSelectedCategory(category)}
                            className={selectedCategory === category ? 'active' : ''}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="worksImgs">
                    {filteredProjects.slice(0, showAll ? filteredProjects.length : 3).map(project => (
                        <div 
                            key={project.id} 
                            className="worksImgWrapper" 
                            onClick={() => openModal(project)}
                        >
                            <img src={project.src} alt={project.title} className="worksImg"/>
                            <div className="worksOverlay">
                                <div className="worksInfo">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <FaHeart 
                                        className={`favoriteIcon ${favorites.includes(project.id) ? 'favorite' : ''}`} 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(project.id);
                                        }} 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="worksBtn" onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Show Less' : 'See More'}
                </button>
            </div>
            {selectedProject && (
                <div className="modal" onClick={closeModal}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <h3>{selectedProject.title}</h3>
                        <p>{selectedProject.description}</p>
                        <button className="closeBtn" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Works;
