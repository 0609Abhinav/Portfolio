import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTilt } from "../../hooks/useTilt";
import { useFetch } from "../../hooks/useFetch";
import { fetchProjects } from "../../services/api";
import { CATEGORIES } from "../../data/projects";
import SectionHeader from "../ui/SectionHeader";
import { CardSkeleton } from "../ui/Skeleton";
import FloatingIcons from "../ui/FloatingIcons";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { ref, onMouseMove, onMouseLeave } = useTilt(6, 10);

  return (
    <>
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => { onMouseLeave(); setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
        onClick={() => setModalOpen(true)}
        tabIndex={0}
        role="button"
        aria-label={`View ${project.title}`}
        onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
        style={{
          cursor: "pointer",
          borderRadius: "1.25rem",
          overflow: "hidden",
          background: "rgba(0,255,255,0.02)",
          border: "1px solid rgba(0,255,255,0.1)",
          backdropFilter: "blur(16px)",
          willChange: "transform",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: hovered ? "0 0 30px rgba(0,255,255,0.08), 0 0 60px rgba(139,92,246,0.06)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        {/* Light reflection layer */}
        <div data-shine style={{
          position: "absolute", inset: 0, borderRadius: "inherit",
          pointerEvents: "none", zIndex: 10, transition: "background 0.1s",
        }} />

        {/* Image */}
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />
          {/* Dark overlay on hover */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(5,8,22,0.95) 0%, rgba(5,8,22,0.3) 60%, transparent 100%)",
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 0.4s ease",
          }} />
          {project.featured && (
            <span style={{
              position: "absolute", top: 12, left: 12,
              padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
              background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)", color: "#93c5fd",
            }}>Featured</span>
          )}
          <span style={{
            position: "absolute", top: 12, right: 12,
            padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8",
          }}>{project.category}</span>
        </div>

        {/* Content — slides up on hover */}
        <div style={{
          padding: "1.25rem 1.5rem 1.5rem",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          flex: 1, display: "flex", flexDirection: "column",
        }}>
          <h3 style={{
            fontSize: "1.05rem", fontWeight: 700,
            marginBottom: "0.5rem",
            transition: "color 0.2s",
            color: hovered ? "#00ffff" : "#f1f5f9",
            textShadow: hovered ? "0 0 12px rgba(0,255,255,0.4)" : "none",
          }}>{project.title}</h3>

          <p style={{
            fontSize: "0.875rem", color: "#64748b", lineHeight: 1.6,
            marginBottom: "1rem", flex: 1,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>{project.description}</p>

          {/* Tech badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1rem" }}>
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} style={{
                padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 500,
                background: "rgba(0,255,255,0.06)", border: "1px solid rgba(0,255,255,0.18)", color: "#67e8f9",
              }}>{t}</span>
            ))}
          </div>

          {/* Links — appear on hover */}
          <div style={{
            display: "flex", gap: 10, marginTop: "auto",
            opacity: hovered ? 1 : 0.5,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
          }} onClick={(e) => e.stopPropagation()}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="btn-secondary" style={{ fontSize: 12, padding: "6px 14px" }}
                aria-label={`GitHub: ${project.title}`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="btn-primary" style={{ fontSize: 12, padding: "6px 14px" }}>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {modalOpen && <ProjectModal project={project} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:16, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(12px)" }}
      onClick={onClose} role="dialog" aria-modal="true">
      <motion.div
        initial={{ opacity:0, scale:0.93, y:20 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.93, y:20 }}
        transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
        style={{ background:"rgba(2,5,16,0.98)", border:"1px solid rgba(0,255,255,0.2)", borderRadius:"1.5rem", maxWidth:520, width:"100%", overflow:"hidden", boxShadow:"0 0 60px rgba(0,255,255,0.1), 0 40px 80px rgba(0,0,0,0.8)" }}
        onClick={(e) => e.stopPropagation()}>
        <div style={{ aspectRatio:"16/9", overflow:"hidden" }}>
          <img src={project.image} alt={project.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        </div>
        <div style={{ padding:"1.5rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
            <h2 style={{ fontSize:"1.25rem", fontWeight:700, color:"#f1f5f9" }}>{project.title}</h2>
            <button onClick={onClose} aria-label="Close"
              style={{ color:"#475569", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, padding:"4px 10px", cursor:"pointer", fontSize:14 }}>✕</button>
          </div>
          <p style={{ color:"#64748b", fontSize:"0.9rem", lineHeight:1.7, marginBottom:"1.25rem" }}>{project.description}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:"1.5rem" }}>
            {project.tech.map((t) => (
              <span key={t} style={{ padding:"3px 10px", borderRadius:999, fontSize:11, fontWeight:500, background:"rgba(0,255,255,0.06)", border:"1px solid rgba(0,255,255,0.2)", color:"#67e8f9" }}>{t}</span>
            ))}
          </div>
          <div style={{ display:"flex", gap:10 }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize:13, padding:"8px 18px" }}>View on GitHub</a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize:13, padding:"8px 18px" }}>Live Demo</a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const { data: projects, loading, error } = useFetch(fetchProjects);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    if (!projects) return [];
    return activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const visible = showAll ? filtered : filtered.slice(0, 6);

  // GSAP scroll reveal for section title
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-header", {
        scrollTrigger: { trigger: ".projects-header", start: "top 85%", toggleActions: "play none none none" },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects"
      style={{ background: "linear-gradient(180deg, #020510 0%, #050816 100%)", position: "relative", overflow: "hidden" }}>
      <FloatingIcons seed={4} count={8} opacity={0.08} />
      <div className="section-container">
        <div className="section-divider mb-24" />
        <div className="projects-header">
          <SectionHeader
            label="Portfolio"
            title="Selected Projects"
            subtitle="A collection of work that demonstrates range across web, AI, and full-stack engineering."
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button key={cat}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              aria-pressed={activeCategory === cat}
              style={activeCategory === cat ? {
                background: "linear-gradient(135deg,rgba(0,255,255,0.2),rgba(139,92,246,0.4))",
                color:"#e0ffff", border:"1px solid rgba(0,255,255,0.5)",
                boxShadow:"0 0 20px rgba(0,255,255,0.2), 0 0 40px rgba(139,92,246,0.15)",
                padding:"8px 18px", borderRadius:12, fontSize:13, fontWeight:600, cursor:"pointer",
              } : {
                background:"rgba(0,255,255,0.03)", border:"1px solid rgba(0,255,255,0.1)",
                color:"#64748b", padding:"8px 18px", borderRadius:12, fontSize:13, fontWeight:500, cursor:"pointer",
                transition:"all 0.2s",
              }}>
              {cat}
            </button>
          ))}
        </div>

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
          </div>
        )}
        {error && <p style={{ textAlign:"center", color:"#475569", padding:"4rem 0" }}>Failed to load projects.</p>}

        {!loading && !error && (
          <>
            <AnimatePresence mode="popLayout">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
            </AnimatePresence>
            {filtered.length > 6 && (
              <div style={{ textAlign:"center", marginTop:"3rem" }}>
                <button onClick={() => setShowAll((s) => !s)} className="btn-secondary">
                  {showAll ? "Show Less" : `Show All (${filtered.length})`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}


