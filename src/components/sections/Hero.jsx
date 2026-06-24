import { useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useTyping } from "../../hooks/useTyping";
import { personalInfo } from "../../data/experience";
import MagneticButton from "../ui/MagneticButton";
import ParticleField from "../ui/ParticleField";
import DesktopSetup from "../ui/DesktopSetup";
import AIAvatarPanel from "../ui/AIAvatarPanel";
import AITalkingAvatar from "../ui/AITalkingAvatar";

const ROLES = [
  "Full-Stack Developer",
  "React Engineer",
  "Python & Django Dev",
  "MERN Stack Developer",
  "AI/ML Engineer",
  "Prompt Engineer",
  "Angular Developer",
  "Backend API Developer",
  "Deep Learning Engineer",
  "PHP Developer",
  "Node.js Developer",
  "Computer Vision Engineer",
  "Next.js Developer",
  "Database Architect",
  "UI/UX Developer",
  "Open Source Contributor",
];

/* ── Floating dev tech icons in Hero background — no laptop man, no A logo ── */
const TECH_ICONS = [
  // Row 1 — top area
  { label: "Python",     x: "6%",  y: "10%", size: 32, delay: 0,    dur: 7,   svg: <svg viewBox="0 0 24 24" fill="none" stroke="#3776AB" strokeWidth="1.3"><path d="M12 2C8 2 6 4 6 7v2h6v1H5C3 10 2 11.5 2 14s1 4 3 4h2v-2.5c0-2 1.5-3.5 5-3.5s5 1.5 5 3.5V18h2c2 0 3-1.5 3-4s-1-4-3-4h-6V9h6V7c0-3-2-5-6-5z"/><circle cx="9" cy="7" r="1"/><circle cx="15" cy="17" r="1"/></svg> },
  { label: "React",      x: "45%", y: "5%",  size: 30, delay: 0.4,  dur: 8,   svg: <svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.1"><circle cx="12" cy="12" r="2.2"/><ellipse cx="12" cy="12" rx="10" ry="3.8"/><ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)"/></svg> },
  { label: "Cloud",      x: "88%", y: "8%",  size: 34, delay: 1.2,  dur: 7,   svg: <svg viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.3"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg> },
  // Row 2 — middle
  { label: "Node",       x: "3%",  y: "42%", size: 30, delay: 0.8,  dur: 9,   svg: <svg viewBox="0 0 24 24" fill="none" stroke="#68A063" strokeWidth="1.3"><path d="M12 2L3 7v10l9 5 9-5V7z"/><path d="M12 2v20M3 7l9 5 9-5"/></svg> },
  { label: "API",        x: "22%", y: "35%", size: 28, delay: 0.5,  dur: 8.5, svg: <svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.3"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="1.5" fill="#8B5CF6"/><circle cx="16" cy="12" r="1.5" fill="#8B5CF6"/><circle cx="10" cy="18" r="1.5" fill="#8B5CF6"/></svg> },
  { label: "TypeScript", x: "88%", y: "38%", size: 28, delay: 1.6,  dur: 7.5, svg: <svg viewBox="0 0 24 24" fill="none" stroke="#3178C6" strokeWidth="1.3"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M14 10h-4v2h2v5M8 10v7"/></svg> },
  { label: "Database",   x: "94%", y: "55%", size: 30, delay: 2,    dur: 6.5, svg: <svg viewBox="0 0 24 24" fill="none" stroke="#336791" strokeWidth="1.3"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg> },
  // Row 3 — lower
  { label: "Terminal",   x: "8%",  y: "75%", size: 30, delay: 1.8,  dur: 7,   svg: <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.3"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M6 8l4 4-4 4M12 16h6"/></svg> },
  { label: "Git",        x: "30%", y: "88%", size: 28, delay: 2.2,  dur: 6,   svg: <svg viewBox="0 0 24 24" fill="none" stroke="#F05032" strokeWidth="1.3"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><path d="M8 6h6a2 2 0 0 1 2 2v4M6 8v8"/></svg> },
  { label: "Docker",     x: "55%", y: "82%", size: 30, delay: 3,    dur: 6,   svg: <svg viewBox="0 0 24 24" fill="none" stroke="#2496ED" strokeWidth="1.3"><path d="M13 10h2V8h-2v2zm-3 0h2V8h-2v2zm-3 0h2V8H7v2zm6-3h2V5h-2v2zm-3 0h2V5h-2v2zM4 10h2V8H4v2z"/><path d="M21 10.5c-.4-.3-1.3-.4-2-.3-.1-.7-.6-1.3-1.3-1.7l-.4-.2-.3.4c-.3.5-.4 1.3-.3 1.9-.5-.3-1.5-.4-2.7-.4H2.5c-.3 1.5.1 3.5 1.2 4.8.9 1.1 2.3 1.7 4.1 1.7 3.9 0 6.8-1.8 8.2-5 .5 0 1.7 0 2.3-1.1l.1-.3-.4-.8z"/></svg> },
  { label: "AWS",        x: "78%", y: "85%", size: 28, delay: 1,    dur: 8,   svg: <svg viewBox="0 0 24 24" fill="none" stroke="#FF9900" strokeWidth="1.3"><path d="M6.5 16.5c-2.5-1-4-3-4-5.5C2.5 7.5 5 5 8 5c.5 0 1 .1 1.5.2C10.5 3.3 12.2 2 14.5 2c3 0 5.5 2.5 5.5 5.5 0 .3 0 .6-.1.9C21.5 9.2 22 10.5 22 12c0 2.5-2 4.5-4.5 4.5"/><path d="M8 20l2-2 2 2 2-2 2 2"/></svg> },
  { label: "MongoDB",    x: "93%", y: "78%", size: 26, delay: 1.4,  dur: 9,   svg: <svg viewBox="0 0 24 24" fill="none" stroke="#47A248" strokeWidth="1.3"><path d="M12 2C8 2 5 8 5 12c0 3.5 2 6.5 5 7.5V22h4v-2.5c3-1 5-4 5-7.5 0-4-3-10-7-10z"/></svg> },
  // AI / extra
  { label: "AI",         x: "18%", y: "62%", size: 28, delay: 2.8,  dur: 7.5, svg: <svg viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="1.3"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg> },
  { label: "Code",       x: "68%", y: "55%", size: 26, delay: 0.3,  dur: 10,  svg: <svg viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="1.3"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
];

export default function Hero() {
  const typedRole  = useTyping(ROLES);
  const sectionRef = useRef(null);
  const textRef    = useRef(null);
  const imgRef     = useRef(null);

  // GSAP intro timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".h-badge",    { opacity: 0, y: 24, duration: 0.7 })
        .from(".h-name",     { opacity: 0, y: 50, duration: 0.8 }, "-=0.4")
        .from(".h-role",     { opacity: 0, y: 24, duration: 0.6 }, "-=0.4")
        .from(".h-bio",      { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".h-ctas > *", { opacity: 0, y: 16, stagger: 0.1, duration: 0.5 }, "-=0.3")
        .from(".h-social",   { opacity: 0, x: -16, stagger: 0.08, duration: 0.4 }, "-=0.3")
        .from(imgRef.current,    { opacity: 0, scale: 0.88, duration: 1, ease: "back.out(1.6)" }, 0.3)
        .from(".tech-icon",  { opacity: 0, scale: 0, stagger: 0.06, duration: 0.5, ease: "back.out(2)" }, 0.6);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth  - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      gsap.to(textRef.current,   { x: nx *   6, y: ny *   3, duration: 2.2, ease: "power2.out" });
      gsap.to(imgRef.current,    { x: nx *  10, y: ny *   5, duration: 1.8, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={sectionRef} id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg,#020510 0%,#050816 60%,#0a0520 100%)" }}>

      {/* ── Layer 0: Particle canvas ── */}
      <ParticleField />

      {/* ── Layer 1: Floating dev tech icons ── */}
      {TECH_ICONS.map(({ label, x, y, size, delay, dur, svg }) => (
        <motion.div
          key={label}
          className="tech-icon"
          aria-hidden="true"
          animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", left: x, top: y,
            width: size, height: size,
            opacity: 0.18,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {svg}
        </motion.div>
      ))}

      {/* ── Layer 2: Ambient color bleeds ── */}
      <div aria-hidden="true" style={{ position:"absolute", top:"0%", left:"-10%", width:"50%", height:"70%", borderRadius:"50%", background:"radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%)", filter:"blur(100px)", pointerEvents:"none", zIndex:1 }} />
      <div aria-hidden="true" style={{ position:"absolute", bottom:"0%", right:"-5%", width:"45%", height:"60%", borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 70%)", filter:"blur(100px)", pointerEvents:"none", zIndex:1 }} />
      <div aria-hidden="true" style={{ position:"absolute", top:"30%", right:"20%", width:"30%", height:"40%", borderRadius:"50%", background:"radial-gradient(circle,rgba(236,72,153,0.05) 0%,transparent 70%)", filter:"blur(80px)", pointerEvents:"none", zIndex:1 }} />

      {/* ── Layer 4: Main content ── */}
      <div className="section-container w-full pt-20 relative" style={{ zIndex: 4 }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* LEFT — text */}
          <div ref={textRef} className="flex-1 max-w-xl text-center lg:text-left" style={{ willChange: "transform" }}>

            <div className="h-badge inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.18em] uppercase"
              style={{ background:"rgba(0,255,255,0.06)", border:"1px solid rgba(0,255,255,0.25)", color:"#67e8f9", boxShadow:"0 0 20px rgba(0,255,255,0.08)" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#00ffff", display:"inline-block", animation:"hpulse 2s infinite", boxShadow:"0 0 8px #00ffff" }} />
              Available for opportunities
            </div>

            <h1 className="h-name font-black tracking-tight mb-5"
              style={{ fontSize:"clamp(3.2rem,7vw,5.8rem)", lineHeight:1.0 }}>
              <span style={{ display:"block", color:"#f1f5f9" }}>Abhinav</span>
              <span style={{ display:"block", background:"linear-gradient(135deg,#00ffff 0%,#a78bfa 45%,#f472b6 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", filter:"drop-shadow(0 0 20px rgba(0,255,255,0.3))" }}>
                Tripathi
              </span>
            </h1>

            <div className="h-role flex items-center gap-2 justify-center lg:justify-start mb-5"
              style={{ fontSize:"clamp(1.05rem,2.2vw,1.4rem)" }} aria-live="polite">
              <span style={{ color:"#94a3b8", fontWeight:500 }}>{typedRole}</span>
              <span className="typing-cursor" />
            </div>

            <p className="h-bio mb-10 mx-auto lg:mx-0"
              style={{ color:"#475569", fontSize:"1rem", lineHeight:1.85, maxWidth:"460px" }}>
              I craft scalable web applications — pixel-perfect React frontends,
              robust Python backends, and AI-powered tools. Clean code. Shipped fast.
            </p>

            <div className="h-ctas flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              <MagneticButton>
                <Link to="projects" smooth duration={700} offset={-64}>
                  <button className="btn-primary" style={{ fontSize:"0.92rem" }}>
                    View My Work
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="contact" smooth duration={700} offset={-64}>
                  <button className="btn-secondary" style={{ fontSize:"0.92rem" }}>Hire Me</button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a href={personalInfo.resume} download className="btn-secondary" style={{ fontSize:"0.92rem" }}>Download CV</a>
              </MagneticButton>
            </div>

            <div className="flex items-center gap-5 justify-center lg:justify-start flex-wrap">
              <MagneticButton strength={0.5}>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                  className="h-social" style={{ color:"#334155", transition:"color 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.color="#e2e8f0"}
                  onMouseLeave={e=>e.currentTarget.style.color="#334155"}
                  aria-label="GitHub"><GitHubIcon /></a>
              </MagneticButton>
              <MagneticButton strength={0.5}>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                  className="h-social" style={{ color:"#334155", transition:"color 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.color="#60a5fa"}
                  onMouseLeave={e=>e.currentTarget.style.color="#334155"}
                  aria-label="LinkedIn"><LinkedInIcon /></a>
              </MagneticButton>
              <div style={{ width:1, height:28, background:"rgba(255,255,255,0.07)" }} aria-hidden="true" />
              {[{v:"10+",l:"Projects"},{v:"3+",l:"Years"},{v:"7+",l:"Certs"}].map(({v,l})=>(
                <div key={l} className="h-social text-center">
                  <div style={{ fontSize:"1.05rem", fontWeight:800, background:"linear-gradient(135deg,#00ffff,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", lineHeight:1, filter:"drop-shadow(0 0 6px rgba(0,255,255,0.4))" }}>{v}</div>
                  <div style={{ fontSize:"9px", color:"#334155", marginTop:2, textTransform:"uppercase", letterSpacing:"0.12em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — AI Talking Avatar + Holographic Orb + 3D Desktop */}
          <div ref={imgRef} className="flex-shrink-0 relative hidden lg:flex flex-col items-center gap-6" style={{ willChange:"transform", zIndex:5 }}>
            {/* Realistic HeyGen talking avatar */}
            <AITalkingAvatar />
            {/* Holographic AI orb (unchanged) */}
            <AIAvatarPanel />
            {/* 3D Desktop Setup */}
            <DesktopSetup />
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }} aria-hidden="true">
          <span style={{ fontSize:9, color:"#1e293b", letterSpacing:"0.25em", textTransform:"uppercase" }}>scroll</span>
          <motion.div animate={{scaleY:[1,0.3,1],opacity:[0.3,1,0.3]}} transition={{duration:2,repeat:Infinity,ease:"easeInOut"}}
            style={{ width:1, height:36, background:"linear-gradient(to bottom,#00ffff,transparent)", transformOrigin:"top", boxShadow:"0 0 8px rgba(0,255,255,0.5)" }} />
        </div>
      </div>

      <style>{`@keyframes hpulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.7)}}`}</style>
    </section>
  );
}

function GitHubIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
}
function LinkedInIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}
