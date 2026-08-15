import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTilt } from "../../hooks/useTilt";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import SectionHeader from "../ui/SectionHeader";
import FloatingIcons from "../ui/FloatingIcons";

const AI_TOOLS = [
  {
    name: "Kiro",
    tagline: "AI IDE",
    category: "IDE",
    usage: "Architecture planning, code generation, full-stack scaffolding with context-aware AI",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg,#8B5CF6,#6366f1)",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  },
  {
    name: "Claude",
    tagline: "Anthropic",
    category: "LLM",
    usage: "Complex reasoning, architecture decisions, code review, and long-context analysis",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg,#F59E0B,#f97316)",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  },
  {
    name: "ChatGPT",
    tagline: "OpenAI",
    category: "LLM",
    usage: "Rapid prototyping, debugging sessions, documentation drafts, and quick lookups",
    color: "#10B981",
    gradient: "linear-gradient(135deg,#10B981,#059669)",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    name: "Cursor",
    tagline: "AI Editor",
    category: "IDE",
    usage: "Inline completions, multi-file refactoring, and codebase-aware chat",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg,#3B82F6,#06B6D4)",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    name: "GitHub Copilot",
    tagline: "Pair Programmer",
    category: "Autocomplete",
    usage: "Real-time autocomplete, test generation, and boilerplate elimination",
    color: "#EC4899",
    gradient: "linear-gradient(135deg,#EC4899,#8B5CF6)",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
  },
  {
    name: "Perplexity",
    tagline: "AI Search",
    category: "Research",
    usage: "Real-time research, documentation lookup, tech comparisons with citations",
    color: "#06B6D4",
    gradient: "linear-gradient(135deg,#06B6D4,#3B82F6)",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  },
];

const CATEGORY_COLORS = {
  IDE: "#8B5CF6",
  LLM: "#F59E0B",
  Autocomplete: "#EC4899",
  Research: "#06B6D4",
};

function AICard({ tool, index, isActive, onClick }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(6, 10);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        cursor: "pointer",
        willChange: "transform",
        overflow: "hidden",
        background: isActive
          ? `linear-gradient(135deg, ${tool.color}18, ${tool.color}08)`
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${isActive ? tool.color + "50" : "rgba(255,255,255,0.07)"}`,
        boxShadow: isActive ? `0 0 20px ${tool.color}15, 0 8px 24px rgba(0,0,0,0.3)` : "none",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Gradient top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: isActive ? tool.gradient : "transparent",
        transition: "background 0.3s",
        borderRadius: "1.25rem 1.25rem 0 0",
      }} />

      {/* Glow blob */}
      <div aria-hidden="true" style={{
        position: "absolute", top: -40, right: -40, width: 120, height: 120,
        borderRadius: "50%", background: tool.color, opacity: isActive ? 0.1 : 0.04,
        filter: "blur(40px)", transition: "opacity 0.3s",
      }} />

      <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        {/* Icon box */}
        <div style={{
          width: 48, height: 48, borderRadius: "0.875rem", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `${tool.color}15`,
          border: `1px solid ${tool.color}30`,
          color: tool.color,
          boxShadow: isActive ? `0 0 20px ${tool.color}30` : "none",
          transition: "box-shadow 0.3s",
        }}>
          {tool.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9" }}>{tool.name}</span>
            <span style={{
              fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 999,
              background: `${CATEGORY_COLORS[tool.category]}15`,
              border: `1px solid ${CATEGORY_COLORS[tool.category]}30`,
              color: CATEGORY_COLORS[tool.category],
              textTransform: "uppercase", letterSpacing: "0.08em",
            }}>{tool.category}</span>
            <span style={{ fontSize: 10, color: "#475569", marginLeft: "auto" }}>{tool.tagline}</span>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.6 }}>{tool.usage}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AITools() {
  const { ref, isVisible } = useScrollReveal();
  const [active, setActive] = useState(null);

  return (
    <section id="ai-tools" style={{ background: "linear-gradient(180deg,#050816 0%,#020510 100%)", position: "relative", overflow: "hidden" }}>
      <FloatingIcons seed={6} count={18} opacity={0.1} />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-divider" />
        <SectionHeader
          label="AI Workflow"
          title="AI Tools I Work With"
          subtitle="Integrating AI into every stage of development — from ideation to deployment."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}
        >
          {AI_TOOLS.map((tool, i) => (
            <AICard
              key={tool.name}
              tool={tool}
              index={i}
              isActive={active === tool.name}
              onClick={() => setActive(active === tool.name ? null : tool.name)}
            />
          ))}
        </motion.div>

        {/* Active tool detail */}
        <AnimatePresence>
          {active && (() => {
            const tool = AI_TOOLS.find(t => t.name === active);
            return (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.35 }}
                style={{ marginTop: "1.5rem", overflow: "hidden" }}
              >
                <div style={{
                  padding: "1.5rem 2rem",
                  borderRadius: "1.25rem",
                  background: `linear-gradient(135deg, ${tool.color}10, rgba(255,255,255,0.02))`,
                  border: `1px solid ${tool.color}30`,
                  display: "flex", alignItems: "center", gap: "1.5rem",
                }}>
                  <div style={{ color: tool.color, flexShrink: 0 }}>{tool.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>
                      {tool.name} — {tool.tagline}
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.7 }}>{tool.usage}</p>
                  </div>
                  <button onClick={() => setActive(null)}
                    style={{ marginLeft: "auto", color: "#475569", background: "none", border: "none", cursor: "pointer", fontSize: 18, flexShrink: 0 }}>✕</button>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}
