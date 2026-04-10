import { useEffect, useRef } from "react";

/**
 * Canvas 2D particle field — animated dots + perspective grid.
 * No Three.js dependency. Mouse parallax on the whole field.
 */
export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf;

    // ── Particles ──────────────────────────────────────────────
    const COUNT = 110;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    // ── Grid lines ─────────────────────────────────────────────
    const COLS = 18;
    const ROWS = 11;

    let offsetX = 0;
    let offsetY = 0;
    let targetOffsetX = 0;
    let targetOffsetY = 0;

    const lerp = (a, b, t) => a + (b - a) * t;

    function drawGrid() {
      ctx.strokeStyle = "rgba(30,41,59,0.45)";
      ctx.lineWidth = 0.6;
      const cellW = W / COLS;
      const cellH = H / ROWS;
      const ox = offsetX * 0.4;
      const oy = offsetY * 0.4;

      for (let c = 0; c <= COLS; c++) {
        const x = c * cellW + ox;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let r = 0; r <= ROWS; r++) {
        const y = r * cellH + oy;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
    }

    function drawParticles() {
      const ox = offsetX * 0.8;
      const oy = offsetY * 0.8;
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.alpha})`;
        ctx.fill();
      });
    }

    function drawConnections() {
      const ox = offsetX * 0.8;
      const oy = offsetY * 0.8;
      const MAX_DIST = 110;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x + ox, particles[i].y + oy);
            ctx.lineTo(particles[j].x + ox, particles[j].y + oy);
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      // Smooth mouse parallax
      offsetX = lerp(offsetX, targetOffsetX, 0.06);
      offsetY = lerp(offsetY, targetOffsetY, 0.06);

      drawGrid();
      drawConnections();
      drawParticles();

      // Move particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    // Mouse parallax
    const onMove = (e) => {
      targetOffsetX = (e.clientX / W - 0.5) * -28;
      targetOffsetY = (e.clientY / H - 0.5) * -16;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Resize
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
