import React, { useState } from "react";
import './works.css';
import CollegeWebsite from '../../assets/college-website.jpg';
import CryptoTracker from '../../assets/crypto-currency.jpeg';
import MyPortfolio from '../../assets/portfolio.jpg';
import BookFromSeniors from '../../assets/book-from-senior.jpeg';
import PhoneTracking from '../../assets/phone-tracking.jpg';
import Photographer from '../../assets/photographer.png';
import RubiksCube from '../../assets/rubiks-cube.png';
import SmartEx from '../../assets/smart-ex.png';
import SpandanWebsite from '../../assets/spandan-website.png';
import CNNPCA from '../../assets/ai-project.png'; // optional placeholder
import { FaHeart } from 'react-icons/fa';

const Works = () => {
    const [showAll, setShowAll] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const projects = [
        {
            id: 1,
            src: CollegeWebsite,
            title: 'College Website',
            description: 'A comprehensive website for college management and student engagement.',
            category: 'Web Design',
            githubLink: 'https://github.com/0609Abhinav/College_Website'
        },
        {
            id: 2,
            src: CryptoTracker,
            title: 'Crypto Tracker',
            description: 'Track cryptocurrency prices and market trends.',
            category: 'App Development',
            githubLink: 'https://github.com/0609Abhinav/Crypto-Tracker'
        },
        {
            id: 3,
            src: MyPortfolio,
            title: 'Portfolio',
            description: 'A personal portfolio to showcase projects and skills.',
            category: 'Web Design',
            githubLink: 'https://github.com/0609Abhinav/Portfolio'
        },
        {
            id: 4,
            src: BookFromSeniors,
            title: 'Book from Seniors',
            description: 'A digital platform to share books among students.',
            category: 'UI/UX',
            githubLink: 'https://github.com/0609Abhinav/Online-Book-Store'
        },
        {
            id: 5,
            src: PhoneTracking,
            title: 'Phone Tracking System',
            description: 'A tool for monitoring and tracking device activity.',
            category: 'App Development',
            githubLink: 'https://github.com/0609Abhinav/phone-tracking'
        },
        {
            id: 6,
            src: RubiksCube,
            title: 'Rubik\'s Cube Solver',
            description: 'Solves the Rubik\'s Cube using AI and logic algorithms.',
            category: 'AI/ML',
            githubLink: 'https://github.com/0609Abhinav/Rubik-s-Cube'
        },
        {
            id: 7,
            src: SmartEx,
            title: 'Smart-Ex',
            description: 'An intelligent exam system for smart evaluations.',
            category: 'Web Design',
            githubLink: 'https://github.com/0609Abhinav/Smart-Ex'
        },
        {
            id: 8,
            src: Photographer,
            title: 'Photographer Website',
            description: 'A photography-themed responsive website template.',
            category: 'Web Design',
            githubLink: 'https://github.com/0609Abhinav/Photographer-master'
        },
        {
            id: 9,
            src: CNNPCA,
            title: 'Hybrid CNN + PCA',
            description: 'An AI model using CNN with PCA for dimensionality reduction.',
            category: 'AI/ML',
            githubLink: 'https://github.com/0609Abhinav/Hybrid_CNN_PCA_Full_Package'
        },
        {
            id: 10,
            src: SpandanWebsite,
            title: 'Spandan Website',
            description: 'A vibrant website designed for a college fest or cultural event.',
            category: 'Web Design',
            githubLink: 'https://github.com/0609Abhinav/spandan-website'
        }
    ];

    const categories = ['All', 'Web Design', 'App Development', 'UI/UX', 'AI/ML'];

    const filteredProjects = projects.filter(project =>
        selectedCategory === 'All' || project.category === selectedCategory
    );

    const projectsToShow = showAll ? filteredProjects : filteredProjects.slice(0, 3);

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
                    Welcome to my portfolio. Here, you'll find a blend of creative design and technical functionality. Each project showcases my skills in web/app development, UI/UX, and AI.
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
                    {projectsToShow.map(project => (
                        <div
                            key={project.id}
                            className="worksImgWrapper"
                            onClick={() => openModal(project)}
                        >
                            <img src={project.src} alt={project.title} className="worksImg" />
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
                        <h2>{selectedProject.title}</h2>
                        <img src={selectedProject.src} alt={selectedProject.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                        <p>{selectedProject.description}</p>
                        <a href={selectedProject.githubLink} className="githubLink" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                        <button className="closeBtn" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Works;
