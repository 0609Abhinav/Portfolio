import React from "react";
import './skills.css';
import UIDesign from '../../assets/ui-design.png';
import WebDesign from '../../assets/website-design.png';
import AppDesign from '../../assets/app-design.png';
import FrontendDev from '../../assets/frontend-development.png';
import WebDev from '../../assets/website-development.png';
import FullstackDev from '../../assets/fullstack-development.png';

const Skills = () => {
    return (
        <section id='skills'>
            <div className="skillAnimationWrapper">
                <div className="skillAnimation"></div>
            </div>

            <span className="skillTitle">What I Do</span>
            <span className="skillDesc">
                As a fresher in the field of web development and design, I bring enthusiasm and a keen eye for detail to every project. Here’s a glimpse into my skill set:
            </span>
            <div className="skillBars">
                <div className="skillBar">
                    <img src={UIDesign} alt='UI/UX Design' className="skillBarImg"/>
                    <div className="skillBarText">
                        <h2>UI/UX Design</h2>
                        <p>Creating visually appealing and user-friendly interfaces that enhance user experiences.</p>
                    </div>
                </div>

                <div className="skillBar">
                    <img src={WebDesign} alt='Website Design' className="skillBarImg"/>
                    <div className="skillBarText">
                        <h2>Website Design</h2>
                        <p>Designing and developing responsive websites that are both functional and aesthetically pleasing.</p>
                    </div>
                </div>

                <div className="skillBar">
                    <img src={AppDesign} alt='App Design' className="skillBarImg"/>
                    <div className="skillBarText">
                        <h2>App Design</h2>
                        <p>Designing mobile applications that offer a seamless user experience and intuitive navigation.</p>
                    </div>
                </div>

                <div className="skillBar">
                    <img src={FrontendDev} alt='Frontend Development' className="skillBarImg"/>
                    <div className="skillBarText">
                        <h2>Frontend Development</h2>
                        <p>Building engaging and responsive front-end interfaces using HTML, CSS, and JavaScript.</p>
                    </div>
                </div>

                <div className="skillBar">
                    <img src={WebDev} alt='Website Development' className="skillBarImg"/>
                    <div className="skillBarText">
                        <h2>Website Development</h2>
                        <p>Implementing robust and scalable web solutions with a focus on performance and security.</p>
                    </div>
                </div>

                <div className="skillBar">
                    <img src={FullstackDev} alt='Fullstack Development' className="skillBarImg"/>
                    <div className="skillBarText">
                        <h2>Fullstack Development</h2>
                        <p>Developing end-to-end solutions encompassing both front-end and back-end technologies.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skills;
