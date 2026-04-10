import { motion } from "framer-motion";
import { useTyping } from "../../hooks/useTyping";

const CODE_LINES = [
  { indent: 0, tokens: [{ t: "const ", c: "#c792ea" }, { t: "developer", c: "#82aaff" }, { t: " = {", c: "#89ddff" }] },
  { indent: 1, tokens: [{ t: "name", c: "#f07178" }, { t: ": ", c: "#89ddff" }, { t: '"Abhinav Tripathi"', c: "#c3e88d" }, { t: ",", c: "#89ddff" }] },
  { indent: 1, tokens: [{ t: "stack", c: "#f07178" }, { t: ": [", c: "#89ddff" }, { t: '"React"', c: "#c3e88d" }, { t: ", ", c: "#89ddff" }, { t: '"Python"', c: "#c3e88d" }, { t: ", ", c: "#89ddff" }, { t: '"FastAPI"', c: "#c3e88d" }, { t: "],", c: "#89ddff" }] },
  { indent: 1, tokens: [{ t: "available", c: "#f07178" }, { t: ": ", c: "#89ddff" }, { t: "true", c: "#ff9cac" }, { t: ",", c: "#89ddff" }] },
  { indent: 1, tokens: [{ t: "passion", c: "#f07178" }, { t: ": ", c: "#89ddff" }, { t: '"Building things"', c: "#c3e88d" }] },
  { indent: 0, tokens: [{ t: "};", c: "#89ddff" }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: "// Currently working on...", c: "#546e7a" }] },
  { indent: 0, tokens: [{ t: "developer", c: "#82aaff" }, { t: ".ship(", c: "#89ddff" }, { t: '"portfolio"', c: "#c3e88d" }, { t: ");", c: "#89ddff" }] },
];

function CodeEditor() {
  return (
    <div style={{
      background: "#0d1117",
      borderRadius: "0 0 4px 4px",
      padding: "12px 14px",
      fontFamily: "'Fira Code', 'Courier New', monospace",
      fontSize: "9.5px",
      lineHeight: 1.7,
      overflow: "hidden",
      flex: 1,
    }}>
      {CODE_LINES.map((line, li) => (
        <div key={li} style={{ display: "flex", whiteSpace: "pre" }}>
          <span style={{ color: "#3d4451", marginRight: 12, userSelect: "none", minWidth: 14, textAlign: "right" }}>{li + 1}</span>
          <span style={{ paddingLeft: line.indent * 14 }}>
            {line.tokens.map((tok, ti) => (
              <span key={ti} style={{ color: tok.c }}>{tok.t}</span>
            ))}
          </span>
        </div>
      ))}
      {/* Blinking cursor on last line */}
      <div style={{ display: "flex", whiteSpace: "pre" }}>
        <span style={{ color: "#3d4451", marginRight: 12, minWidth: 14, textAlign: "right" }}>{CODE_LINES.length + 1}</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
          style={{ display: "inline-block", width: 6, height: "1em", background: "#a78bfa", verticalAlign: "middle" }}
        />
      </div>
    </div>
  );
}

function TerminalWindow() {
  const typed = useTyping(["npm run dev", "Server running on :3000", "✓ Compiled successfully"], 60, 40, 1200);
  return (
    <div style={{
      background: "#0a0a0a",
      borderRadius: "0 0 4px 4px",
      padding: "10px 12px",
      fontFamily: "'Fira Code', 'Courier New', monospace",
      fontSize: "9px",
      lineHeight: 1.8,
      flex: 1,
    }}>
      <div style={{ color: "#4ade80" }}>$ <span style={{ color: "#e2e8f0" }}>{typed}</span>
        <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }}
          style={{ display: "inline-block", width: 5, height: "0.9em", background: "#4ade80", verticalAlign: "middle", marginLeft: 2 }} />
      </div>
      <div style={{ color: "#64748b", marginTop: 2 }}>▶ React 18 · FastAPI · PostgreSQL</div>
      <div style={{ color: "#64748b" }}>▶ Tailwind CSS · GSAP · Framer Motion</div>
    </div>
  );
}

function WindowChrome({ title, color, children }) {
  return (
    <div style={{
      background: "#161b22",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 6,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
    }}>
      {/* Title bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 10px", background: "#21262d", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ fontSize: 8, color: "#64748b", marginLeft: 6 }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

export default function DesktopSetup() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 520 }}>

      {/* ── MONITOR ── */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: 1000 }}
      >
        {/* Monitor bezel */}
        <div style={{
          background: "linear-gradient(145deg, #1a1f2e, #0d1117)",
          border: "2px solid rgba(139,92,246,0.25)",
          borderRadius: 12,
          padding: 8,
          boxShadow: "0 0 60px rgba(139,92,246,0.15), 0 0 120px rgba(59,130,246,0.08), 0 30px 60px rgba(0,0,0,0.6)",
          position: "relative",
        }}>
          {/* Screen glow */}
          <div style={{ position: "absolute", inset: 8, borderRadius: 8, background: "linear-gradient(135deg,rgba(59,130,246,0.05),rgba(139,92,246,0.08))", pointerEvents: "none", zIndex: 0 }} />

          {/* Screen content */}
          <div style={{
            background: "#0d1117",
            borderRadius: 6,
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
            minHeight: 260,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            padding: 6,
          }}>
            {/* Top row: code editor */}
            <WindowChrome title="portfolio/Hero.jsx — VS Code">
              <CodeEditor />
            </WindowChrome>

            {/* Bottom row: terminal + browser preview */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              <WindowChrome title="Terminal">
                <TerminalWindow />
              </WindowChrome>
              <WindowChrome title="localhost:3000">
                <div style={{ background: "#050816", padding: "10px 12px", flex: 1 }}>
                  <div style={{ fontSize: 8, color: "#64748b", marginBottom: 6 }}>localhost:3000</div>
                  <div style={{ fontSize: 11, fontWeight: 700, background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 4 }}>Abhinav Tripathi</div>
                  <div style={{ fontSize: 7.5, color: "#475569", marginBottom: 6 }}>Full-Stack Developer</div>
                  <div style={{ display: "flex", gap: 3 }}>
                    {["React", "Python", "FastAPI"].map(t => (
                      <span key={t} style={{ fontSize: 6.5, padding: "1px 5px", borderRadius: 3, background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa" }}>{t}</span>
                    ))}
                  </div>
                  {/* Mini progress bars */}
                  <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 3 }}>
                    {[{ l: "React", v: 90 }, { l: "Python", v: 88 }, { l: "FastAPI", v: 75 }].map(({ l, v }) => (
                      <div key={l}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 6, color: "#475569", marginBottom: 1 }}>
                          <span>{l}</span><span>{v}%</span>
                        </div>
                        <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 1.5, delay: 1 }}
                            style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg,#3B82F6,#8B5CF6)" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </WindowChrome>
            </div>
          </div>

          {/* Monitor brand strip */}
          <div style={{ textAlign: "center", padding: "4px 0 2px", fontSize: 7, color: "#1e293b", letterSpacing: "0.2em" }}>DEVSTUDIO PRO</div>
        </div>

        {/* Monitor neck */}
        <div style={{ width: 40, height: 18, background: "linear-gradient(to bottom,#1a1f2e,#0f1420)", margin: "0 auto", borderRadius: "0 0 4px 4px", boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }} />

        {/* Monitor base */}
        <div style={{ width: 120, height: 8, background: "linear-gradient(to bottom,#1a1f2e,#0d1117)", margin: "0 auto", borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }} />
      </motion.div>

      {/* ── KEYBOARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ marginTop: 10, display: "flex", justifyContent: "center" }}
      >
        <div style={{
          background: "linear-gradient(145deg,#1a1f2e,#0f1420)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 6,
          padding: "6px 10px",
          width: "75%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}>
          {/* Key rows */}
          {[
            { keys: 12, w: "100%" },
            { keys: 11, w: "95%" },
            { keys: 10, w: "88%" },
          ].map((row, ri) => (
            <div key={ri} style={{ display: "flex", gap: 2, marginBottom: 2, justifyContent: "center" }}>
              {Array.from({ length: row.keys }).map((_, ki) => (
                <motion.div key={ki}
                  animate={{ boxShadow: ki === 3 && ri === 0 ? ["0 0 0px rgba(139,92,246,0)", "0 0 6px rgba(139,92,246,0.6)", "0 0 0px rgba(139,92,246,0)"] : undefined }}
                  transition={{ duration: 2, repeat: Infinity, delay: ki * 0.1 }}
                  style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2 }}
                />
              ))}
            </div>
          ))}
          {/* Space bar */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <div style={{ width: "50%", height: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2 }} />
          </div>
        </div>
      </motion.div>

      {/* ── MOUSE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ position: "absolute", bottom: 0, right: "8%" }}
      >
        <div style={{
          width: 22, height: 34,
          background: "linear-gradient(145deg,#1a1f2e,#0f1420)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "11px 11px 8px 8px",
          position: "relative",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}>
          <div style={{ position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)", width: 1, height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 1 }} />
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 3, height: 3, borderRadius: "50%", background: "#8B5CF6" }}
          />
        </div>
      </motion.div>

      {/* Floating status badges */}
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: -16, right: -20, padding: "6px 12px", borderRadius: 10, fontSize: 11, fontWeight: 600, background: "rgba(5,8,22,0.95)", border: "1px solid rgba(59,130,246,0.3)", backdropFilter: "blur(16px)", color: "#93c5fd", whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
        ⚡ React · Python · FastAPI
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ position: "absolute", bottom: 40, left: -24, padding: "6px 12px", borderRadius: 10, fontSize: 11, fontWeight: 600, background: "rgba(5,8,22,0.95)", border: "1px solid rgba(74,222,128,0.3)", backdropFilter: "blur(16px)", color: "#4ade80", whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
        <span style={{ marginRight: 5 }}>●</span>Open to Work
      </motion.div>
    </div>
  );
}
