import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useFetch } from "../../hooks/useFetch";
import { fetchExperience } from "../../services/api";
import { personalInfo } from "../../data/experience";
import SectionHeader from "../ui/SectionHeader";
import profilePic from "../../assets/profile-pic.png";
import FloatingIcons from "../ui/FloatingIcons";

const STATS = [
  { value:"10+", label:"Projects",      color:"#60a5fa" },
  { value:"3+",  label:"Years",         color:"#a78bfa" },
  { value:"7+",  label:"Certs",         color:"#f472b6" },
  { value:"5+",  label:"Tech Stacks",   color:"#34d399" },
];

export default function About() {
  const { ref, isVisible } = useScrollReveal();
  const { data } = useFetch(fetchExperience);
  const education = data?.education || [];
  const certifications = data?.certifications || [];

  return (
    <section id="about" style={{ background:"linear-gradient(180deg,#020510 0%,#050816 100%)", position:"relative", overflow:"hidden" }}>
      <div aria-hidden="true" style={{ position:"absolute", top:"10%", left:"-8%", width:"35%", height:"50%", borderRadius:"50%", background:"radial-gradient(circle,rgba(59,130,246,0.07) 0%,transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />
      <FloatingIcons seed={2} count={10} opacity={0.1} />

      <div className="section-container">
        <div className="section-divider" />
        <SectionHeader label="About Me" title="Who I Am" subtitle="A full-stack developer who ships — from React frontends to Python APIs to cloud deployments." />

        <div ref={ref}>
          {/* Profile + bio row */}
          <div style={{ display:"flex", gap:"3rem", alignItems:"flex-start", marginBottom:"3rem", flexWrap:"wrap" }}>

            {/* Photo card */}
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={isVisible ? { opacity:1, scale:1 } : {}} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
              style={{ flexShrink:0, width:180 }}>
              <div style={{ position:"relative", marginBottom:"1rem" }}>
                <div style={{ position:"absolute", inset:-10, borderRadius:"50%", background:"linear-gradient(135deg,#3B82F6,#8B5CF6)", filter:"blur(18px)", opacity:0.22 }} />
                <img src={profilePic} alt={personalInfo.name}
                  style={{ position:"relative", width:180, height:180, objectFit:"cover", borderRadius:"50%", border:"3px solid rgba(139,92,246,0.6)" }}
                  loading="lazy" />
                <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", display:"flex", alignItems:"center", gap:4, padding:"3px 9px", borderRadius:999, fontSize:10, fontWeight:600, background:"rgba(5,8,22,0.92)", border:"1px solid rgba(74,222,128,0.3)", backdropFilter:"blur(12px)", color:"#4ade80", zIndex:10 }}>
                  <span style={{ width:5, height:5, borderRadius:"50%", background:"#4ade80", display:"inline-block" }} />
                  Available
                </div>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:"0.92rem", fontWeight:700, color:"#f1f5f9" }}>{personalInfo.name}</div>
                <div style={{ fontSize:"0.72rem", color:"#64748b", marginTop:2 }}>{personalInfo.title}</div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.article initial={{ opacity:0, x:24 }} animate={isVisible ? { opacity:1, x:0 } : {}} transition={{ duration:0.7, delay:0.1, ease:[0.22,1,0.36,1] }}
              style={{ flex:1, minWidth:280 }}>
              <p style={{ color:"#94a3b8", lineHeight:1.85, marginBottom:"0.9rem", fontSize:"0.95rem" }}>
                Passionate full-stack developer building production-grade web apps.
                Stack: <span style={{ color:"#60a5fa", fontWeight:500 }}>React</span> frontend,{" "}
                <span style={{ color:"#a78bfa", fontWeight:500 }}>Python / FastAPI</span> backend,{" "}
                <span style={{ color:"#34d399", fontWeight:500 }}>PostgreSQL / MongoDB</span> data.
              </p>
              <p style={{ color:"#64748b", lineHeight:1.85, marginBottom:"1.75rem", fontSize:"0.92rem" }}>
                Shipped college management systems, AI tools, crypto trackers, and more.
                Experienced with AWS (EC2, S3), REST API design, and modern deployment workflows.
              </p>

              {/* Stats row */}
              <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"1.75rem" }}>
                {STATS.map(({ value, label, color }, i) => (
                  <motion.div key={label}
                    initial={{ opacity:0, y:12 }} animate={isVisible ? { opacity:1, y:0 } : {}}
                    transition={{ delay:0.2 + i * 0.07 }}
                    style={{ textAlign:"center", padding:"0.9rem 1.1rem", borderRadius:"0.875rem", background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", minWidth:70 }}>
                    <div style={{ fontSize:"1.5rem", fontWeight:800, color, lineHeight:1 }}>{value}</div>
                    <div style={{ fontSize:"0.65rem", color:"#475569", marginTop:3, textTransform:"uppercase", letterSpacing:"0.1em" }}>{label}</div>
                  </motion.div>
                ))}
              </div>

              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize:"0.8rem", padding:"7px 16px" }}>GitHub</a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize:"0.8rem", padding:"7px 16px" }}>LinkedIn</a>
                <a href={personalInfo.resume} download className="btn-primary" style={{ fontSize:"0.8rem", padding:"7px 16px" }}>Download CV</a>
              </div>
            </motion.article>
          </div>

          {/* Education + Certs */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"2rem" }}>

            {/* Education timeline */}
            <motion.div initial={{ opacity:0, y:20 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ delay:0.3 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:"1.25rem" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                <span style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#60a5fa" }}>Education</span>
              </div>
              <div style={{ position:"relative", paddingLeft:"1.25rem" }}>
                <div style={{ position:"absolute", left:0, top:8, bottom:8, width:1, background:"linear-gradient(to bottom,#3B82F6,rgba(59,130,246,0.05))" }} />
                <div style={{ display:"flex", flexDirection:"column", gap:"0.9rem" }}>
                  {education.map((edu, i) => (
                    <motion.div key={edu.id}
                      initial={{ opacity:0, x:-12 }} animate={isVisible ? { opacity:1, x:0 } : {}}
                      transition={{ delay:0.35 + i * 0.1 }}
                      style={{ position:"relative" }}>
                      <div style={{ position:"absolute", left:"-1.5rem", top:8, width:7, height:7, borderRadius:"50%", background:"linear-gradient(135deg,#3B82F6,#8B5CF6)", boxShadow:"0 0 8px rgba(59,130,246,0.5)" }} />
                      <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"0.75rem", padding:"0.85rem 1rem" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                          <div>
                            <p style={{ fontSize:"0.82rem", fontWeight:600, color:"#e2e8f0", marginBottom:2 }}>{edu.degree}</p>
                            <p style={{ fontSize:"0.72rem", color:"#64748b" }}>{edu.institution}</p>
                          </div>
                          <span style={{ fontSize:"0.68rem", fontWeight:600, padding:"2px 8px", borderRadius:999, background:"rgba(59,130,246,0.1)", border:"1px solid rgba(59,130,246,0.2)", color:"#93c5fd", whiteSpace:"nowrap", flexShrink:0 }}>{edu.period}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div initial={{ opacity:0, y:20 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ delay:0.4 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:"1.25rem" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                <span style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#a78bfa" }}>Certifications</span>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                {certifications.map((cert, i) => (
                  <motion.div key={cert.id}
                    initial={{ opacity:0, x:12 }} animate={isVisible ? { opacity:1, x:0 } : {}}
                    transition={{ delay:0.4 + i * 0.06 }}
                    style={{ display:"flex", alignItems:"center", gap:9, padding:"0.65rem 0.9rem", borderRadius:"0.7rem", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ width:5, height:5, borderRadius:"50%", background:"linear-gradient(135deg,#8B5CF6,#EC4899)", flexShrink:0 }} />
                    <span style={{ fontSize:"0.78rem", fontWeight:500, color:"#cbd5e1", flex:1 }}>{cert.title}</span>
                    <span style={{ fontSize:"0.7rem", color:"#475569", flexShrink:0 }}>{cert.issuer}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

