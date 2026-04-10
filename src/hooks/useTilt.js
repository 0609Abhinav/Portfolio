import { useRef, useCallback } from "react";

/**
 * 3D tilt effect on mouse move.
 * Returns { ref, onMouseMove, onMouseLeave, onMouseEnter }
 */
export function useTilt(maxX = 8, maxY = 12) {
  const ref = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0→1
      const y = (e.clientY - rect.top) / rect.height;    // 0→1
      const rotY = (x - 0.5) * maxY * 2;
      const rotX = -(y - 0.5) * maxX * 2;
      // Dynamic shadow shift
      const shadowX = (x - 0.5) * 20;
      const shadowY = (y - 0.5) * 20;
      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
      el.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(139,92,246,0.2), 0 20px 60px rgba(0,0,0,0.5)`;
      el.style.transition = "transform 0.1s ease, box-shadow 0.1s ease";
      // Light reflection
      const shine = el.querySelector("[data-shine]");
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
      }
    },
    [maxX, maxY]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.boxShadow = "";
    el.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.6s ease";
    const shine = el.querySelector("[data-shine]");
    if (shine) shine.style.background = "transparent";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
