import React, { useState } from "react";
import './works.css';
import Portfolio1 from '../../assets/portfolio-1.png';
import Portfolio2 from '../../assets/portfolio-2.png';
import Portfolio3 from '../../assets/portfolio-3.png';
import Portfolio4 from '../../assets/portfolio-4.png';
import Portfolio5 from '../../assets/portfolio-5.png';
import Portfolio6 from '../../assets/portfolio-6.png';
import { FaHeart } from 'react-icons/fa';

const Works = () => {
    const [showAll, setShowAll] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const projects = [
        { id: 1, src: Portfolio1, title: 'Project 1', description: 'Innovative web design and development.', category: 'Web Design' },
        { id: 2, src: Portfolio2, title: 'Project 2', description: 'Engaging user interface and experience.', category: 'UI/UX' },
        { id: 3, src: Portfolio3, title: 'Project 3', description: 'Responsive design for all devices.', category: 'App Development' },
        { id: 4, src: Portfolio4, title: 'Project 4', description: 'Modern and clean aesthetics.', category: 'Web Design' },
        { id: 5, src: Portfolio5, title: 'Project 5', description: 'Custom solutions for unique needs.', category: 'App Development' },
        { id: 6, src: Portfolio6, title: 'Project 6', description: 'Exceptional attention to detail.', category: 'UI/UX' },
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
