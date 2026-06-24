import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profilePic from "../../assets/profile-pic.png";

/* ─────────────────────────────────────────────────────────────────
   AITalkingAvatar — Free "Audio Link" Version
   ─ Uses the browser's built-in Web Speech API (100% free forever)
   ─ Displays the user's profile picture with a subtle pulse/breathing
     animation while speaking.
   ─ Uses `onboundary` event for exact word-by-word subtitle sync!
   ─ Controls: Play/Pause, Replay
   ─ Premium glassmorphism UI matching the futuristic theme.
─────────────────────────────────────────────────────────────────── */

const INTRO_TEXT =
  "Hi, I'm Abhinav Tripathi — a Full-Stack Developer who builds scalable web apps " +
  "with React, Python, and AI. I specialize in pixel-perfect frontends, " +
  "robust backends, and intelligent features that solve real problems. " +
  "I'm currently open to exciting opportunities. " +
  "Explore my projects or ask my AI assistant anything about my work!";

export default function AITalkingAvatar() {
  const [phase, setPhase]           = useState("ready"); // ready | speaking
  const [subtitle, setSubtitle]     = useState("");
  const [isPlaying, setIsPlaying]   = useState(false);
  const utteranceRef                = useRef(null);
  const wordsRef                    = useRef(INTRO_TEXT.split(" "));

  // Ensure speech synthesis is stopped on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const initUtterance = () => {
    window.speechSynthesis.cancel(); // clear queue
    const utterance = new SpeechSynthesisUtterance(INTRO_TEXT);
    
    // Pick a good English voice (preferably male/professional if available)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en-') && (v.name.includes('Male') || v.name.includes('Google') || v.name.includes('Microsoft')));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.rate = 0.95; // Slightly slower for better pacing
    utterance.pitch = 1.0;

    // EXACT word-by-word sync
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const textUntilNow = INTRO_TEXT.slice(0, event.charIndex + event.charLength);
        setSubtitle(textUntilNow);
      }
    };

    utterance.onstart = () => {
      setPhase("speaking");
      setIsPlaying(true);
      setSubtitle(""); // Will be populated by onboundary
    };

    utterance.onend = () => {
      setPhase("ready");
      setIsPlaying(false);
      setSubtitle("");
    };

    utterance.onerror = (e) => {
      if (e.error !== "canceled") {
        console.error("SpeechSynthesis Error:", e);
        setPhase("ready");
        setIsPlaying(false);
      }
    };

    utteranceRef.current = utterance;
    return utterance;
  };

  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setPhase("ready");
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        setPhase("speaking");
      } else {
        const u = initUtterance();
        window.speechSynthesis.speak(u);
      }
    }
  };

  const replay = () => {
    const u = initUtterance();
    window.speechSynthesis.speak(u);
  };

  /* ─────────────────────────────────────────────────────────── */
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative",
        width: 270,
        borderRadius: "1.25rem",
        border: "1px solid rgba(0,255,255,0.2)",
        background: "rgba(2,5,16,0.88)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow:
          "0 0 40px rgba(0,255,255,0.1), 0 0 80px rgba(139,92,246,0.08), 0 20px 60px rgba(0,0,0,0.7)",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Hologram grid */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit",
          backgroundImage:
            "linear-gradient(rgba(0,255,255,0.025) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(0,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Animated border glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        aria-hidden
        style={{
          position: "absolute", inset: -1, borderRadius: "1.25rem",
          background: "linear-gradient(135deg, rgba(0,255,255,0.15), rgba(139,92,246,0.12), rgba(0,255,255,0.08))",
          pointerEvents: "none",
        }}
      />

      {/* ── Status badge ── */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: "10px 14px 6px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <motion.span
            animate={{ opacity: phase === "speaking" ? [1, 0.3, 1] : 1,
                       scale:   phase === "speaking" ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: phase === "speaking" ? "#4ade80" : "#94a3b8",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: "0.65rem", color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {phase === "speaking" ? "Audio Link Active" : "Comms Ready"}
          </span>
        </div>

        {/* Live tag */}
        {phase === "speaking" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: "2px 8px", borderRadius: 999,
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.4)",
              fontSize: "0.58rem", color: "#fca5a5",
              fontWeight: 700, letterSpacing: "0.12em",
            }}
          >
            ● LIVE
          </motion.div>
        )}
      </div>

      {/* ── Image frame ── */}
      <div style={{
        position: "relative", margin: "0 10px", borderRadius: "0.9rem", overflow: "hidden",
        aspectRatio: "9/13",
        background: "rgba(0,0,0,0.5)",
        border: "1px solid rgba(0,255,255,0.08)",
      }}>
        
        {/* Subtle breathing effect when speaking */}
        <motion.img
          src={profilePic}
          alt="Abhinav Tripathi"
          animate={{
             scale: phase === "speaking" ? [1, 1.03, 1] : 1,
             filter: phase === "speaking" ? ["brightness(1)", "brightness(1.1)", "brightness(1)"] : "brightness(1)"
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            display: "block",
            transformOrigin: "center center"
          }}
        />

        {/* Hologram scanline overlay */}
        {phase === "speaking" && (
          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute", left: 0, right: 0, height: "15%",
              background: "linear-gradient(to bottom, transparent, rgba(0,255,255,0.2), transparent)",
              pointerEvents: "none", zIndex: 3
            }}
          />
        )}

        {/* Subtitle strip */}
        <AnimatePresence>
          {subtitle && phase === "speaking" && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "30px 10px 8px",
                background: "linear-gradient(transparent, rgba(2,5,16,0.95) 60%)",
                fontSize: "0.72rem", lineHeight: 1.45,
                color: "#e2e8f0", textAlign: "center",
                zIndex: 4,
                textShadow: "0 1px 2px rgba(0,0,0,0.8)"
              }}
            >
              {subtitle}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Waveform bars */}
        <AnimatePresence>
          {phase === "speaking" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute", top: 8, right: 8,
                display: "flex", gap: 2, alignItems: "center", height: 18,
                zIndex: 5,
              }}
            >
              {[0.4, 0.7, 1.0, 0.7, 0.4].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [h * 0.3, h, h * 0.3] }}
                  transition={{ duration: 0.5, delay: i * 0.09, repeat: Infinity }}
                  style={{
                    width: 2, height: 14, borderRadius: 2,
                    background: "rgba(0,255,255,0.7)",
                    transformOrigin: "center",
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Name label ── */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: "8px 14px 4px",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "linear-gradient(135deg, #00ffff, #a78bfa)",
          flexShrink: 0,
        }} />
        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#e2e8f0" }}>
          Abhinav Tripathi
        </span>
        <span style={{ fontSize: "0.6rem", color: "#00ffff", opacity: 0.65 }}>
          · Digital Twin
        </span>
      </div>

      {/* ── Controls ── */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: "6px 14px 12px",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        {/* Play/Pause */}
        <ControlBtn
          title={isPlaying ? "Pause" : "Play"}
          onClick={togglePlay}
          active={isPlaying}
        >
          {isPlaying ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          )}
          <span style={{ fontSize: "0.62rem", fontWeight: 600 }}>{isPlaying ? "Pause" : "Listen"}</span>
        </ControlBtn>

        {/* Replay */}
        <ControlBtn
          title="Replay intro"
          onClick={replay}
          active={false}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.49"/>
          </svg>
          <span style={{ fontSize: "0.62rem", fontWeight: 600 }}>Replay</span>
        </ControlBtn>
      </div>
    </motion.div>
  );
}

/* ── Control Button ─────────────────────────────────────────── */
function ControlBtn({ children, onClick, disabled, active, title }) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={disabled ? undefined : onClick}
      title={title}
      style={{
        display: "flex", alignItems: "center", gap: 4,
        padding: "4px 10px", borderRadius: 999,
        border: `1px solid ${active ? "rgba(0,255,255,0.5)" : "rgba(0,255,255,0.15)"}`,
        background: active ? "rgba(0,255,255,0.12)" : "rgba(0,255,255,0.04)",
        color: disabled ? "#334155" : active ? "#00ffff" : "#64748b",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "0.7rem", fontWeight: 500,
        touchAction: "manipulation",
        transition: "all 0.2s",
        flexShrink: 0,
      }}
    >
      {children}
    </motion.button>
  );
}


