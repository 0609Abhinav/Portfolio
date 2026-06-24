import { useState, useCallback } from "react";
import projects from "../data/projects";
import { skillCategories } from "../data/skills";
import { education, certifications, personalInfo } from "../data/experience";

/* ─────────────────────────────────────────────────────────────
   useAIAssistant — Portfolio-aware chatbot
   Answers questions about Abhinav Tripathi using real portfolio data.
   No external API. Swap-in point: replace getAnswer() with OpenAI call.
───────────────────────────────────────────────────────────── */

// ── Featured / best projects ──
const featuredProjects = projects.filter((p) => p.featured);

// ── Portfolio knowledge base ──
const KNOWLEDGE = {
  name: personalInfo.name,
  title: personalInfo.title,
  location: personalInfo.location,
  github: personalInfo.github,
  linkedin: personalInfo.linkedin,
  featuredProjects,
  allProjects: projects,
  skillCategories,
  education,
  certifications,
};

// ── Quick-action chips shown in the chat UI ──
export const QUICK_CHIPS = [
  "Tell me about Abhinav",
  "Show his best projects",
  "What skills does he have?",
  "What has he built with AI/ML?",
  "How can I contact him?",
  "What is his education?",
  "Show his certifications",
  "Is he available for hire?",
];

/* ─────────────────────────────────────────────────────────────
   Rule-based query answering
───────────────────────────────────────────────────────────── */
function getAnswer(query) {
  const q = query.toLowerCase().trim();

  // ── About / intro ──
  if (
    q.match(/who|about|introduce|tell me|background|himself|he is|abhinav/)
  ) {
    return `👋 **${KNOWLEDGE.name}** is a passionate **${KNOWLEDGE.title}** based in ${KNOWLEDGE.location}.\n\nHe specializes in building production-grade web applications — React frontends, Python/Django/FastAPI backends, and AI-powered tools. With 3+ years of experience, he has shipped 10+ projects ranging from AI exam systems to crypto trackers.\n\nHe's proficient in the **MERN stack**, **Django**, **Angular**, **AI/ML**, and cloud deployments on AWS. Currently available for full-time roles and freelance projects! 🚀`;
  }

  // ── Skills ──
  if (q.match(/skill|tech|stack|know|proficient|expert|language|framework/)) {
    const cats = KNOWLEDGE.skillCategories
      .map(
        (cat) =>
          `**${cat.label}**: ${cat.skills
            .map((s) => `${s.name} (${s.level}%)`)
            .join(", ")}`
      )
      .join("\n");
    return `💻 Here are Abhinav's skills:\n\n${cats}\n\nHis strongest areas are React.js (90%), HTML/CSS (92%), Python (88%), and REST APIs (85%).`;
  }

  // ── Best / featured projects ──
  if (
    q.match(/best|featured|top|showcase|highlight|impressive|recommend/)
  ) {
    const list = KNOWLEDGE.featuredProjects
      .map(
        (p) =>
          `• **${p.title}** — ${p.description.slice(0, 90)}… [GitHub](${p.github})`
      )
      .join("\n");
    return `🏆 Here are Abhinav's best projects:\n\n${list}\n\nAll projects are on his [GitHub](${KNOWLEDGE.github}).`;
  }

  // ── All projects ──
  if (q.match(/project|built|created|made|work|portfolio|app|website/)) {
    const list = KNOWLEDGE.allProjects
      .slice(0, 8)
      .map((p) => `• **${p.title}** (${p.category}) — ${p.tech.join(", ")}`)
      .join("\n");
    return `📁 Abhinav has built **${KNOWLEDGE.allProjects.length}+ projects**:\n\n${list}\n\n…and more! Check out the Projects section above or his [GitHub](${KNOWLEDGE.github}).`;
  }

  // ── AI / ML ──
  if (q.match(/ai|ml|machine learning|deep learning|neural|cnn|model|python ai|intelligent/)) {
    const aiProjects = KNOWLEDGE.allProjects.filter((p) => p.category === "AI/ML");
    const list = aiProjects
      .map((p) => `• **${p.title}** — ${p.tech.join(", ")}`)
      .join("\n");
    return `🤖 Abhinav has strong AI/ML expertise! Here are his AI projects:\n\n${list}\n\nHis ML skills include TensorFlow/Keras, scikit-learn, NumPy/Pandas, and Computer Vision (CNN).`;
  }

  // ── Contact ──
  if (q.match(/contact|email|reach|hire|connect|message|talk|linkedin|github/)) {
    return `📬 You can reach Abhinav through:\n\n• **Email**: abhinavtripathi6sep@gmail.com\n• **GitHub**: [0609Abhinav](${KNOWLEDGE.github})\n• **LinkedIn**: [Abhinav Tripathi](${KNOWLEDGE.linkedin})\n• **Location**: ${KNOWLEDGE.location}\n\nOr use the **Contact form** in the Contact section. He typically responds within 24 hours! ⚡`;
  }

  // ── Education ──
  if (q.match(/education|degree|university|college|study|academic|qualification/)) {
    const list = KNOWLEDGE.education
      .map((e) => `• **${e.degree}** — ${e.institution} (${e.period})`)
      .join("\n");
    return `🎓 Abhinav's educational background:\n\n${list}\n\nHis focus has been on software engineering, data structures, algorithms, and full-stack development.`;
  }

  // ── Certifications ──
  if (q.match(/cert|certification|credential|award|badge|course|training/)) {
    const list = KNOWLEDGE.certifications
      .map((c) => `• **${c.title}** — ${c.issuer} (${c.year})`)
      .join("\n");
    return `🏅 Abhinav holds **${KNOWLEDGE.certifications.length} certifications**:\n\n${list}\n\nThese cover Python, Django, MERN Stack, AI, and more from top companies including Cisco, Accenture, and Deloitte.`;
  }

  // ── Availability / hire ──
  if (q.match(/available|hire|opportunity|job|work|freelance|full.time|contract|open/)) {
    return `✅ **Yes! Abhinav is currently available** for:\n\n• Full-time software engineering roles\n• Freelance web development projects\n• Open-source collaborations\n• AI/ML consulting\n\nHe's open to remote, hybrid, or on-site opportunities. Reach out via the **Contact section** or email directly at abhinavtripathi6sep@gmail.com! 🚀`;
  }

  // ── Resume ──
  if (q.match(/resume|cv|download/)) {
    return `📄 You can **download Abhinav's resume** by clicking the "Download CV" button in the Hero section or the "Resume" link in the navbar. It includes his full work history, skills, education, and certifications.`;
  }

  // ── Experience / years ──
  if (q.match(/experience|year|how long|senior|junior|level|professional/)) {
    return `⏱️ Abhinav has **3+ years of experience** in full-stack development. He started with web fundamentals and grew into a full-stack developer proficient in React, Python, Django, Node.js, and AI/ML.\n\nHe has built 10+ production projects and holds certifications from top companies like Deloitte, Accenture, and Cisco.`;
  }

  // ── Backend ──
  if (q.match(/backend|server|api|django|fastapi|node|express|database|sql|mongo/)) {
    return `⚙️ Abhinav's backend expertise:\n\n• **Python** — Django, FastAPI, Flask (primary)\n• **Node.js** — Express.js, REST APIs\n• **Databases** — PostgreSQL, MongoDB, MySQL, SQLite\n• **Cloud** — AWS EC2 & S3, Vercel, Netlify\n• **Tools** — Docker (basics), Git, GitHub\n\nHe designs clean RESTful APIs and has deployed multiple apps to cloud infrastructure.`;
  }

  // ── Frontend ──
  if (q.match(/frontend|react|angular|ui|ux|css|html|tailwind|design|interface/)) {
    return `🎨 Abhinav's frontend expertise:\n\n• **React.js** (90%) — his primary frontend framework\n• **Angular** — TypeScript, RxJS, component architecture\n• **HTML5 & CSS3** (92%) — pixel-perfect layouts\n• **Tailwind CSS** (80%) — utility-first styling\n• **UI/UX Design** (78%) — Figma-informed development\n• **Framer Motion & GSAP** — premium animations\n\nHe focuses on performance, accessibility, and stunning visuals.`;
  }

  // ── Default / fallback ──
  return `🤔 I'm Abhinav's AI Portfolio Assistant. I can answer questions about:\n\n• His **background & bio**\n• **Projects** he's built\n• **Skills & technologies**\n• **Education & certifications**\n• **Availability** for hire\n• **Contact** information\n\nTry asking: *"What are his best projects?"* or *"What skills does he have?"*`;
}

/* ─────────────────────────────────────────────────────────────
   Hook
───────────────────────────────────────────────────────────── */
export default function useAIAssistant() {
  const [messages, setMessages] = useState([
    {
      id:   0,
      from: "ai",
      text: `👋 Hi! I'm **Abhinav's AI Portfolio Assistant**. Ask me anything about his skills, projects, experience, or how to get in touch!\n\nYou can also tap the mic 🎤 to speak your question.`,
      ts:   Date.now(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback((text, onAIResponse) => {
    if (!text.trim()) return;

    const userMsg = {
      id:   Date.now(),
      from: "user",
      text: text.trim(),
      ts:   Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate "AI thinking" delay (300–900ms)
    const thinkTime = 300 + Math.random() * 600;
    setTimeout(() => {
      const answer = getAnswer(text);

      const aiMsg = {
        id:   Date.now() + 1,
        from: "ai",
        text: answer,
        ts:   Date.now(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      // Strip markdown for TTS (remove ** and * and links)
      const clean = answer
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/•/g, "")
        .replace(/🎤|👋|💻|📁|🤖|📬|🎓|🏅|✅|📄|⏱️|⚙️|🎨|🤔|🏆|⚡|🚀/g, "")
        .trim();

      if (onAIResponse) onAIResponse(clean);
    }, thinkTime);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id:   0,
        from: "ai",
        text: `👋 Hi! I'm **Abhinav's AI Portfolio Assistant**. Ask me anything about his skills, projects, experience, or how to get in touch!\n\nYou can also tap the mic 🎤 to speak your question.`,
        ts:   Date.now(),
      },
    ]);
  }, []);

  return { messages, isTyping, sendMessage, clearMessages };
}
