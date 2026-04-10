import React from "react";

export default function SectionHeader({ label, title, subtitle, center = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      {label && (
        <span style={{
          display: "inline-block", fontSize: "0.7rem", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "#00ffff", marginBottom: "0.75rem",
          textShadow: "0 0 10px rgba(0,255,255,0.6)",
        }}>
          {label}
        </span>
      )}
      <h2 className="section-title gradient-text" style={{ display: "inline-block" }}>{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${center ? "mx-auto" : ""}`}>{subtitle}</p>
      )}
    </div>
  );
}
