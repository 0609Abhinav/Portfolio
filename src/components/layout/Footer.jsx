import React from "react";
import { personalInfo } from "../../data/experience";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#050816" }}
      className="py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
        <p>
          © {year}{" "}
          <span className="gradient-text font-semibold">{personalInfo.name}</span>. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors">GitHub</a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
