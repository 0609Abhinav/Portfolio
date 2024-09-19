import React from "react";
import './skills.css';
import UIDesign from '../../assets/ui-design.png';
import WebDesign from '../../assets/website-design.png';
import AppDesign from '../../assets/app-design.png';
import FrontendDev from '../../assets/frontend-development.png';
import WebDev from '../../assets/website-development.png';
import FullstackDev from '../../assets/fullstack-development.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faCode } from '@fortawesome/free-solid-svg-icons';

const Skills = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    const categories = ['All', 'Design', 'Development'];

    const skills = [
        { name: "UI/UX Design", image: UIDesign, description: "Creating visually appealing and user-friendly interfaces that enhance user experiences.", level: 80, category: 'Design' },
        { name: "Website Design", image: WebDesign, description: "Designing and developing responsive websites that are both functional and aesthetically pleasing.", level: 75, category: 'Design' },
        { name: "App Design", image: AppDesign, description: "Designing mobile applications that offer a seamless user experience and intuitive navigation.", level: 70, category: 'Design' },
        { name: "Frontend Development", image: FrontendDev, description: "Building engaging and responsive front-end interfaces using HTML, CSS, and JavaScript.", level: 85, category: 'Development' },
        { name: "Website Development", image: WebDev, description: "Implementing robust and scalable web solutions with a focus on performance and security.", level: 80, category: 'Development' },
        { name: "Fullstack Development", image: FullstackDev, description: "Developing end-to-end solutions encompassing both front-end and back-end technologies.", level: 65, category: 'Development' }
    ];

    const toolsAndTechnologies = [
        { name: "React", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/react.svg", color: "#61DAFB" },
        { name: "JavaScript", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/javascript.svg", color: "#F7E018" },
        { name: "HTML5", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/html5.svg", color: "#E34F26" },
        { name: "CSS3", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/css3.svg", color: "#1572B6" },
        { name: "Tailwind CSS", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/tailwindcss.svg", color: "#38B2AC" },
        { name: "Node.js", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/nodedotjs.svg", color: "#68A063" },
        { name: "Express.js", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/express.svg", color: "gray" },
        { name: "MongoDB", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/mongodb.svg", color: "#47A248" },
        { name: "MySQL", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/mysql.svg", color: "#00758F" },
        { name: "Python", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/python.svg", color: "#306998" },
        { name: "Django", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/django.svg", color: "green" },
        { name: "GraphQL", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/graphql.svg", color: "white" },
        { name: "MERN Stack", image: "https://i.imgur.com/Jt4BaiD.png", color: "#1B7D1B" },
        { name: "AWS", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/amazonaws.svg", color: "#FF9900" },
        { name: "JWT", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/jsonwebtokens.svg", color: "white" },
        { name: "Git", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/git.svg", color: "#F05032" },
        { name: "GitHub", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/github.svg", color: "white" },
        { name: "VS Code", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/visualstudiocode.svg", color: "#007ACC" },
        { name: "PyCharm", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/pycharm.svg", color: "green" },
        { name: "Anaconda", image: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/anaconda.svg", color: "#3A7E49" },
        { name: "REST API", icon: faCode, color: "#FF6F61" },
        { name: "MySQL Workbench", icon: faDatabase, color: "#00758F" },
    ];

    const filteredSkills = skills.filter(skill => 
        selectedCategory === 'All' || skill.category === selectedCategory
    );

    return (
        <section id='skills'>
            <div className="skillAnimationWrapper">
                <div className="skillAnimation"></div>
            </div>

            <div className="skillsContent">
                <div style={{ textAlign: 'center' }}>
                    <span className="skillTitle" style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold' }}>What I Do</span>
                    <div className="skillDescContainer">
    <p className="skillDesc">
        As a fresher in the field of web development and design, I bring enthusiasm and a keen eye for detail to every project. Here’s a glimpse into my skill set:
    </p>
</div>

                </div>
                
                <div className="categoryFilters">
                    {categories.map(category => (
                        <button 
                            key={category} 
                            onClick={() => setSelectedCategory(category)}
                            className={`categoryButton ${selectedCategory === category ? 'active' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="skillBars">
                    {filteredSkills.map((skill, index) => (
                        <div key={index} className="skillBar">
                            <img src={skill.image} alt={skill.name} className="skillBarImg"/>
                            <div className="skillBarText">
                                <h2>{skill.name}</h2>
                                <p>{skill.description}</p>
                                <a href={`/projects/${skill.name.toLowerCase().replace(/ /g, '-')}`} className="caseStudyLink">View Case Study</a>
                                <div className="progressWrapper">
                                    <div className="progressBar" style={{ width: `${skill.level}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tools & Technologies Sections */}
                <section id='tools-technologies'>
                    <span className="sectionTitle">🛠️ Tools & Technologies</span>
                    
                    <section id='frontend-expertise'>
                        <span className="sectionTitle">💻 Frontend (Expertise)</span>
                        <div className="toolsIcons">
                            {toolsAndTechnologies.filter(tool => ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"].includes(tool.name)).map(tool => (
                                <div key={tool.name} className="toolIconWrapper">
                                    <img src={tool.image} alt={tool.name} className="toolIcon" style={{ backgroundColor: tool.color }} />
                                    <span className="toolName">{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id='backend'>
                        <span className="sectionTitle">🌐 Backend</span>
                        <div className="toolsIcons">
                            {toolsAndTechnologies.filter(tool => ["Node.js", "Express.js", "MongoDB", "MySQL", "Python", "Django", "GraphQL", "JWT"].includes(tool.name)).map(tool => (
                                <div key={tool.name} className="toolIconWrapper">
                                    <img src={tool.image} alt={tool.name} className="toolIcon" style={{ backgroundColor: tool.color }} />
                                    <span className="toolName">{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id='fullstack'>
                        <span className="sectionTitle">🌟 Full Stack</span>
                        <div className="toolsIcons">
                            {toolsAndTechnologies.filter(tool => ["MERN Stack"].includes(tool.name)).map(tool => (
                                <div key={tool.name} className="toolIconWrapper">
                                    <img src={tool.image} alt={tool.name} className="toolIcon" style={{ backgroundColor: tool.color }} />
                                    <span className="toolName">{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id='tools'>
                        <span className="sectionTitle">🛠️ Tools</span>
                        <div className="toolsIcons">
                            {toolsAndTechnologies.filter(tool => ["AWS", "REST API", "Git", "GitHub", "VS Code", "PyCharm", "Anaconda", "MySQL Workbench"].includes(tool.name)).map(tool => (
                                <div key={tool.name} className="toolIconWrapper">
                                    {tool.icon ? (
                                        <FontAwesomeIcon icon={tool.icon} className="toolIcon" style={{ backgroundColor: tool.color }} />
                                    ) : (
                                        <img src={tool.image} alt={tool.name} className="toolIcon" style={{ backgroundColor: tool.color }} />
                                    )}
                                    <span className="toolName">{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </section>
            </div>
        </section>
    );
};

export default Skills;
