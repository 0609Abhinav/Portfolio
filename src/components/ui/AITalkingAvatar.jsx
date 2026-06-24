import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   AITalkingAvatar — Local Video Player for Hero Section
   ─ Plays a pre-generated HeyGen video locally (zero API costs, 
     instant load, 100% reliable).
   ─ Auto-plays intro (muted by default, tap to unmute)
   ─ Word-by-word subtitles synced to speaking pace
   ─ Controls: Replay · Mute/Unmute
   
   Setup:
     Generate your intro video on app.heygen.com, download it,
     and save it as `public/avatar.mp4`.
─────────────────────────────────────────────────────────────────── */

const INTRO_TEXT =
  "Hi, I'm Abhinav Tripathi — a Full-Stack Developer who builds scalable web apps " +
  "with React, Python, and AI. I specialize in pixel-perfect frontends, " +
  "robust backends, and intelligent features that solve real problems. " +
  "I'm currently open to exciting opportunities. " +
  "Explore my projects or ask my AI assistant anything about my work!";

export default function AITalkingAvatar() {
  const videoRef = useRef(null);
  
  const [phase, setPhase]           = useState("idle");
  const [subtitle, setSubtitle]     = useState("");
  const [isMuted, setIsMuted]       = useState(true);
  const [showUnmute, setShowUnmute] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isPlaying, setIsPlaying]   = useState(false);

  // Simple subtitle logic based on time
  const words = INTRO_TEXT.split(/\s+/);
  const wordsPerSecond = 2.4; // approximate talking speed

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      if (time > 0) {
        setPhase("speaking");
        const wordIndex = Math.min(Math.floor(time * wordsPerSecond), words.length - 1);
        setSubtitle(words.slice(0, wordIndex + 1).join(" "));
      }
    };

    const handleEnded = () => {
      setPhase("ready");
      setIsPlaying(false);
      setSubtitle("");
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowUnmute(isMuted);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setPhase("ready");
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [words, isMuted]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      setShowUnmute(false);
    }
  };

  const replay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play().catch(() => {});
    }
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
              background: hasVideoError ? "#f87171"
                        : phase === "speaking" ? "#4ade80"
                        : "#94a3b8",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: "0.65rem", color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {hasVideoError ? "Video Missing"
           : phase === "speaking" ? "Speaking"
           : "Ready"}
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

      {/* ── Video frame ── */}
      <div style={{
        position: "relative", margin: "0 10px", borderRadius: "0.9rem", overflow: "hidden",
        aspectRatio: "9/13",
        background: "rgba(0,0,0,0.5)",
        border: "1px solid rgba(0,255,255,0.08)",
      }}>
        {hasVideoError && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 14,
            background: "rgba(2,5,16,0.95)",
            zIndex: 3, padding: "0 20px", textAlign: "center"
          }}>
            <span style={{ fontSize: "1.5rem" }}>🎥</span>
            <p style={{ fontSize: "0.7rem", color: "#e2e8f0", lineHeight: 1.5 }}>
              Generate your intro video on HeyGen, download it as <b>avatar.mp4</b>, and save it in the <b>public/</b> folder.
            </p>
          </div>
        )}

        <video
          ref={videoRef}
          src="/avatar.mp4"
          autoPlay
          playsInline
          muted={isMuted}
          onError={() => setHasVideoError(true)}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            display: hasVideoError ? "none" : "block",
          }}
        />

        {/* "Tap to unmute" overlay */}
        <AnimatePresence>
          {isPlaying && isMuted && showUnmute && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => { toggleMute(); setShowUnmute(false); }}
              style={{
                position: "absolute", bottom: 10, left: "50%",
                transform: "translateX(-50%)",
                padding: "5px 14px", borderRadius: 999,
                border: "1px solid rgba(0,255,255,0.4)",
                background: "rgba(2,5,16,0.85)",
                backdropFilter: "blur(8px)",
                color: "#67e8f9", fontSize: "0.68rem",
                fontWeight: 600, cursor: "pointer",
                whiteSpace: "nowrap", touchAction: "manipulation",
                zIndex: 5,
              }}
            >
              🔊 Tap to hear
            </motion.button>
          )}
        </AnimatePresence>

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
          {phase === "speaking" && !isMuted && (
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
          disabled={hasVideoError}
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
          <span style={{ fontSize: "0.62rem", fontWeight: 600 }}>{isPlaying ? "Pause" : "Play"}</span>
        </ControlBtn>

        {/* Replay */}
        <ControlBtn
          title="Replay intro"
          onClick={replay}
          disabled={hasVideoError}
          active={false}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.49"/>
          </svg>
          <span style={{ fontSize: "0.62rem", fontWeight: 600 }}>Replay</span>
        </ControlBtn>

        {/* Mute / Unmute */}
        <ControlBtn
          title={isMuted ? "Unmute" : "Mute"}
          onClick={toggleMute}
          disabled={hasVideoError}
          active={!isMuted}
        >
          {isMuted ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          )}
          <span style={{ fontSize: "0.62rem", fontWeight: 600 }}>
            {isMuted ? "Unmute" : "Mute"}
          </span>
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

