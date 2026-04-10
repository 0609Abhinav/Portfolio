import React from "react";
import { useMagnet } from "../../hooks/useMagnet";

/**
 * Wraps any child with magnetic cursor pull.
 * Usage: <MagneticButton><button>...</button></MagneticButton>
 */
export default function MagneticButton({ children, strength = 0.3, className = "" }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnet(strength);
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-block ${className}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
