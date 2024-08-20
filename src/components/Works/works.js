import React from "react";
import './works.css';
import Portfolio1 from '../../assets/portfolio-1.png';
import Portfolio2 from '../../assets/portfolio-2.png';
import Portfolio3 from '../../assets/portfolio-3.png';
import Portfolio4 from '../../assets/portfolio-4.png';
import Portfolio5 from '../../assets/portfolio-5.png';
import Portfolio6 from '../../assets/portfolio-6.png';

const Works = () => {
    return (
        <section id="works"> 
        <h2 className="worksTitle">My Portfolio</h2>
        <span className="worksDesc"> elcome to my portfolio, where creativity meets functionality in the digital world. As a dedicated website designer, I specialize in crafting visually stunning and user-friendly websites that elevate brands and leave lasting impressions. Each project in my portfolio is a testament to my passion for blending design with seamless functionality. Whether it's creating responsive layouts, optimizing user experiences, or implementing cutting-edge technologies, I take pride in delivering solutions that exceed expectations. Explore my work below and envision how we can collaborate to bring your digital presence to life.</span>
        <div className="worksImgs">
            <img src={Portfolio1} alt="" className="worksImg"/>
            <img src={Portfolio2}  alt="" className="worksImg"/>
            <img src={Portfolio3}  alt="" className="worksImg"/>
            <img src={Portfolio4}  alt="" className="worksImg"/>
            <img src={Portfolio5}  alt="" className="worksImg"/>
            <img src={Portfolio6}  alt="" className="worksImg"/>
        </div>
        <button className="worksBtn">See More</button>
        </section>
    );
}

export default Works;