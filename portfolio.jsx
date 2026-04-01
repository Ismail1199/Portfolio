import { useState, useEffect, useRef } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const ACCENT = "#00d4ff";
const ACCENT2 = "#7c3aed";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Skills", "Projects", "Certificates", "Achievements", "Contact"];

const SKILLS = {
  "Programming Languages": [
    { name: "C", icon: "🔷" },
    { name: "C++", icon: "⚙️" },
    { name: "Java", icon: "☕" },
    { name: "Python", icon: "🐍" },
    { name: "JavaScript", icon: "🟨" },
  ],
  Frontend: [
    { name: "HTML", icon: "🌐" },
    { name: "CSS", icon: "🎨" },
    { name: "React", icon: "⚛️" },
    { name: "Tailwind CSS", icon: "💨" },
  ],
  Backend: [
    { name: "Node.js", icon: "🟩" },
    { name: "Express", icon: "🚂" },
  ],
  Tools: [
    { name: "Git", icon: "🌿" },
    { name: "GitHub", icon: "🐙" },
    { name: "VS Code", icon: "💙" },
    { name: "Docker", icon: "🐳" },
  ],
  Concepts: [
    { name: "DSA", icon: "🧩" },
    { name: "OOP", icon: "🏗️" },
    { name: "OS", icon: "🖥️" },
    { name: "DBMS", icon: "🗄️" },
  ],
};

const PROJECTS = [
  {
    title: "DevConnect Platform",
    desc: "A full-stack developer networking app with real-time chat, profile matching, and project collaboration features.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com",
    live: "https://demo.example.com",
    color: "#00d4ff",
  },
  {
    title: "AlgoVisualizer",
    desc: "Interactive visualization tool for sorting and pathfinding algorithms with step-by-step animation controls.",
    tech: ["React", "D3.js", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://demo.example.com",
    color: "#7c3aed",
  },
  {
    title: "SmartExpense Tracker",
    desc: "AI-powered expense tracking app with budget analytics, charts, and expense categorization using ML.",
    tech: ["Python", "Flask", "React", "PostgreSQL"],
    github: "https://github.com",
    live: null,
    color: "#10b981",
  },
  {
    title: "CloudFileManager",
    desc: "Secure cloud file storage system with folder hierarchy, sharing links, and end-to-end encryption.",
    tech: ["Node.js", "Express", "AWS S3", "React"],
    github: "https://github.com",
    live: "https://demo.example.com",
    color: "#f59e0b",
  },
  {
    title: "CodeReview Bot",
    desc: "GitHub bot that automatically reviews PRs, checks code style, detects bugs, and suggests improvements.",
    tech: ["Python", "GitHub API", "OpenAI API"],
    github: "https://github.com",
    live: null,
    color: "#ef4444",
  },
  {
    title: "EduLearn Portal",
    desc: "Online learning platform with video courses, quizzes, progress tracking, and certificate generation.",
    tech: ["React", "Node.js", "MySQL", "Docker"],
    github: "https://github.com",
    live: "https://demo.example.com",
    color: "#06b6d4",
  },
];

const CERTIFICATES = [
  {
    title: "AWS Certified Cloud Practitioner",
    org: "Amazon Web Services",
    date: "Dec 2024",
    badge: "☁️",
    color: "#f59e0b",
  },
  {
    title: "Meta Front-End Developer",
    org: "Meta / Coursera",
    date: "Oct 2024",
    badge: "📘",
    color: "#3b82f6",
  },
  {
    title: "Google Data Analytics",
    org: "Google / Coursera",
    date: "Aug 2024",
    badge: "📊",
    color: "#10b981",
  },
  {
    title: "JavaScript Algorithms & DS",
    org: "freeCodeCamp",
    date: "Jun 2024",
    badge: "🏆",
    color: "#7c3aed",
  },
  {
    title: "Python for Everybody",
    org: "University of Michigan",
    date: "Mar 2024",
    badge: "🐍",
    color: "#00d4ff",
  },
  {
    title: "System Design Fundamentals",
    org: "Educative.io",
    date: "Jan 2024",
    badge: "🏗️",
    color: "#ef4444",
  },
];

const ACHIEVEMENTS = [
  {
    year: "2025",
    title: "SDE Intern — Microsoft",
    desc: "Selected for Microsoft's competitive summer internship program. Worked on Azure DevOps tooling improvements.",
    icon: "💼",
    type: "internship",
  },
  {
    year: "2024",
    title: "1st Place — National Hackathon",
    desc: "Won first place among 500+ teams at HackIndia 2024, building a real-time disaster response coordination platform.",
    icon: "🥇",
    type: "award",
  },
  {
    year: "2024",
    title: "LeetCode 1800+ Rating",
    desc: "Achieved a contest rating of 1800+ on LeetCode with 400+ problems solved across all difficulty levels.",
    icon: "⚡",
    type: "coding",
  },
  {
    year: "2024",
    title: "Top 3% — Codeforces (Expert)",
    desc: "Reached Expert rank on Codeforces, placing consistently in top 3% globally in competitive programming contests.",
    icon: "🏅",
    type: "coding",
  },
  {
    year: "2023",
    title: "Dean's List — Academic Excellence",
    desc: "Awarded Dean's List recognition for achieving 9.4/10 CGPA in the third year of B.Tech Computer Science.",
    icon: "🎓",
    type: "academic",
  },
  {
    year: "2023",
    title: "Open Source Contributor — GSOC",
    desc: "Selected as a Google Summer of Code contributor, contributing to Mozilla's accessibility tooling project.",
    icon: "🌐",
    type: "opensource",
  },
];

// ─── ICONS (SVG inline, no external dependency) ───────────────────────────────
const GithubIcon = ({ size = 20, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MailIcon = ({ size = 20, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = ({ size = 20, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const ExternalLinkIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" x2="21" y1="14" y2="3"/>
  </svg>
);

const DownloadIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
);

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function AnimSection({ children, className = "" }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for active nav
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.toLowerCase()));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSend = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    }
  };

  // Theme vars
  const bg = dark ? "#0a0a0f" : "#f8f9fc";
  const bg2 = dark ? "#111118" : "#ffffff";
  const bg3 = dark ? "#16161f" : "#f1f3f8";
  const text = dark ? "#e8eaf0" : "#1a1a2e";
  const textMuted = dark ? "#6b7280" : "#64748b";
  const border = dark ? "#1e2030" : "#e2e8f0";
  const cardBg = dark ? "#13131c" : "#ffffff";

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: ${bg}; color: ${text}; transition: background 0.3s, color 0.3s; }
    ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${bg}; } ::-webkit-scrollbar-thumb { background: ${ACCENT}44; border-radius: 99px; }
    .font-display { font-family: 'Syne', sans-serif; }
    .font-mono { font-family: 'DM Mono', monospace; }
    .gradient-text { background: linear-gradient(135deg, ${ACCENT}, ${ACCENT2}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .accent-glow { box-shadow: 0 0 30px ${ACCENT}33; }
    .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px ${ACCENT}22; }
    .skill-card:hover .skill-icon { transform: scale(1.2) rotate(10deg); }
    .skill-icon { transition: transform 0.3s ease; }
    .btn-primary { background: linear-gradient(135deg, ${ACCENT}, ${ACCENT2}); color: #fff; border: none; cursor: pointer; transition: opacity 0.2s, transform 0.2s; }
    .btn-primary:hover { opacity: 0.88; transform: translateY(-2px); }
    .btn-outline { background: transparent; border: 1.5px solid ${ACCENT}66; color: ${text}; cursor: pointer; transition: all 0.2s; }
    .btn-outline:hover { border-color: ${ACCENT}; background: ${ACCENT}11; transform: translateY(-2px); }
    input, textarea { background: ${bg3}; border: 1.5px solid ${border}; color: ${text}; font-family: 'DM Sans', sans-serif; transition: border 0.2s; }
    input:focus, textarea:focus { outline: none; border-color: ${ACCENT}88; }
    .timeline-dot { background: linear-gradient(135deg, ${ACCENT}, ${ACCENT2}); }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
    @keyframes pulse-ring { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
    @keyframes gradient-shift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
    .float-anim { animation: float 4s ease-in-out infinite; }
    .hero-blob { background: radial-gradient(ellipse at 60% 50%, ${ACCENT}18 0%, ${ACCENT2}12 40%, transparent 70%); animation: gradient-shift 8s ease infinite; background-size: 200% 200%; }
    .skill-bar-fill { transition: width 1.2s cubic-bezier(.4,0,.2,1); }
    .nav-link { position: relative; } .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background: linear-gradient(90deg,${ACCENT},${ACCENT2}); transition:width 0.3s; border-radius:2px; } .nav-link:hover::after, .nav-link.active::after { width:100%; }
    .grid-bg { background-image: linear-gradient(${border} 1px, transparent 1px), linear-gradient(90deg, ${border} 1px, transparent 1px); background-size: 48px 48px; }
    .noise::after { content:''; position:fixed; inset:0; pointer-events:none; z-index:999; opacity:0.025; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="noise" style={{ minHeight: "100vh", background: bg, color: text }}>

        {/* ── NAVBAR ─────────────────────────────────────────── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? (dark ? "rgba(10,10,15,0.92)" : "rgba(248,249,252,0.92)") : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${border}` : "none",
          transition: "all 0.3s",
          padding: "0 max(24px, calc((100vw - 1200px)/2))",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
            {/* Logo */}
            <div className="font-display" style={{ fontSize: 22, fontWeight: 800, cursor: "pointer" }} onClick={() => scrollTo("about")}>
              <span className="gradient-text">{"<Alex.Dev />"}</span>
            </div>

            {/* Desktop Nav */}
            <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden-mobile">
              {NAV_LINKS.map(l => (
                <button
                  key={l}
                  className={`nav-link font-mono ${activeSection === l.toLowerCase() ? "active" : ""}`}
                  onClick={() => scrollTo(l)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: activeSection === l.toLowerCase() ? ACCENT : textMuted, fontSize: 13, fontWeight: 500, padding: "4px 0", letterSpacing: "0.04em", transition: "color 0.2s" }}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Right Icons */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {[
                { icon: <GithubIcon size={18}/>, href: "https://github.com", label: "GitHub" },
                { icon: <LinkedinIcon size={18}/>, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: <MailIcon size={18}/>, href: "mailto:alex@email.com", label: "Email" },
                { icon: <PhoneIcon size={18}/>, href: "tel:+91-9876543210", label: "Phone" },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                  style={{ color: textMuted, padding: 8, borderRadius: 8, display: "flex", transition: "color 0.2s, background 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.background = dark ? "#ffffff08" : "#00000008"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = textMuted; e.currentTarget.style.background = "transparent"; }}
                >
                  {icon}
                </a>
              ))}
              <button onClick={() => setDark(!dark)}
                style={{ background: dark ? "#ffffff0f" : "#0000000a", border: "none", cursor: "pointer", color: dark ? "#f0c040" : "#6b7280", padding: "8px 10px", borderRadius: 8, display: "flex", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = dark ? "#ffffff18" : "#0000001a"}
                onMouseLeave={e => e.currentTarget.style.background = dark ? "#ffffff0f" : "#0000000a"}
              >
                {dark ? <SunIcon/> : <MoonIcon/>}
              </button>
              <button className="mobile-only" onClick={() => setMenuOpen(!menuOpen)}
                style={{ background: "none", border: "none", cursor: "pointer", color: text, display: "none", padding: 4 }}
              >
                {menuOpen ? <CloseIcon/> : <MenuIcon/>}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div style={{ background: dark ? "#111118" : "#fff", borderTop: `1px solid ${border}`, padding: "16px 0", display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_LINKS.map(l => (
                <button key={l} onClick={() => scrollTo(l)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: activeSection === l.toLowerCase() ? ACCENT : text, fontSize: 15, fontWeight: 500, padding: "12px 24px", textAlign: "left", transition: "color 0.2s" }}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* ── HERO / ABOUT ───────────────────────────────────── */}
        <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 68, position: "relative", overflow: "hidden", padding: "68px max(24px, calc((100vw - 1200px)/2)) 80px" }}>
          <div className="hero-blob" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}/>
          <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }}/>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 60, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            {/* Text */}
            <div style={{ flex: "1 1 480px", maxWidth: 600 }}>
              <div className="font-mono" style={{ color: ACCENT, fontSize: 13, letterSpacing: "0.12em", marginBottom: 16, opacity: 0.9 }}>
                👋 &nbsp;Hello, World! — I am
              </div>
              <h1 className="font-display" style={{ fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.08, marginBottom: 16 }}>
                Alex<br/>
                <span className="gradient-text">Johnson</span>
              </h1>
              <div className="font-display" style={{ fontSize: "clamp(16px, 2.5vw, 22px)", color: textMuted, fontWeight: 500, marginBottom: 24 }}>
                Aspiring Software Development Engineer
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: textMuted, maxWidth: 520, marginBottom: 36 }}>
                Final-year Computer Science student passionate about building scalable systems and elegant user experiences.
                I love turning complex problems into clean, efficient solutions—from low-level algorithms to full-stack applications.
                Currently looking for SDE opportunities at product-based companies.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a href="/resume.pdf" download>
                  <button className="btn-primary font-display" style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600 }}>
                    <DownloadIcon/> Download CV
                  </button>
                </a>
                <button className="btn-outline font-display" onClick={() => scrollTo("projects")}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600 }}>
                  View Projects →
                </button>
              </div>

              {/* Quick stats */}
              <div style={{ display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap" }}>
                {[["3+", "Years Coding"], ["15+", "Projects Built"], ["400+", "LeetCode Solved"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display gradient-text" style={{ fontSize: 28, fontWeight: 800 }}>{n}</div>
                    <div style={{ fontSize: 12, color: textMuted, marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile photo */}
            <div className="float-anim" style={{ flex: "0 0 auto", position: "relative" }}>
              <div style={{
                width: 280, height: 280,
                borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
                background: `linear-gradient(135deg, ${ACCENT}33, ${ACCENT2}33)`,
                border: `2px solid ${ACCENT}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 100, position: "relative",
                boxShadow: `0 0 60px ${ACCENT}22, 0 0 120px ${ACCENT2}11`,
              }}>
                👨‍💻
                {/* Orbiting badge */}
                <div style={{
                  position: "absolute", top: -10, right: -10,
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                  borderRadius: "50%", width: 60, height: 60,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, boxShadow: `0 4px 20px ${ACCENT}55`,
                }}>⚡</div>
              </div>
              {/* Glow ring */}
              <div style={{
                position: "absolute", inset: -20,
                borderRadius: "50%", border: `1px solid ${ACCENT}22`,
                animation: "pulse-ring 3s ease-out infinite",
              }}/>
            </div>
          </div>
        </section>

        {/* ── SKILLS ─────────────────────────────────────────── */}
        <section id="skills" style={{ padding: "80px max(24px, calc((100vw - 1200px)/2))", background: bg2, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
          <AnimSection>
            <SectionHeader accent={ACCENT} label="What I Work With" title="Skills & Technologies"/>
          </AnimSection>

          {Object.entries(SKILLS).map(([cat, items], ci) => (
            <AnimSection key={cat} className="" style={{ transitionDelay: `${ci * 0.1}s` }}>
              <div style={{ marginBottom: 40 }}>
                <div className="font-mono" style={{ fontSize: 12, color: ACCENT, letterSpacing: "0.1em", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ display: "inline-block", width: 24, height: 1.5, background: ACCENT, borderRadius: 2 }}/>
                  {cat.toUpperCase()}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 14 }}>
                  {items.map(({ name, icon }) => (
                    <div key={name} className="card-hover skill-card"
                      style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 14, padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "default" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT + "66"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = border; }}
                    >
                      <span className="skill-icon" style={{ fontSize: 28 }}>{icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: text, textAlign: "center" }}>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimSection>
          ))}
        </section>

        {/* ── PROJECTS ───────────────────────────────────────── */}
        <section id="projects" style={{ padding: "80px max(24px, calc((100vw - 1200px)/2))" }}>
          <AnimSection>
            <SectionHeader accent={ACCENT} label="What I've Built" title="Featured Projects"/>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <AnimSection key={p.title}>
                <div className="card-hover"
                  style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 20, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + "55"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = border; }}
                >
                  {/* Top bar */}
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${p.color}, ${p.color}88)` }}/>
                  <div style={{ padding: 28, flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: text }}>{p.title}</h3>
                      <div style={{ display: "flex", gap: 8 }}>
                        <a href={p.github} target="_blank" rel="noreferrer"
                          style={{ color: textMuted, display: "flex", padding: 6, borderRadius: 8, background: bg3, transition: "color 0.2s" }}
                          onMouseEnter={e => e.currentTarget.style.color = ACCENT}
                          onMouseLeave={e => e.currentTarget.style.color = textMuted}
                        ><GithubIcon size={16}/></a>
                        {p.live && (
                          <a href={p.live} target="_blank" rel="noreferrer"
                            style={{ color: textMuted, display: "flex", padding: 6, borderRadius: 8, background: bg3, transition: "color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = p.color}
                            onMouseLeave={e => e.currentTarget.style.color = textMuted}
                          ><ExternalLinkIcon size={16}/></a>
                        )}
                      </div>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: textMuted, marginBottom: 20, flex: 1 }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {p.tech.map(t => (
                        <span key={t} className="font-mono"
                          style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: p.color + "15", color: p.color, fontWeight: 500 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </section>

        {/* ── CERTIFICATES ───────────────────────────────────── */}
        <section id="certificates" style={{ padding: "80px max(24px, calc((100vw - 1200px)/2))", background: bg2, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
          <AnimSection>
            <SectionHeader accent={ACCENT} label="Credentials" title="Certificates"/>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {CERTIFICATES.map((c) => (
              <AnimSection key={c.title}>
                <div className="card-hover"
                  style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 16, padding: 24, display: "flex", gap: 18, alignItems: "flex-start" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = c.color + "55"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = border; }}
                >
                  <div style={{ fontSize: 32, flexShrink: 0, width: 52, height: 52, borderRadius: 12, background: c.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>{c.badge}</div>
                  <div style={{ flex: 1 }}>
                    <div className="font-display" style={{ fontSize: 15, fontWeight: 700, color: text, marginBottom: 4 }}>{c.title}</div>
                    <div style={{ fontSize: 13, color: c.color, fontWeight: 500, marginBottom: 2 }}>{c.org}</div>
                    <div className="font-mono" style={{ fontSize: 11, color: textMuted, marginBottom: 12 }}>{c.date}</div>
                    <a href="#" style={{ fontSize: 12, color: ACCENT, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
                      onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                      onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                    >
                      View Certificate <ExternalLinkIcon size={11}/>
                    </a>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </section>

        {/* ── ACHIEVEMENTS ───────────────────────────────────── */}
        <section id="achievements" style={{ padding: "80px max(24px, calc((100vw - 1200px)/2))" }}>
          <AnimSection>
            <SectionHeader accent={ACCENT} label="Milestones" title="Achievements"/>
          </AnimSection>

          <div style={{ position: "relative", maxWidth: 760 }}>
            {/* Timeline line */}
            <div style={{ position: "absolute", left: 24, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${ACCENT}66, ${ACCENT2}44, transparent)`, borderRadius: 2 }}/>

            {ACHIEVEMENTS.map((a, i) => (
              <AnimSection key={a.title}>
                <div style={{ display: "flex", gap: 32, marginBottom: 36, paddingLeft: 16, position: "relative" }}>
                  {/* Dot */}
                  <div className="timeline-dot" style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 4, marginLeft: -7, border: `2px solid ${bg}`, boxShadow: `0 0 10px ${ACCENT}55` }}/>

                  <div className="card-hover" style={{ flex: 1, background: cardBg, border: `1.5px solid ${border}`, borderRadius: 16, padding: 24 }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = ACCENT + "44"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = border}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 22 }}>{a.icon}</span>
                        <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: text }}>{a.title}</h3>
                      </div>
                      <span className="font-mono" style={{ fontSize: 11, color: ACCENT, background: ACCENT + "18", padding: "3px 10px", borderRadius: 6, fontWeight: 600 }}>{a.year}</span>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: textMuted }}>{a.desc}</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </section>

        {/* ── CONTACT ────────────────────────────────────────── */}
        <section id="contact" style={{ padding: "80px max(24px, calc((100vw - 1200px)/2))", background: bg2, borderTop: `1px solid ${border}` }}>
          <AnimSection>
            <SectionHeader accent={ACCENT} label="Let's Connect" title="Get In Touch"/>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
            {/* Info */}
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: textMuted, marginBottom: 36, maxWidth: 420 }}>
                I'm actively looking for SDE opportunities and internships. If you have a role that might be a good fit, or just want to chat about tech — my inbox is always open!
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { icon: <MailIcon size={18}/>, label: "Email", value: "alex.johnson@email.com", href: "mailto:alex.johnson@email.com" },
                  { icon: <PhoneIcon size={18}/>, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                  { icon: <LinkedinIcon size={18}/>, label: "LinkedIn", value: "linkedin.com/in/alexjohnson", href: "https://linkedin.com" },
                  { icon: <GithubIcon size={18}/>, label: "GitHub", value: "github.com/alexjohnson", href: "https://github.com" },
                ].map(({ icon, label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: cardBg, border: `1.5px solid ${border}`, borderRadius: 12, textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT + "55"; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.transform = "translateX(0)"; }}
                  >
                    <div style={{ color: ACCENT, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: 11, color: textMuted, fontWeight: 500 }}>{label}</div>
                      <div style={{ fontSize: 14, color: text, fontWeight: 600 }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { key: "name", type: "text", placeholder: "Your Name", label: "Name" },
                  { key: "email", type: "email", placeholder: "your@email.com", label: "Email" },
                ].map(({ key, type, placeholder, label }) => (
                  <div key={key}>
                    <label style={{ fontSize: 12, color: textMuted, display: "block", marginBottom: 6, fontWeight: 500 }}>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      style={{ width: "100%", padding: "13px 16px", borderRadius: 10, fontSize: 14, display: "block" }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 12, color: textMuted, display: "block", marginBottom: 6, fontWeight: 500 }}>Message</label>
                  <textarea
                    placeholder="Tell me about the role or just say hello…"
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ width: "100%", padding: "13px 16px", borderRadius: 10, fontSize: 14, resize: "vertical", display: "block" }}
                  />
                </div>
                <button className="btn-primary font-display" onClick={handleSend}
                  style={{ padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                >
                  {sent ? "✅ Message Sent!" : "Send Message →"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────── */}
        <footer style={{ padding: "32px max(24px, calc((100vw - 1200px)/2))", borderTop: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span className="font-mono" style={{ fontSize: 12, color: textMuted }}>
            © 2025 <span style={{ color: ACCENT }}>Alex Johnson</span> · Built with React & ❤️
          </span>
          <span className="font-mono" style={{ fontSize: 12, color: textMuted }}>
            Designed for opportunities at top tech companies
          </span>
        </footer>

        {/* Mobile CSS override */}
        <style>{`
          @media (max-width: 768px) {
            .hidden-mobile { display: none !important; }
            .mobile-only { display: flex !important; }
          }
          @media (min-width: 769px) {
            .mobile-only { display: none !important; }
          }
        `}</style>
      </div>
    </>
  );
}

// ─── SECTION HEADER COMPONENT ─────────────────────────────────────────────────
function SectionHeader({ accent, label, title }) {
  return (
    <div style={{ marginBottom: 52 }}>
      <div className="font-mono" style={{ fontSize: 12, color: accent, letterSpacing: "0.14em", marginBottom: 10 }}>
        ◆ &nbsp;{label.toUpperCase()}
      </div>
      <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800 }}>{title}</h2>
      <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}44)`, borderRadius: 2, marginTop: 16 }}/>
    </div>
  );
}
