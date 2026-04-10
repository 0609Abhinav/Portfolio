import React, { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { personalInfo } from "../../data/experience";
import SectionHeader from "../ui/SectionHeader";
import FloatingIcons from "../ui/FloatingIcons";

const INITIAL = { name: "", email: "", message: "" };
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/abhinavtripathi6sep@gmail.com";

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio Contact from ${form.name}`,
          _captcha: "false",
          _template: "table",
          _replyto: form.email,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm(INITIAL);
      } else {
        // fallback to mailto
        openMailto();
        setStatus("success");
        setForm(INITIAL);
      }
    } catch {
      // fallback to mailto if fetch fails (CORS etc)
      openMailto();
      setStatus("success");
      setForm(INITIAL);
    }
  };

  const openMailto = () => {
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:abhinavtripathi6sep@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <section id="contact" style={{ background: "linear-gradient(180deg,#050816 0%,#020510 100%)", position:"relative", overflow:"hidden" }}>
      <FloatingIcons seed={5} count={8} opacity={0.08} />

      {/* hologram grid overlay */}
      <div aria-hidden="true" style={{
        position:"absolute", inset:0, pointerEvents:"none", zIndex:0,
        backgroundImage:"linear-gradient(rgba(0,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,0.03) 1px,transparent 1px)",
        backgroundSize:"60px 60px",
      }} />

      <div className="section-container" style={{ position:"relative", zIndex:1 }}>
        <div className="section-divider mb-24" />
        <SectionHeader
          label="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
          center
        />

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 max-w-4xl mx-auto">
          {/* Left */}
          <motion.div
            initial={{ opacity:0, x:-24 }}
            animate={isVisible ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 style={{ fontSize:"1.1rem", fontWeight:700, color:"#e2e8f0", marginBottom:"0.5rem" }}>
                Open to opportunities
              </h3>
              <p style={{ color:"#475569", lineHeight:1.75 }}>
                I'm currently available for full-time roles, freelance projects, and
                open-source collaborations. Response time is typically within 24 hours.
              </p>
            </div>

            {/* Email direct link */}
            <a href="mailto:abhinavtripathi6sep@gmail.com"
              style={{
                display:"flex", alignItems:"center", gap:12, padding:"14px 18px",
                borderRadius:"1rem", background:"rgba(0,255,255,0.04)",
                border:"1px solid rgba(0,255,255,0.15)", textDecoration:"none",
                transition:"all 0.3s",
              }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(0,255,255,0.08)"; e.currentTarget.style.borderColor="rgba(0,255,255,0.35)"; e.currentTarget.style.boxShadow="0 0 20px rgba(0,255,255,0.1)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(0,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(0,255,255,0.15)"; e.currentTarget.style.boxShadow="none"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <div>
                <div style={{ fontSize:"0.7rem", color:"#475569", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:2 }}>Email</div>
                <div style={{ fontSize:"0.85rem", color:"#22d3ee" }}>abhinavtripathi6sep@gmail.com</div>
              </div>
            </a>

            <div className="space-y-4">
              <ContactLink label="GitHub" value="0609Abhinav" href={personalInfo.github} />
              <ContactLink label="LinkedIn" value="Abhinav Tripathi" href={personalInfo.linkedin} />
              <ContactLink label="Location" value={personalInfo.location} href={null} />
            </div>
          </motion.div>

          {/* Right â€” form */}
          <motion.div
            initial={{ opacity:0, x:24 }}
            animate={isVisible ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.6, delay:0.15 }}
          >
            {status === "success" ? (
              <div style={{ textAlign:"center", padding:"3rem 1.5rem", borderRadius:"1.25rem", background:"rgba(0,255,255,0.03)", border:"1px solid rgba(0,255,255,0.15)" }}>
                <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>âœ…</div>
                <h3 style={{ fontSize:"1.1rem", fontWeight:700, color:"#e2e8f0", marginBottom:"0.5rem" }}>Message sent!</h3>
                <p style={{ color:"#475569", fontSize:"0.875rem", marginBottom:"1.5rem" }}>
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button onClick={() => setStatus("idle")} className="btn-secondary" style={{ fontSize:13, padding:"8px 20px" }}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <FormField id="name" label="Name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} autoComplete="name" />
                <FormField id="email" label="Email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} autoComplete="email" />
                <div>
                  <label htmlFor="message" style={{ display:"block", fontSize:"0.875rem", fontWeight:500, color:"#cbd5e1", marginBottom:6 }}>Message</label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className="input-field" style={{ resize:"none" }}
                  />
                </div>

              {status === "error" && (
                <p style={{ color:"#f87171", fontSize:"0.8rem" }}>
                  Something went wrong. <a href="mailto:abhinavtripathi6sep@gmail.com" style={{ color:"#22d3ee", textDecoration:"underline" }}>Click here to email directly.</a>
                </p>
              )}

                <button type="submit" disabled={status === "loading"} className="btn-primary w-full justify-center"
                  style={{ opacity: status === "loading" ? 0.6 : 1, cursor: status === "loading" ? "not-allowed" : "pointer" }}>
                  {status === "loading" ? (
                    <><span style={{ width:14, height:14, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin 0.7s linear infinite" }} /> Sendingâ€¦</>
                  ) : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}

function FormField({ id, label, type, placeholder, value, onChange, autoComplete }) {
  return (
    <div>
      <label htmlFor={id} style={{ display:"block", fontSize:"0.875rem", fontWeight:500, color:"#cbd5e1", marginBottom:6 }}>{label}</label>
      <input id={id} name={id} type={type} required value={value} onChange={onChange}
        placeholder={placeholder} className="input-field" autoComplete={autoComplete} />
    </div>
  );
}

function ContactLink({ label, value, href }) {
  const content = (
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      <span style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#334155", width:72, flexShrink:0 }}>{label}</span>
      <span style={{ fontSize:"0.875rem", color:"#94a3b8", transition:"color 0.2s" }}>{value}</span>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ textDecoration:"none" }}
      onMouseEnter={e=>e.currentTarget.querySelector("span:last-child").style.color="#e2e8f0"}
      onMouseLeave={e=>e.currentTarget.querySelector("span:last-child").style.color="#94a3b8"}>
      {content}
    </a>
  ) : <div>{content}</div>;
}
