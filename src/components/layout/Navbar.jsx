import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { personalInfo } from "../../data/experience";
import logoImg from "../../assets/logo.png";

const NAV_LINKS = [
  { to: "hero",     label: "Home" },
  { to: "about",    label: "About" },
  { to: "skills",   label: "Skills" },
  { to: "projects", label: "Projects" },
  { to: "ai-tools", label: "AI Tools" },
  { to: "contact",  label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5"
          : "bg-transparent"
      }`}
      style={scrolled ? { background: "rgba(2,5,16,0.9)", backdropFilter: "blur(20px)", borderBottom:"1px solid rgba(0,255,255,0.08)", boxShadow:"0 0 30px rgba(0,255,255,0.04)" } : {}}
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo — actual A logo image */}
        <Link
          to="hero"
          smooth
          duration={500}
          className="cursor-pointer select-none flex items-center gap-2"
          aria-label="Go to top"
        >
          <img
            src={logoImg}
            alt="Logo"
            className="h-10 w-auto object-contain"
            style={{ filter: "drop-shadow(0 0 8px rgba(0,255,255,0.5))" }}
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                smooth
                duration={500}
                offset={-64}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer relative group"
                activeClass="text-white"
                spy
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" style={{ boxShadow:"0 0 6px rgba(0,255,255,0.5)" }} />
              </Link>
            </li>
          ))}
        </ul>

        {/* Resume CTA */}
        <a
          href={personalInfo.resume}
          download
          className="hidden md:inline-flex btn-secondary text-sm px-4 py-2"
        >
          Resume
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-base-700 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-neutral-300 transition-transform duration-200 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-neutral-300 transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-neutral-300 transition-transform duration-200 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-base-900/95 backdrop-blur-md border-b border-neutral-800">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  smooth
                  duration={500}
                  offset={-64}
                  onClick={closeMenu}
                  className="block text-base font-medium text-neutral-300 hover:text-neutral-100 transition-colors py-1 cursor-pointer"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={personalInfo.resume}
                download
                onClick={closeMenu}
                className="btn-secondary text-sm px-4 py-2 w-full justify-center"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
