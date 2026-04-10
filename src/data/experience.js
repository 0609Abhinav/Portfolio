export const education = [
  {
    id: 1,
    degree: "Bachelor of Technology — Information Technology",
    institution: "Dr. A.P.J. Abdul Kalam Technical University",
    period: "2022 – 2025",
    description:
      "Focused on software engineering, data structures, algorithms, and full-stack web development.",
  },
  {
    id: 2,
    degree: "Diploma — Computer Science & Engineering",
    institution: "Board of Technical Education, Uttar Pradesh",
    period: "2019 – 2022",
    description:
      "Foundation in programming, networking, database management, and systems design.",
  },
  {
    id: 3,
    degree: "Secondary Education (10th Grade)",
    institution: "Maharshi Patanjali Vidya Mandir, CBSE",
    period: "2016",
    description: "Science stream with distinction.",
  },
];

export const certifications = [
  { id: 1, title: "Python with Django", issuer: "Techpile", year: "2023" },
  { id: 2, title: "MERN Stack Development", issuer: "Shape My Skills", year: "2023" },
  { id: 3, title: "Technology Job Simulation", issuer: "Deloitte Australia (Forage)", year: "2024" },
  { id: 4, title: "Digital Skills: AI", issuer: "Accenture", year: "2024" },
  { id: 5, title: "Python Essentials 1", issuer: "Cisco", year: "2023" },
  { id: 6, title: "Python Basic", issuer: "HackerRank", year: "2023" },
  { id: 7, title: "PHP Development", issuer: "Acmegrade", year: "2022" },
];

export const personalInfo = {
  name: "Abhinav Tripathi",
  title: "Full-Stack Developer",
  tagline: "Building scalable web applications with modern technologies.",
  location: "Allahabad, India",
  email: process.env.REACT_APP_CONTACT_EMAIL || "contact@example.com",
  phone: process.env.REACT_APP_CONTACT_PHONE || "",
  github: "https://github.com/0609Abhinav",
  linkedin: "https://www.linkedin.com/in/abhinav-tripathi-770224253/",
  resume: "/resume.pdf",
};
