import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   AITalkingAvatar — HeyGen Streaming Avatar for Hero Section
   ─ WebRTC connection to HeyGen's avatar servers
   ─ Auto-plays intro (muted by default, tap to unmute)
   ─ Word-by-word subtitles synced to speaking pace
   ─ Controls: Replay · Mute/Unmute · Stop
   ─ Glassmorphism card, futuristic cyan/purple theme
   ─ Falls back to a setup card if API key is not configured
   
   Setup:
     Add to your .env.local file:
       REACT_APP_HEYGEN_API_KEY=your_api_key_here
       REACT_APP_HEYGEN_AVATAR_ID=Wayne_20240711
─────────────────────────────────────────────────────────────────── */

const HEYGEN_API  = "https://api.heygen.com";
const DEFAULT_AID = "Wayne_20240711";          // Professional male avatar
const WPM         = 140;                       // Subtitle sync: words per minute
const MS_PER_WORD = (60 / WPM) * 1000;

const INTRO_TEXT =
  "Hi, I'm Abhinav Tripathi — a Full-Stack Developer who builds scalable web apps " +
  "with React, Python, and AI. I specialize in pixel-perfect frontends, " +
  "robust backends, and intelligent features that solve real problems. " +
  "I'm currently open to exciting opportunities. " +
  "Explore my projects or ask my AI assistant anything about my work!";

export default function AITalkingAvatar() {
  const videoRef   = useRef(null);
  const peerRef    = useRef(null);
  const sIdRef     = useRef(null);
  const subTimer   = useRef(null);
  const autoPlayed = useRef(false);

  const [phase, setPhase]           = useState("idle");
  // idle | connecting | ready | speaking | error
  const [subtitle, setSubtitle]     = useState("");
  const [isMuted, setIsMuted]       = useState(true);   // start muted for autoplay
  const [showUnmute, setShowUnmute] = useState(false);  // "tap to hear" prompt
  const [streamReady, setStreamReady] = useState(false);
  const [errorMsg, setErrorMsg]     = useState("");

  const API_KEY   = process.env.REACT_APP_HEYGEN_API_KEY;
  const AVATAR_ID = process.env.REACT_APP_HEYGEN_AVATAR_ID || DEFAULT_AID;
  const configured = !!API_KEY && API_KEY.trim().length > 8;

  /* ── Subtitle ticker ──────────────────────────────────────── */
  const startSubs = useCallback((text) => {
    clearTimeout(subTimer.current);
    const words = text.trim().split(/\s+/);
    let i = 0;
    setSubtitle("");
    const tick = () => {
      if (i >= words.length) return;
      setSubtitle((p) => (p ? p + " " + words[i] : words[i]));
      i++;
      subTimer.current = setTimeout(tick, MS_PER_WORD);
    };
    tick();
  }, []);

  const stopSubs = useCallback(() => {
    clearTimeout(subTimer.current);
    setSubtitle("");
  }, []);

  /* ── HeyGen fetch helper ──────────────────────────────────── */
  const hgPost = useCallback(
    async (path, body) => {
      const r = await fetch(`${HEYGEN_API}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_KEY,
        },
        body: JSON.stringify(body),
      });
      if (!r.ok) {
        const msg = await r.text().catch(() => r.statusText);
        throw new Error(`HeyGen ${path} → ${r.status}: ${msg}`);
      }
      return r.json();
    },
    [API_KEY]
  );

  /* ── Speak text via HeyGen avatar ────────────────────────── */
  const speakText = useCallback(
    async (text = INTRO_TEXT) => {
      if (!sIdRef.current || phase === "connecting") return;
      setPhase("speaking");
      startSubs(text);
      try {
        await hgPost("/v1/streaming.task", {
          session_id: sIdRef.current,
          text,
          task_type: "repeat",
        });
      } catch (e) {
        console.error("[Avatar] speak error:", e);
        stopSubs();
        setPhase("ready");
      }
    },
    [phase, hgPost, startSubs, stopSubs]
  );

  /* ── Initialize WebRTC session ───────────────────────────── */
  const initSession = useCallback(async () => {
    if (!configured) return;
    setPhase("connecting");
    setErrorMsg("");
    stopSubs();
    autoPlayed.current = false;

    try {
      /* 1. Create HeyGen session — get SDP offer + ICE servers */
      const { data } = await hgPost("/v1/streaming.new", {
        quality: "high",
        avatar_id: AVATAR_ID,
        voice: { rate: 0.97, emotion: "Friendly" },
        video_encoding: "H264",
      });
      const { session_id, sdp: offer, ice_servers2 } = data;
      sIdRef.current = session_id;

      /* 2. Create RTCPeerConnection */
      const peer = new RTCPeerConnection({ iceServers: ice_servers2 });
      peerRef.current = peer;

      /* 3. Receive avatar video/audio stream */
      peer.ontrack = ({ track, streams }) => {
        if (track.kind === "video" && videoRef.current) {
          videoRef.current.srcObject = streams[0];
          videoRef.current.muted     = true;       // muted for autoplay
          videoRef.current.play().catch(() => {});
          setStreamReady(true);
        }
      };

      /* 4. Send ICE candidates to HeyGen */
      peer.onicecandidate = ({ candidate }) => {
        if (!candidate) return;
        hgPost("/v1/streaming.ice", {
          session_id,
          candidate:      candidate.candidate,
          sdpMid:         candidate.sdpMid,
          sdpMLineIndex:  candidate.sdpMLineIndex,
        }).catch(() => {});
      };

      /* 5. React to connection state */
      peer.onconnectionstatechange = () => {
        const s = peer.connectionState;
        if (s === "connected" && !autoPlayed.current) {
          autoPlayed.current = true;
          setPhase("ready");
          setShowUnmute(true);
          // Auto-speak after brief settling delay
          setTimeout(() => speakText(INTRO_TEXT), 900);
        } else if (["disconnected", "failed", "closed"].includes(s)) {
          setPhase("error");
          setErrorMsg("Avatar connection lost. Click retry.");
          stopSubs();
        }
      };

      /* 6. SDP exchange */
      await peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      /* 7. Send SDP answer to HeyGen to start the session */
      await hgPost("/v1/streaming.start", { session_id, sdp: answer });

    } catch (e) {
      console.error("[Avatar] init error:", e);
      setPhase("error");
      setErrorMsg(e.message || "Could not start avatar. Check API key & avatar ID.");
    }
  }, [configured, hgPost, AVATAR_ID, speakText, stopSubs]);

  /* ── Cleanup on unmount ──────────────────────────────────── */
  useEffect(() => {
    initSession();

    return () => {
      stopSubs();
      peerRef.current?.close();
      const sid = sIdRef.current;
      if (sid && API_KEY) {
        // Use keepalive so this fires even during page unload
        fetch(`${HEYGEN_API}/v1/streaming.stop`, {
          method:    "POST",
          headers:   { "Content-Type": "application/json", "X-Api-Key": API_KEY },
          body:      JSON.stringify({ session_id: sid }),
          keepalive: true,
        }).catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Mute / Unmute ───────────────────────────────────────── */
  const toggleMute = () => {
    if (videoRef.current) videoRef.current.muted = !isMuted;
    setIsMuted((m) => !m);
    setShowUnmute(false);
  };

  /* ── No API key → setup guide card ──────────────────────── */
  if (!configured) return <SetupCard />;

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
              background: phase === "error" ? "#f87171"
                        : phase === "connecting" ? "#facc15"
                        : "#4ade80",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: "0.65rem", color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {phase === "idle"       ? "Initializing"
           : phase === "connecting" ? "Connecting…"
           : phase === "ready"      ? "Ready"
           : phase === "speaking"   ? "Speaking"
           : "Error"}
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
        {/* Loading state */}
        <AnimatePresence>
          {!streamReady && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 14,
                background: "rgba(2,5,16,0.95)",
                zIndex: 3,
              }}
            >
              {phase === "error" ? (
                <>
                  <span style={{ fontSize: "1.5rem" }}>⚠️</span>
                  <p style={{ fontSize: "0.68rem", color: "#f87171", textAlign: "center", padding: "0 16px", lineHeight: 1.5 }}>
                    {errorMsg}
                  </p>
                  <button
                    onClick={initSession}
                    style={{
                      padding: "6px 18px", borderRadius: 999,
                      border: "1px solid rgba(0,255,255,0.4)",
                      background: "rgba(0,255,255,0.08)",
                      color: "#67e8f9", fontSize: "0.7rem",
                      cursor: "pointer", touchAction: "manipulation",
                    }}
                  >
                    Retry
                  </button>
                </>
              ) : (
                <>
                  {/* Orb connecting animation */}
                  <div style={{ position: "relative", width: 60, height: 60 }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.8, delay: i * 0.5, repeat: Infinity }}
                        style={{
                          position: "absolute", inset: 0, borderRadius: "50%",
                          border: "1px solid rgba(0,255,255,0.4)",
                        }}
                      />
                    ))}
                    <div style={{
                      position: "absolute", inset: 10, borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(0,255,255,0.6), rgba(139,92,246,0.4))",
                    }} />
                  </div>
                  <p style={{ fontSize: "0.68rem", color: "#475569", letterSpacing: "0.06em" }}>
                    {phase === "connecting" ? "Connecting to avatar…" : "Initializing…"}
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isMuted}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: streamReady ? 1 : 0,
            transition: "opacity 0.6s ease",
            display: "block",
          }}
        />

        {/* "Tap to unmute" overlay — shows after stream starts */}
        <AnimatePresence>
          {streamReady && isMuted && showUnmute && (
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
          {subtitle && streamReady && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "20px 10px 8px",
                background: "linear-gradient(transparent, rgba(2,5,16,0.92))",
                fontSize: "0.72rem", lineHeight: 1.45,
                color: "#e2e8f0", textAlign: "center",
                zIndex: 4,
              }}
            >
              {subtitle}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Waveform bars — visible while speaking */}
        <AnimatePresence>
          {phase === "speaking" && streamReady && (
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
        {/* Replay */}
        <ControlBtn
          title="Replay intro"
          onClick={() => speakText(INTRO_TEXT)}
          disabled={phase === "connecting" || phase === "idle"}
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
          disabled={!streamReady}
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

        {/* Stop (while speaking) */}
        <AnimatePresence>
          {phase === "speaking" && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <ControlBtn
                title="Stop speaking"
                onClick={() => { stopSubs(); setPhase("ready"); }}
                active={false}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                </svg>
                <span style={{ fontSize: "0.62rem", fontWeight: 600 }}>Stop</span>
              </ControlBtn>
            </motion.div>
          )}
        </AnimatePresence>
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

/* ── Setup card (no API key) ────────────────────────────────── */
function SetupCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      style={{
        width: 270, borderRadius: "1.25rem",
        border: "1px solid rgba(0,255,255,0.15)",
        background: "rgba(2,5,16,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "20px 18px",
        textAlign: "center",
        boxShadow: "0 0 30px rgba(0,255,255,0.07)",
        flexShrink: 0,
      }}
    >
      {/* Animated orb placeholder */}
      <div style={{ position: "relative", width: 72, height: 72, margin: "0 auto 14px" }}>
        {[0, 1].map((i) => (
          <motion.div key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, delay: i * 0.7, repeat: Infinity }}
            style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(0,255,255,0.35)" }}
          />
        ))}
        <div style={{
          position: "absolute", inset: 10, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,255,0.5), rgba(139,92,246,0.4))",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="rgba(0,255,255,0.9)" strokeWidth="1.5"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(167,139,250,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>
        AI Talking Avatar
      </p>
      <p style={{ fontSize: "0.65rem", color: "#475569", lineHeight: 1.55, marginBottom: 14 }}>
        Add your HeyGen API key to activate the realistic talking avatar.
      </p>

      <div style={{
        background: "rgba(0,0,0,0.4)", borderRadius: "0.6rem",
        padding: "10px 12px", textAlign: "left",
        border: "1px solid rgba(0,255,255,0.08)",
        fontFamily: "monospace",
      }}>
        {[
          "# .env.local",
          "REACT_APP_HEYGEN_API_KEY=",
          "REACT_APP_HEYGEN_AVATAR_ID=",
          "  Wayne_20240711",
        ].map((line, i) => (
          <p key={i} style={{
            fontSize: "0.6rem", margin: "1px 0",
            color: i === 0 ? "#475569" : i === 3 ? "#64748b" : "#67e8f9",
          }}>{line}</p>
        ))}
      </div>

      <p style={{ fontSize: "0.58rem", color: "#334155", marginTop: 10, lineHeight: 1.5 }}>
        Sign up at{" "}
        <a href="https://www.heygen.com" target="_blank" rel="noopener noreferrer"
          style={{ color: "#22d3ee", textDecoration: "underline" }}>
          heygen.com
        </a>
        {" "}→ API → Streaming Avatar
      </p>
    </motion.div>
  );
}
