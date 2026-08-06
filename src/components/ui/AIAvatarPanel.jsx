import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useVoice from "../../hooks/useVoice";

/* ─────────────────────────────────────────────────────────────
   AIAvatarPanel — Holographic AI avatar for Hero section
   • Animated orb with rotating rings & neural dots
   • Audio waveform bars that pulse when speaking
   • Subtitle strip (word-by-word reveal)
   • Play / Pause button
   • Auto-speaks intro on mount (1.5s delay)
───────────────────────────────────────────────────────────── */

const INTRO_TEXT =
  "Hi! I'm Abhinav Tripathi, a Full-Stack Developer specializing in React, Python, and AI-powered applications. I craft scalable web apps with pixel-perfect frontends and robust backends. Currently available for exciting opportunities. Feel free to ask me anything using the AI assistant below!";

// Neural network dot positions orbiting the orb
const NEURAL_DOTS = [
  { angle: 0,   radius: 72, size: 4,   delay: 0    },
  { angle: 45,  radius: 80, size: 3,   delay: 0.3  },
  { angle: 90,  radius: 68, size: 5,   delay: 0.6  },
  { angle: 135, radius: 78, size: 3,   delay: 0.9  },
  { angle: 180, radius: 70, size: 4,   delay: 1.2  },
  { angle: 225, radius: 82, size: 3,   delay: 1.5  },
  { angle: 270, radius: 66, size: 5,   delay: 1.8  },
  { angle: 315, radius: 76, size: 3,   delay: 2.1  },
];

// Waveform bar heights (base, animated when speaking)
const WAVE_BARS = 12;

export default function AIAvatarPanel() {
  const { speak, stopSpeaking, isSpeaking, supported } = useVoice();
  const [hasStarted, setHasStarted]   = useState(false);
  const [isPaused, setIsPaused]       = useState(false);
  const [subtitle, setSubtitle]       = useState("");
  const wordTimer    = useRef(null);
  const wordsArr     = useRef(INTRO_TEXT.split(" "));

  // ── Word-by-word subtitle reveal ──
  const startSubtitles = useCallback(() => {
    if (wordTimer.current) clearTimeout(wordTimer.current); // clear existing timer
    
    let idx = 0;
    const words = wordsArr.current;
    setSubtitle("");

    const tick = () => {
      if (idx >= words.length) return;
      
      // Use slice to guarantee exact string, avoiding double appends in strict mode
      setSubtitle(words.slice(0, idx + 1).join(" "));
      idx++;
      
      // ~280ms per word matches natural speech rate
      wordTimer.current = setTimeout(tick, 280);
    };
    tick();
  }, []);

  const stopSubtitles = useCallback(() => {
    if (wordTimer.current) {
      clearTimeout(wordTimer.current);
      wordTimer.current = null;
    }
  }, []);

  // ── Auto-play on mount (1.8s delay) or first interaction ──
  useEffect(() => {
    if (!supported.tts) return;

    let hasAttempted = false;

    const doSpeak = () => {
      if (hasAttempted) return;
      hasAttempted = true;
      setHasStarted(true);
      setIsPaused(false);
      setSubtitle("");

      speak(INTRO_TEXT, {
        rate: 0.92,
        pitch: 1.05,
        onEnd: () => setHasStarted(false),
      });
      startSubtitles();
    };

    const tryAutoPlay = () => {
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = doSpeak;
      } else {
        doSpeak();
      }
    };

    // Attempt 1: Try playing automatically after 1.8s
    const t = setTimeout(() => {
      tryAutoPlay();
    }, 1800);

    // Attempt 2: If browser blocked auto-play, catch the first interaction
    const onInteract = () => {
      if (!hasAttempted) tryAutoPlay();
    };

    ["click", "touchstart", "keydown", "scroll"].forEach((evt) =>
      window.addEventListener(evt, onInteract, { once: true, passive: true })
    );

    return () => {
      clearTimeout(t);
      stopSubtitles();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      ["click", "touchstart", "keydown", "scroll"].forEach((evt) =>
        window.removeEventListener(evt, onInteract)
      );
    };
  }, [speak, startSubtitles, stopSubtitles, supported.tts]);

  // ── Play / Pause toggle ──
  const handleToggle = () => {
    if (!hasStarted || isPaused) {
      // (Re)start
      stopSpeaking();
      stopSubtitles();
      setSubtitle("");
      setHasStarted(true);
      setIsPaused(false);
      speak(INTRO_TEXT, {
        rate: 0.92,
        pitch: 1.05,
        onEnd: () => setHasStarted(false),
      });
      startSubtitles();
    } else {
      // Pause
      stopSpeaking();
      stopSubtitles();
      setIsPaused(true);
    }
  };

  const isActive = isSpeaking;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        userSelect: "none",
        position: "relative",
      }}
    >
      {/* ── Status Badge ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 14px",
          borderRadius: 999,
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          background: "rgba(0,255,255,0.06)",
          border: "1px solid rgba(0,255,255,0.25)",
          color: "#67e8f9",
          backdropFilter: "blur(12px)",
        }}
      >
        <motion.span
          animate={{
            opacity: isActive ? [1, 0.3, 1] : 1,
            scale:   isActive ? [1, 0.6, 1] : 1,
          }}
          transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: isActive ? "#00ffff" : "#4ade80",
            display: "inline-block",
            boxShadow: isActive
              ? "0 0 8px #00ffff"
              : "0 0 6px rgba(74,222,128,0.6)",
          }}
        />
        {isActive ? "AI Speaking…" : isPaused ? "AI Paused" : "AI Assistant"}
      </motion.div>

      {/* ── Avatar Orb Container ── */}
      <div style={{ position: "relative", width: 200, height: 200 }}>
        {/* Outer ambient glow */}
        <motion.div
          animate={{
            opacity: isActive ? [0.3, 0.7, 0.3] : [0.15, 0.25, 0.15],
            scale:   isActive ? [1, 1.08, 1]    : [1, 1.02, 1],
          }}
          transition={{ duration: isActive ? 1.2 : 3, repeat: Infinity }}
          style={{
            position: "absolute",
            inset: -20,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,255,255,0.18) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)",
            filter: "blur(16px)",
            pointerEvents: "none",
          }}
        />

        {/* Ring 1 — slow rotate */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 10,
            borderRadius: "50%",
            border: "1px solid rgba(0,255,255,0.2)",
            borderTopColor: "rgba(0,255,255,0.7)",
          }}
        />

        {/* Ring 2 — counter-rotate */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 22,
            borderRadius: "50%",
            border: "1px solid rgba(139,92,246,0.25)",
            borderRightColor: "rgba(139,92,246,0.8)",
          }}
        />

        {/* Ring 3 — fast */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 34,
            borderRadius: "50%",
            border: "1px solid rgba(244,114,182,0.15)",
            borderBottomColor: "rgba(244,114,182,0.6)",
          }}
        />

        {/* Neural dots orbiting */}
        {NEURAL_DOTS.map((dot, i) => {
          const rad = (dot.angle * Math.PI) / 180;
          const cx  = 100 + Math.cos(rad) * dot.radius - dot.size / 2;
          const cy  = 100 + Math.sin(rad) * dot.radius - dot.size / 2;
          return (
            <motion.div
              key={i}
              animate={{
                opacity: isActive
                  ? [0.4, 1, 0.4]
                  : [0.15, 0.4, 0.15],
                scale: isActive ? [1, 1.4, 1] : 1,
              }}
              transition={{
                duration: isActive ? 0.8 : 2.5,
                delay: dot.delay,
                repeat: Infinity,
              }}
              style={{
                position: "absolute",
                left: cx,
                top: cy,
                width: dot.size,
                height: dot.size,
                borderRadius: "50%",
                background:
                  i % 3 === 0
                    ? "#00ffff"
                    : i % 3 === 1
                    ? "#a78bfa"
                    : "#f472b6",
                boxShadow:
                  i % 3 === 0
                    ? "0 0 6px rgba(0,255,255,0.8)"
                    : i % 3 === 1
                    ? "0 0 6px rgba(167,139,250,0.8)"
                    : "0 0 6px rgba(244,114,182,0.8)",
                pointerEvents: "none",
              }}
            />
          );
        })}

        {/* Core orb */}
        <motion.div
          animate={{
            scale:  isActive ? [1, 1.06, 1, 0.97, 1] : [1, 1.02, 1],
            boxShadow: isActive
              ? [
                  "0 0 30px rgba(0,255,255,0.5), 0 0 60px rgba(139,92,246,0.3), 0 0 90px rgba(244,114,182,0.15)",
                  "0 0 50px rgba(0,255,255,0.8), 0 0 90px rgba(139,92,246,0.5), 0 0 120px rgba(244,114,182,0.25)",
                  "0 0 30px rgba(0,255,255,0.5), 0 0 60px rgba(139,92,246,0.3), 0 0 90px rgba(244,114,182,0.15)",
                ]
              : [
                  "0 0 20px rgba(0,255,255,0.2), 0 0 40px rgba(139,92,246,0.15)",
                  "0 0 25px rgba(0,255,255,0.3), 0 0 50px rgba(139,92,246,0.2)",
                  "0 0 20px rgba(0,255,255,0.2), 0 0 40px rgba(139,92,246,0.15)",
                ],
          }}
          transition={{
            duration: isActive ? 1.0 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            inset: 48,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 38% 35%, rgba(0,255,255,0.9) 0%, rgba(139,92,246,0.7) 45%, rgba(244,114,182,0.5) 75%, rgba(2,5,16,0.95) 100%)",
            border: "1.5px solid rgba(0,255,255,0.5)",
            overflow: "hidden",
          }}
        >
          {/* Inner hologram scan line */}
          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{
              duration: isActive ? 0.8 : 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(0,255,255,0.8), transparent)",
              boxShadow: "0 0 8px rgba(0,255,255,0.6)",
              pointerEvents: "none",
            }}
          />

          {/* AI brain icon */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              animate={{
                filter: isActive
                  ? [
                      "drop-shadow(0 0 4px rgba(0,255,255,0.9))",
                      "drop-shadow(0 0 12px rgba(0,255,255,1))",
                      "drop-shadow(0 0 4px rgba(0,255,255,0.9))",
                    ]
                  : "drop-shadow(0 0 4px rgba(0,255,255,0.5))",
              }}
              transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
            >
              <path
                d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"
                stroke="rgba(0,255,255,0.9)"
                strokeWidth="1.2"
              />
              <path
                d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"
                stroke="rgba(167,139,250,0.9)"
                strokeWidth="1.2"
              />
            </motion.svg>
          </div>
        </motion.div>
      </div>

      {/* ── Waveform ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          height: 36,
        }}
      >
        {Array.from({ length: WAVE_BARS }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: isActive
                ? [
                    `${8 + Math.sin(i * 0.9) * 12}px`,
                    `${20 + Math.sin(i * 0.6 + 1) * 14}px`,
                    `${8 + Math.sin(i * 1.2 + 2) * 10}px`,
                    `${24 + Math.sin(i * 0.4 + 3) * 8}px`,
                    `${8 + Math.sin(i * 0.9) * 12}px`,
                  ]
                : "4px",
            }}
            transition={{
              duration: isActive ? 0.6 + (i % 4) * 0.1 : 0.3,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
              delay: i * 0.04,
            }}
            style={{
              width: 3,
              borderRadius: 2,
              background:
                i % 3 === 0
                  ? "linear-gradient(to top, #00ffff, rgba(0,255,255,0.3))"
                  : i % 3 === 1
                  ? "linear-gradient(to top, #a78bfa, rgba(167,139,250,0.3))"
                  : "linear-gradient(to top, #f472b6, rgba(244,114,182,0.3))",
              boxShadow: isActive
                ? i % 3 === 0
                  ? "0 0 6px rgba(0,255,255,0.5)"
                  : i % 3 === 1
                  ? "0 0 6px rgba(167,139,250,0.5)"
                  : "0 0 6px rgba(244,114,182,0.5)"
                : "none",
              minHeight: 4,
            }}
          />
        ))}
      </div>

      {/* ── Subtitle Strip ── */}
      <AnimatePresence mode="wait">
        {subtitle && (
          <motion.div
            key="subtitle"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            style={{
              width: "100%",
              maxWidth: 280,
              minHeight: 44,
              padding: "8px 14px",
              borderRadius: "0.75rem",
              background: "rgba(0,255,255,0.04)",
              border: "1px solid rgba(0,255,255,0.15)",
              backdropFilter: "blur(12px)",
              fontSize: "0.75rem",
              color: "#94a3b8",
              lineHeight: 1.55,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* scan overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,255,0.015) 3px, rgba(0,255,255,0.015) 4px)",
                pointerEvents: "none",
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>
              {subtitle}
              {isActive && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: "0.85em",
                    background: "#00ffff",
                    borderRadius: 1,
                    marginLeft: 2,
                    verticalAlign: "middle",
                  }}
                />
              )}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Play / Pause Button ── */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,255,0.3)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 22px",
          borderRadius: "0.875rem",
          border: "1px solid rgba(0,255,255,0.4)",
          background: isActive
            ? "linear-gradient(135deg, rgba(0,255,255,0.2), rgba(139,92,246,0.35))"
            : "rgba(0,255,255,0.06)",
          color: "#e0ffff",
          fontSize: "0.82rem",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: isActive
            ? "0 0 20px rgba(0,255,255,0.2)"
            : "0 0 10px rgba(0,255,255,0.05)",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
        aria-label={isActive ? "Pause AI voice" : "Play AI intro"}
      >
        {isActive ? (
          <>
            <PauseIcon /> Pause Voice
          </>
        ) : (
          <>
            <PlayIcon /> Play Intro
          </>
        )}
      </motion.button>

      {!supported.tts && (
        <p style={{ fontSize: "0.7rem", color: "#475569", textAlign: "center" }}>
          Voice not supported in this browser
        </p>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}
