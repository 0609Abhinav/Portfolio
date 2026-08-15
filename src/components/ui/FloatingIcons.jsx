import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import laptopManImg from "../../assets/programmer-sitting-with-laptop-bw-concept-spot-illustration-freelancer-2d-cartoon-flat-line-monochromatic-character-for-web-ui-design-editable-isolated-outline-hero-image-vector-removebg-preview.png";
import logoImg from "../../assets/logo.png";

const ALL_ICONS = [
  { id: "logo",     color: "#dc2626",  isLogo: true },
  { id: "react",    color: "#61DAFB",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1"><circle cx="12" cy="12" r="2.2"/><ellipse cx="12" cy="12" rx="10" ry="3.8"/><ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)"/></svg> },
  { id: "python",   color: "#3776AB",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2C8 2 6 4 6 7v2h6v1H5C3 10 2 11.5 2 14s1 4 3 4h2v-2.5c0-2 1.5-3.5 5-3.5s5 1.5 5 3.5V18h2c2 0 3-1.5 3-4s-1-4-3-4h-6V9h6V7c0-3-2-5-6-5z"/><circle cx="9" cy="7" r="1" fill="currentColor"/><circle cx="15" cy="17" r="1" fill="currentColor"/></svg> },
  { id: "node",     color: "#68A063",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2L3 7v10l9 5 9-5V7z"/><path d="M12 2v20M3 7l9 5 9-5"/></svg> },
  { id: "ts",       color: "#3178C6",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M14 10h-4v2h2v5M8 10v7"/></svg> },
  { id: "git",      color: "#F05032",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><path d="M8 6h6a2 2 0 0 1 2 2v4M6 8v8"/></svg> },
  { id: "db",       color: "#336791",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg> },
  { id: "mongo",    color: "#47A248",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2C8 2 5 8 5 12c0 3.5 2 6.5 5 7.5V22h4v-2.5c3-1 5-4 5-7.5 0-4-3-10-7-10z"/></svg> },
  { id: "docker",   color: "#2496ED",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M13 10h2V8h-2v2zm-3 0h2V8h-2v2zm-3 0h2V8H7v2zm6-3h2V5h-2v2zm-3 0h2V5h-2v2zM4 10h2V8H4v2z"/><path d="M21 10.5c-.4-.3-1.3-.4-2-.3-.1-.7-.6-1.3-1.3-1.7l-.4-.2-.3.4c-.3.5-.4 1.3-.3 1.9-.5-.3-1.5-.4-2.7-.4H2.5c-.3 1.5.1 3.5 1.2 4.8.9 1.1 2.3 1.7 4.1 1.7 3.9 0 6.8-1.8 8.2-5 .5 0 1.7 0 2.3-1.1l.1-.3-.4-.8z"/></svg> },
  { id: "cloud",    color: "#06B6D4",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg> },
  { id: "aws",      color: "#FF9900",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6.5 16.5c-2.5-1-4-3-4-5.5C2.5 7.5 5 5 8 5c.5 0 1 .1 1.5.2C10.5 3.3 12.2 2 14.5 2c3 0 5.5 2.5 5.5 5.5 0 .3 0 .6-.1.9C21.5 9.2 22 10.5 22 12c0 2.5-2 4.5-4.5 4.5"/><path d="M8 20l2-2 2 2 2-2 2 2"/></svg> },
  { id: "terminal", color: "#a78bfa",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M6 8l4 4-4 4M12 16h6"/></svg> },
  { id: "api",      color: "#8B5CF6",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="1.5" fill="currentColor"/><circle cx="16" cy="12" r="1.5" fill="currentColor"/><circle cx="10" cy="18" r="1.5" fill="currentColor"/></svg> },
  { id: "code",     color: "#f472b6",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { id: "ai",       color: "#e879f9",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg> },
  { id: "js",       color: "#F7DF1E",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 17c0 1.5 1 2 2 2s2-.5 2-2v-6M15 11h3M15 11v6c0 1 .5 2 2 2"/></svg> },
  { id: "graphql",  color: "#E10098",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7z"/><circle cx="12" cy="2" r="1.5"/><circle cx="20.66" cy="7" r="1.5"/><circle cx="20.66" cy="17" r="1.5"/><circle cx="12" cy="22" r="1.5"/><circle cx="3.34" cy="17" r="1.5"/><circle cx="3.34" cy="7" r="1.5"/><circle cx="12" cy="12" r="2"/></svg> },
  { id: "tailwind", color: "#38BDF8",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6.5 9C7.5 5.5 10 4 12 4c4 0 5 3 7.5 3-1 3.5-3.5 5-5.5 5-4 0-5-3-7.5-3z"/><path d="M2 15c1-3.5 3.5-5 5.5-5 4 0 5 3 7.5 3-1 3.5-3.5 5-5.5 5-4 0-5-3-7.5-3z"/></svg> },
  { id: "redis",    color: "#DC382D",  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="8" rx="9" ry="3"/><path d="M3 8v8c0 1.66 4.03 3 9 3s9-1.34 9-3V8"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg> },
  { id: "github",   color: "#94a3b8",  svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
];

/* 20 spread positions covering the full section */
const ZONES = [
  [2,14,4,22],[28,42,2,18],[60,72,4,20],[84,95,5,25],
  [2,10,30,50],[88,97,30,55],[18,32,55,72],[50,65,50,68],
  [78,92,55,75],[2,16,70,88],[30,48,78,92],[60,76,72,90],
  [84,96,70,88],[40,58,20,40],[10,24,42,60],[68,82,30,50],
  [2,12,55,70],[50,64,8,24],[76,90,10,28],[35,52,42,60],
];

function getPositions(count, seed) {
  return Array.from({ length: count }, (_, i) => {
    const z = ZONES[i % ZONES.length];
    const jx = ((seed * 13 + i * 29) % (z[1] - z[0]));
    const jy = ((seed * 7  + i * 17) % (z[3] - z[2]));
    return {
      x: `${z[0] + jx}%`,
      y: `${z[2] + jy}%`,
      delay: (i * 0.3 + seed * 0.15) % 4.5,
      dur:   5 + ((i * seed + 2) % 6),
      size:  28 + ((i + seed) % 18),
    };
  });
}

/* Laptop man with 3D mouse-tracking tilt */
function LaptopMan({ opacity }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let rafId = null;
    const onMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        el.style.transform = `perspective(600px) rotateY(${nx * 12}deg) rotateX(${-ny * 8}deg) translateY(${ny * -6}px) scale(1.02)`;
        rafId = null;
      });
    };
    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)";
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        right: "0%",
        bottom: "0%",
        width: "clamp(260px, 30vw, 420px)",
        pointerEvents: "none",
        zIndex: 0,
        transition: "transform 0.15s ease-out",
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
    >
      <img
        src={laptopManImg}
        alt=""
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
          opacity: opacity * 2.2,
          filter: "brightness(1.6) contrast(0.6) saturate(0) drop-shadow(0 0 40px rgba(139,92,246,0.35))",
        }}
      />
    </div>
  );
}

export default function FloatingIcons({ seed = 1, count = 18, opacity = 0.14 }) {
  const icons = ALL_ICONS.slice(0, Math.min(count, ALL_ICONS.length));
  const positions = getPositions(icons.length, seed);

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      <LaptopMan opacity={opacity} />

      {icons.map((icon, i) => {
        const pos = positions[i];
        return (
          <motion.div
            key={`${icon.id}-${seed}`}
            animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: pos.dur, delay: pos.delay, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              width: pos.size,
              height: pos.size,
              opacity: icon.isLogo ? opacity * 1.6 : opacity,
              color: icon.color,
              filter: `drop-shadow(0 0 6px ${icon.color}90)`,
            }}
          >
            {icon.isLogo
              ? <img src={logoImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              : icon.svg
            }
          </motion.div>
        );
      })}
    </div>
  );
}
