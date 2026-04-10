import { useRef, useCallback } from "react";

/**
 * Magnetic pull effect — element follows cursor slightly on hover.
 * Returns { ref, onMouseMove, onMouseLeave } to spread onto any element.
 */
export function useMagnet(strength = 0.35) {
  const ref = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px) scale(1.03)`;
      el.style.transition = "transform 0.15s cubic-bezier(0.22,1,0.36,1)";
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0) scale(1)";
    el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
