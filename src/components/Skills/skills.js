import React from "react";
import './skills.css';
import UIDesign from '../../assets/ui-design.png';
import WebDesign from '../../assets/website-design.png';
import AppDesgin from '../../assets/app-design.png';

const Skills = () => {
    return(
        <section id='skills'> 
            <span className="skillTitle">What I do</span>
            <span className="skillDesc">I am a skilled and passionate web  designer with experience in creating visually appealing and user-friendly websites.I have a strong undersatanding of design and a keen eye for detail. I am proficient in Html,Css and Javascript , as well as desgin software such as Adobe Photoshop and Illustrator.</span>
        <div className="skillBars">
            <div className="skillBar">
                <img src={UIDesign} alt='UIDesign' className="skillBarImg"/>
                    <div className="skillBarText">
                        <h2>UI/UX Design</h2>
                        <p>This is a demo,You can write your own</p>
                    </div>
            </div>

            <div className="skillBar">
                <img src={WebDesign} alt='WebDesign' className="skillBarImg"/>
                    <div className="skillBarText">
                        <h2>Website Design</h2>
                        <p>This is a demo,You can write your own</p>
                    </div>
            </div>

            <div className="skillBar">
                <img src={AppDesgin} alt='AppDesign' className="skillBarImg"/>
                    <div className="skillBarText">
                        <h2>App Desgin</h2>
                        <p>This is a demo,You can write your own</p>
                    </div>
            </div>
        </div>
        </section>
    );
}

export default Skills;