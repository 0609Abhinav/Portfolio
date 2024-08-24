import React, { useState } from "react";
import './works.css';
import Portfolio1 from '../../assets/portfolio-1.png';
import Portfolio2 from '../../assets/portfolio-2.png';
import Portfolio3 from '../../assets/portfolio-3.png';
import Portfolio4 from '../../assets/portfolio-4.png';
import Portfolio5 from '../../assets/portfolio-5.png';
import Portfolio6 from '../../assets/portfolio-6.png';
import { FaHeart } from 'react-icons/fa'; // Importing a heart icon for "favorite"

const Works = () => {
    const [showAll, setShowAll] = useState(false);

    const projects = [
        { id: 1, src: Portfolio1, title: 'Project 1', description: 'Innovative web design and development.' },
        { id: 2, src: Portfolio2, title: 'Project 2', description: 'Engaging user interface and experience.' },
        { id: 3, src: Portfolio3, title: 'Project 3', description: 'Responsive design for all devices.' },
        { id: 4, src: Portfolio4, title: 'Project 4', description: 'Modern and clean aesthetics.' },
        { id: 5, src: Portfolio5, title: 'Project 5', description: 'Custom solutions for unique needs.' },
        { id: 6, src: Portfolio6, title: 'Project 6', description: 'Exceptional attention to detail.' },
    ];

    return (
        <section id="works">
            <div className="worksContainer">
                <h2 className="worksTitle">My Portfolio</h2>
                <p className="worksDesc">
                    Welcome to my portfolio, where creativity meets functionality in the digital world. As a dedicated website designer, I specialize in crafting visually stunning and user-friendly websites that elevate brands and leave lasting impressions. Each project in my portfolio is a testament to my passion for blending design with seamless functionality. Whether it's creating responsive layouts, optimizing user experiences, or implementing cutting-edge technologies, I take pride in delivering solutions that exceed expectations. Explore my work below and envision how we can collaborate to bring your digital presence to life.
                </p>
                <div className="worksImgs">
                    {projects.slice(0, showAll ? projects.length : 3).map(project => (
                        <div key={project.id} className="worksImgWrapper">
                            <img src={project.src} alt={project.title} className="worksImg"/>
                            <div className="worksOverlay">
                                <div className="worksInfo">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <FaHeart className="favoriteIcon" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="worksBtn" onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Show Less' : 'See More'}
                </button>
            </div>
        </section>
    );
}

export default Works;
