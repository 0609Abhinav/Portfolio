import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAIAssistant, { QUICK_CHIPS } from "../../hooks/useAIAssistant";
import useVoice from "../../hooks/useVoice";
import introAudioSrc from "../../assets/audio/intro.m4a";

/* ─────────────────────────────────────────────────────────────
   AIAssistant — Floating AI Chat Widget
   Desktop : slides up from bottom-right corner
   Mobile  : full-screen bottom-sheet  ← handled via CSS class
   No JS mobile-detection → no extra re-renders → auto-play safe
───────────────────────────────────────────────────────────── */

export default function AIAssistant() {
  const [open, setOpen]   = useState(false);
  const [input, setInput] = useState("");
  const [introPlayed, setIntroPlayed] = useState(false);
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const messagesEndRef    = useRef(null);
  const inputRef          = useRef(null);
  const audioRef          = useRef(null);

  const { messages, isTyping, sendMessage } = useAIAssistant();
  const {
    speak, stopSpeaking,
    startListening, stopListening,
    isSpeaking, isListening,
    transcript, setTranscript,
    supported,
  } = useVoice();

  // ── Auto-scroll ──
  useEffect(() => {
    if (open) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [messages, isTyping, open]);

  // ── Populate input from STT transcript ──
  useEffect(() => {
    if (transcript) setInput(transcript);
  }, [transcript]);

  // ── Focus input when opened (desktop only — skip on touch devices) ──
  useEffect(() => {
    if (open && window.innerWidth >= 768) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  // ── Lock body scroll on mobile when panel is open ──
  useEffect(() => {
    if (open && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    stopSpeaking();
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    setInput("");
    setTranscript("");
    sendMessage(text, (aiText) => speak(aiText, { rate: 0.95 }));
  }, [input, sendMessage, speak, stopSpeaking, setTranscript]);

  const handleChip = useCallback((chip) => {
    stopSpeaking();
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    setInput("");
    setTranscript("");
    sendMessage(chip, (aiText) => speak(aiText, { rate: 0.95 }));
  }, [sendMessage, speak, stopSpeaking, setTranscript]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      if (transcript.trim()) setTimeout(() => handleSend(), 150);
    } else {
      startListening();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleClose = () => {
    setOpen(false);
    if (isSpeaking) stopSpeaking();
    if (isListening) stopListening();
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={introAudioSrc} 
        onPlay={() => setIsIntroPlaying(true)} 
        onEnded={() => setIsIntroPlaying(false)}
        onPause={() => setIsIntroPlaying(false)}
      />
      {/* ── Floating Toggle Button ── */}
      <motion.button
        onClick={() => {
          if (open) {
            handleClose();
          } else {
            setOpen(true);
            if (!introPlayed && audioRef.current) {
              setIntroPlayed(true);
              audioRef.current.play().catch(e => {
                console.warn("Autoplay blocked or audio failed, falling back to TTS", e);
                const cleanText = messages[0].text
                  .replace(/\*\*(.*?)\*\*/g, "$1")
                  .replace(/\*(.*?)\*/g, "$1")
                  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
                  .replace(/•/g, "")
                  .replace(/🎤|👋|💻|📁|🤖|📬|🎓|🏅|✅|📄|⏱️|⚙️|🎨|🤔|🏆|⚡|🚀/g, "")
                  .trim();
                speak(cleanText, { rate: 0.95 });
              });
            }
          }
        }}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="ai-float-btn"
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          width: 58,
          height: 58,
          borderRadius: "50%",
          border: "1.5px solid rgba(0,255,255,0.5)",
          background: open
            ? "linear-gradient(135deg, rgba(0,255,255,0.2), rgba(139,92,246,0.4))"
            : "linear-gradient(135deg, rgba(0,255,255,0.12), rgba(139,92,246,0.25))",
          boxShadow: "0 0 28px rgba(0,255,255,0.25), 0 0 56px rgba(139,92,246,0.12), 0 8px 32px rgba(0,0,0,0.6)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          touchAction: "manipulation",
          transition: "background 0.3s",
        }}
      >
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            position: "absolute", inset: -4, borderRadius: "50%",
            border: "1px solid rgba(0,255,255,0.4)", pointerEvents: "none",
          }}
        />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }} width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="#e0ffff" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </motion.svg>
          ) : (
            <motion.svg key="chat"
              initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2 }} width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="#e0ffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 40, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.93 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="ai-chat-panel"
            style={{
              position: "fixed",
              bottom: 100,
              right: 20,
              width: "min(420px, calc(100vw - 32px))",
              height: "min(580px, calc(var(--vh,1vh) * 100 - 130px))",
              borderRadius: "1.5rem",
              border: "1px solid rgba(0,255,255,0.2)",
              background: "rgba(2, 5, 16, 0.95)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              boxShadow: "0 0 40px rgba(0,255,255,0.1), 0 0 80px rgba(139,92,246,0.08), 0 24px 64px rgba(0,0,0,0.8)",
              zIndex: 9998,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Hologram grid */}
            <div aria-hidden="true" style={{
              position:"absolute", inset:0,
              backgroundImage:"linear-gradient(rgba(0,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,0.025) 1px,transparent 1px)",
              backgroundSize:"40px 40px", pointerEvents:"none", borderRadius:"inherit",
            }}/>
            {/* Corner glows */}
            <div style={{ position:"absolute", top:0, left:0, width:120, height:120, background:"radial-gradient(circle at 0% 0%, rgba(0,255,255,0.07) 0%, transparent 70%)", pointerEvents:"none" }}/>
            <div style={{ position:"absolute", bottom:0, right:0, width:120, height:120, background:"radial-gradient(circle at 100% 100%, rgba(139,92,246,0.07) 0%, transparent 70%)", pointerEvents:"none" }}/>

            {/* Mobile drag handle — only visible via CSS on small screens */}
            <div className="ai-drag-handle" style={{ display:"none", justifyContent:"center", paddingTop:10, paddingBottom:2, flexShrink:0, position:"relative", zIndex:1 }}>
              <div style={{ width:36, height:4, borderRadius:2, background:"rgba(0,255,255,0.2)" }}/>
            </div>

            {/* ── Header ── */}
            <div style={{
              padding:"16px 20px 14px",
              borderBottom:"1px solid rgba(0,255,255,0.1)",
              display:"flex", alignItems:"center", gap:12,
              position:"relative", zIndex:1, flexShrink:0,
            }}>
              {/* Orb */}
              <div style={{ position:"relative", flexShrink:0 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{
                    width:38, height:38, borderRadius:"50%",
                    border:"1.5px solid transparent",
                    backgroundImage:"linear-gradient(#020510,#020510),linear-gradient(135deg,#00ffff,#a78bfa,#f472b6)",
                    backgroundOrigin:"border-box", backgroundClip:"padding-box,border-box",
                    position:"absolute", inset:0,
                  }}
                />
                <div style={{
                  width:38, height:38, borderRadius:"50%",
                  background:"radial-gradient(circle at 38% 35%,rgba(0,255,255,0.8),rgba(139,92,246,0.6),rgba(244,114,182,0.4))",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow: (isSpeaking || isIntroPlaying) ? "0 0 14px rgba(0,255,255,0.6)" : "0 0 8px rgba(0,255,255,0.2)",
                  transition:"box-shadow 0.3s", position:"relative",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" stroke="rgba(0,255,255,0.9)" strokeWidth="1.3"/>
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" stroke="rgba(167,139,250,0.9)" strokeWidth="1.3"/>
                  </svg>
                </div>
              </div>

              <div style={{ flex:1 }}>
                <div style={{ fontSize:"0.88rem", fontWeight:700, color:"#e2e8f0", lineHeight:1.2 }}>Portfolio AI</div>
                <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:2 }}>
                  <motion.span animate={{ opacity:[1,0.3,1] }} transition={{ duration:2, repeat:Infinity }}
                    style={{ width:5, height:5, borderRadius:"50%", background:"#4ade80", display:"inline-block" }}/>
                  <span style={{ fontSize:"0.68rem", color:"#64748b" }}>
                    {(isSpeaking || isIntroPlaying) ? "Speaking…" : isListening ? "Listening…" : isTyping ? "Thinking…" : "Online"}
                  </span>
                </div>
              </div>

              {(isSpeaking || isIntroPlaying) && (
                <motion.button initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
                  onClick={() => { stopSpeaking(); if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; } }} touchAction="manipulation"
                  style={{ padding:"4px 10px", borderRadius:999, border:"1px solid rgba(0,255,255,0.3)", background:"rgba(0,255,255,0.08)", color:"#67e8f9", fontSize:"0.65rem", fontWeight:600, cursor:"pointer", flexShrink:0 }}>
                  ⏹ Stop
                </motion.button>
              )}

              {/* Mobile-only close button — shown via CSS */}
              <button onClick={handleClose} className="ai-mobile-close"
                style={{ display:"none", width:32, height:32, borderRadius:"50%", border:"1px solid rgba(0,255,255,0.15)", background:"rgba(0,255,255,0.04)", color:"#64748b", cursor:"pointer", alignItems:"center", justifyContent:"center", flexShrink:0, touchAction:"manipulation" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* ── Quick Chips ── */}
            <div className="ai-chips-scroll" style={{
              padding:"10px 14px 6px", display:"flex", gap:6,
              flexWrap:"nowrap", overflowX:"auto", flexShrink:0,
              position:"relative", zIndex:1, scrollbarWidth:"none",
              WebkitOverflowScrolling:"touch",
            }}>
              {QUICK_CHIPS.slice(0, 5).map((chip) => (
                <motion.button key={chip} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                  onClick={() => handleChip(chip)}
                  style={{
                    flexShrink:0, padding:"5px 13px", borderRadius:999,
                    border:"1px solid rgba(0,255,255,0.2)", background:"rgba(0,255,255,0.04)",
                    color:"#94a3b8", fontSize:"0.7rem", fontWeight:500,
                    cursor:"pointer", whiteSpace:"nowrap", touchAction:"manipulation",
                    transition:"border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#e0ffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                >
                  {chip}
                </motion.button>
              ))}
            </div>

            {/* ── Messages ── */}
            <div style={{
              flex:1, overflowY:"auto", padding:"8px 16px 12px",
              display:"flex", flexDirection:"column", gap:10,
              position:"relative", zIndex:1,
              scrollbarWidth:"thin", scrollbarColor:"rgba(0,255,255,0.2) transparent",
              WebkitOverflowScrolling:"touch", overscrollBehavior:"contain",
            }}>
              {messages.map((msg) => (
                <motion.div key={msg.id}
                  initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }}
                  style={{ display:"flex", justifyContent: msg.from==="user" ? "flex-end" : "flex-start", gap:8, alignItems:"flex-end" }}
                >
                  {msg.from === "ai" && (
                    <div style={{ width:24, height:24, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,255,255,0.6),rgba(139,92,246,0.5))", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:2 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" stroke="rgba(0,255,255,0.9)" strokeWidth="1.5"/>
                        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" stroke="rgba(167,139,250,0.9)" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  )}
                  <div style={{
                    maxWidth:"82%", padding:"10px 14px",
                    borderRadius: msg.from==="user" ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
                    background: msg.from==="user" ? "linear-gradient(135deg,rgba(0,255,255,0.15),rgba(139,92,246,0.25))" : "rgba(255,255,255,0.04)",
                    border: msg.from==="user" ? "1px solid rgba(0,255,255,0.3)" : "1px solid rgba(255,255,255,0.07)",
                    fontSize:"0.82rem", lineHeight:1.65,
                    color: msg.from==="user" ? "#e0ffff" : "#94a3b8",
                    boxShadow: msg.from==="user" ? "0 0 16px rgba(0,255,255,0.08)" : "none",
                  }}>
                    <MessageContent text={msg.text}/>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:24, height:24, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,255,255,0.6),rgba(139,92,246,0.5))", flexShrink:0 }}/>
                  <div style={{ padding:"10px 14px", borderRadius:"1rem 1rem 1rem 0.25rem", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", display:"flex", gap:4, alignItems:"center" }}>
                    {[0,1,2].map((i) => (
                      <motion.div key={i} animate={{ y:[0,-5,0] }} transition={{ duration:0.6, delay:i*0.15, repeat:Infinity }}
                        style={{ width:5, height:5, borderRadius:"50%", background:"#475569" }}/>
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef}/>
            </div>

            {/* ── Input ── */}
            <div style={{
              padding:"12px 14px",
              paddingBottom:"max(12px, env(safe-area-inset-bottom, 12px))",
              borderTop:"1px solid rgba(0,255,255,0.1)",
              display:"flex", gap:8, alignItems:"flex-end",
              position:"relative", zIndex:1, flexShrink:0,
            }}>
              <div style={{ flex:1, position:"relative" }}>
                {isListening && (
                  <motion.div animate={{ opacity:[0.5,0.15,0.5] }} transition={{ duration:1, repeat:Infinity }}
                    style={{ position:"absolute", inset:0, borderRadius:"0.75rem", border:"1.5px solid rgba(0,255,255,0.6)", pointerEvents:"none" }}/>
                )}
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder={isListening ? "Listening… speak now" : "Ask about Abhinav…"}
                  style={{
                    width:"100%", resize:"none",
                    padding:"9px 12px", borderRadius:"0.75rem",
                    border:"1px solid rgba(0,255,255,0.12)",
                    background:"rgba(0,255,255,0.03)",
                    color:"#e2e8f0",
                    /* 16px prevents iOS Safari auto-zoom on focus */
                    fontSize:"16px",
                    outline:"none", lineHeight:1.5,
                    fontFamily:"inherit", maxHeight:96, overflowY:"auto",
                    transition:"border-color 0.2s", touchAction:"manipulation",
                    WebkitAppearance:"none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,255,0.4)")}
                  onBlur={(e)  => (e.target.style.borderColor = "rgba(0,255,255,0.12)")}
                />
              </div>

              {/* Mic button */}
              {supported.stt && (
                <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                  onClick={handleVoiceToggle}
                  title={isListening ? "Stop listening" : "Speak a question"}
                  className="ai-icon-btn"
                  style={{
                    width:38, height:38, borderRadius:"50%", border:"1px solid",
                    borderColor: isListening ? "rgba(0,255,255,0.7)" : "rgba(0,255,255,0.2)",
                    background: isListening ? "rgba(0,255,255,0.15)" : "rgba(0,255,255,0.04)",
                    color: isListening ? "#00ffff" : "#64748b",
                    cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                    flexShrink:0, boxShadow: isListening ? "0 0 14px rgba(0,255,255,0.3)" : "none",
                    transition:"all 0.2s", touchAction:"manipulation",
                  }}>
                  <MicIcon isActive={isListening}/>
                </motion.button>
              )}

              {/* Send button */}
              <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                onClick={handleSend} disabled={!input.trim()}
                className="ai-icon-btn"
                style={{
                  width:38, height:38, borderRadius:"50%",
                  border:"1px solid rgba(0,255,255,0.4)",
                  background: input.trim() ? "linear-gradient(135deg,rgba(0,255,255,0.2),rgba(139,92,246,0.35))" : "rgba(0,255,255,0.04)",
                  color: input.trim() ? "#e0ffff" : "#334155",
                  cursor: input.trim() ? "pointer" : "not-allowed",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  flexShrink:0, boxShadow: input.trim() ? "0 0 12px rgba(0,255,255,0.2)" : "none",
                  transition:"all 0.2s", touchAction:"manipulation",
                }}>
                <SendIcon/>
              </motion.button>
            </div>

            {/* STT unsupported note */}
            {!supported.stt && (
              <div style={{ textAlign:"center", padding:"0 14px 6px", fontSize:"0.62rem", color:"#334155", position:"relative", zIndex:1, flexShrink:0 }}>
                🎤 Voice input requires Chrome · Text chat works on all browsers
              </div>
            )}

            {/* Footer */}
            <div style={{ textAlign:"center", padding:"4px 14px 10px", fontSize:"0.62rem", color:"#1e293b", letterSpacing:"0.1em", textTransform:"uppercase", position:"relative", zIndex:1, flexShrink:0 }}>
              AI Portfolio Assistant · Built by Abhinav
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Markdown-lite renderer ── */
function MessageContent({ text }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return <br key={i}/>;
        return <div key={i} style={{ lineHeight:1.65 }}>{renderInline(line)}</div>;
      })}
    </div>
  );
}

function renderInline(text) {
  const parts = [];
  const regex = /\*\*(.*?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(<span key={last}>{text.slice(last, match.index)}</span>);
    if (match[1] !== undefined) {
      parts.push(<strong key={match.index} style={{ color:"#e2e8f0", fontWeight:600 }}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      parts.push(<a key={match.index} href={match[3]} target="_blank" rel="noopener noreferrer" style={{ color:"#22d3ee", textDecoration:"underline", textUnderlineOffset:2 }}>{match[2]}</a>);
    }
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push(<span key={last}>{text.slice(last)}</span>);
  return parts.length > 0 ? parts : text;
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}
function MicIcon({ isActive }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="11" rx="3" fill={isActive ? "rgba(0,255,255,0.2)" : "none"}/>
      <path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  );
}
