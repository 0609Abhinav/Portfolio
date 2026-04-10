import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useFetch } from "../../hooks/useFetch";
import { fetchSkills } from "../../services/api";
import SectionHeader from "../ui/SectionHeader";
import FloatingIcons from "../ui/FloatingIcons";

const TAB_ICONS = {
  frontend: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  backend:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="10" width="20" height="4" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/><circle cx="6" cy="5" r="0.8" fill="currentColor"/><circle cx="6" cy="12" r="0.8" fill="currentColor"/><circle cx="6" cy="19" r="0.8" fill="currentColor"/></svg>,
  database: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>,
  cloud:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  ai:       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
};

const LEVEL_COLORS = {
  high:   { bar: "linear-gradient(90deg,#3B82F6,#8B5CF6)", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)" },
  medium: { bar: "linear-gradient(90deg,#8B5CF6,#EC4899)", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)" },
  low:    { bar: "linear-gradient(90deg,#06B6D4,#3B82F6)", bg: "rgba(6,182,212,0.08)",  border: "rgba(6,182,212,0.2)"  },
};

function getLevel(n) {
  if (n >= 85) return "high";
  if (n >= 70) return "medium";
  return "low";
}

function SkillCard({ name, level, index }) {
  const { ref, isVisible } = useScrollReveal(0.05);
  const lv = getLevel(level);
  const colors = LEVEL_COLORS[lv];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: "1rem",
        padding: "1.1rem 1.25rem",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      whileHover={{ y: -3, boxShadow: `0 8px 30px ${colors.border}` }}
    >
      {/* Subtle glow top-right */}
      <div aria-hidden="true" style={{
        position: "absolute", top: -20, right: -20, width: 60, height: 60,
        borderRadius: "50%", background: colors.bar, opacity: 0.12, filter: "blur(20px)",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
        <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#e2e8f0" }}>{name}</span>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, background: colors.bar, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {level}%
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <motion.div
          style={{ height: "100%", borderRadius: 4, background: colors.bar }}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.1 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, isVisible } = useScrollReveal();
  const { data: categories } = useFetch(fetchSkills);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = categories || [];
  const active = tabs[activeTab];

  return (
    <section id="skills" style={{ background: "linear-gradient(180deg,#050816 0%,#020510 100%)", position: "relative", overflow: "hidden" }}>
      {/* Background accent */}
      <div aria-hidden="true" style={{ position:"absolute", top:"20%", right:"-10%", width:"40%", height:"60%", borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.06) 0%,transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />
      <FloatingIcons seed={3} count={10} opacity={0.1} />

      <div className="section-container">
        <div className="section-divider" />
        <SectionHeader label="Technical Skills" title="What I Work With" subtitle="My full-stack toolkit — from pixel-perfect UIs to scalable APIs and cloud infrastructure." />

        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>

          {/* Tab pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "2.5rem" }} role="tablist">
            {tabs.map((cat, i) => {
              const active_ = activeTab === i;
              return (
                <button key={cat.id} role="tab" aria-selected={active_} onClick={() => setActiveTab(i)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    padding: "9px 18px", borderRadius: 12, fontSize: "0.82rem", fontWeight: 600,
                    cursor: "pointer", transition: "all 0.2s",
                    ...(active_ ? {
                      background: "linear-gradient(135deg,#3B82F6,#8B5CF6)",
                      color: "#fff", border: "1px solid transparent",
                      boxShadow: "0 0 20px rgba(139,92,246,0.4)",
                    } : {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#64748b",
                    }),
                  }}>
                  {TAB_ICONS[cat.id]}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Skill cards grid */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div key={active.id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.875rem", alignContent: "start" }}>
                {active.skills.map((skill, i) => (
                  <SkillCard key={skill.name} {...skill} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

