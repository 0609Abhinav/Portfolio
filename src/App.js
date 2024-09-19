import React from "react";
import Navbar from "./components/Navbar/navbar";
import Intro from './components/Intro/intro';
import Skills from "./components/Skills/skills";
import Works from "./components/Works/works";
import About from "./components/About/about";
import Contact from './components/Contacts/contact';
import { Element } from 'react-scroll';

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <Element name="intro">
        <Intro />
      </Element>

      <Element name="about">
        <About /> {/* Add About section */}
      </Element>

      <Element name="skills">
        <Skills />
      </Element>

      <Element name="works">
        <Works />
      </Element>

      <Element name="contact">
        <Contact />
      </Element>
    </div>
  );
}

export default App;
