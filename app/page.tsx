"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "./generated-projects";

const experience = [
  { organization: "UT Dallas International Center", role: "Digital Marketing Assistant", dates: "2026 – Present", bullets: ["Analyze cross-unit website performance and accessibility data using Power BI and Silktide.", "Maintain and improve WordPress content across International Center webpages.", "Support data-informed digital content and accessibility improvements."] },
  { organization: "Leyton", role: "Financial Analyst Intern", dates: "2024", bullets: ["Analyzed financial and payroll data related to Employee Retention Tax Credit information.", "Reviewed payroll and receipt documentation for quality control and validation."] },
  { organization: "AMMC — Moroccan Capital Market Authority", role: "Benchmark Analyst Intern · Fintech Department", dates: "2023", bullets: ["Researched and benchmarked fintech developments across payments, RegTech, open banking, and embedded finance.", "Examined Banking-as-a-Service, blockchain, AI, and AML/CFT topics."] },
];

const education = [
  { school: "University of Texas at Dallas", credential: "MS Business Analytics & Artificial Intelligence", date: "Expected 2027" },
  { school: "Minot State University", credential: "BS Finance · Minor in Mathematics", date: "Graduated 2024" },
];

function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }

function DataFlowVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || !visualRef.current) return;
    const bounds = visualRef.current.getBoundingClientRect();
    visualRef.current.style.setProperty("--tilt-x", `${((event.clientX - bounds.left) / bounds.width - .5) * 5}px`);
    visualRef.current.style.setProperty("--tilt-y", `${((event.clientY - bounds.top) / bounds.height - .5) * 5}px`);
  }
  return <div ref={visualRef} className="data-flow" onPointerMove={handlePointerMove} onPointerLeave={() => { visualRef.current?.style.setProperty("--tilt-x", "0px"); visualRef.current?.style.setProperty("--tilt-y", "0px"); }} aria-label="Data workflow from raw data to decision" role="img">
    <div className="flow-header"><span><i className="status-dot" />SYSTEM FLOW</span><span>01—05</span></div>
    {[["01", "RAW DATA"], ["02", "PROCESS"], ["03", "MODEL"], ["04", "INSIGHT"], ["05", "DECISION"]].map(([number, name], index) => <div className="flow-unit" key={number}><div className={`flow-stage flow-stage--${index + 1}`}><span>{number}</span>{name}</div>{index < 4 && <div className="flow-connector"><i className={`data-pulse data-pulse--${index + 1}`} /></div>}</div>)}
    <div className="flow-footer">SIGNAL → USEFUL ACTION</div>
  </div>;
}

function ProjectVisual({ project }: { project: Project }) {
  // Project images are optional, user-supplied public assets; they remain unoptimized for static deployment.
  // eslint-disable-next-line @next/next/no-img-element
  if (project.image) return <img className="project-image" src={project.image} alt={project.imageAlt || ""} />;
  return project.category === "Financial Analytics" ? <div className="mini-visual mini-visual--risk" aria-hidden="true"><span className="axis axis--vertical" /><span className="axis axis--horizontal" /><span className="curve" /><span className="risk-label risk-label--low">LOW</span><span className="risk-label risk-label--high">HIGH</span><i className="distribution-dot distribution-dot--one" /><i className="distribution-dot distribution-dot--two" /></div> : <div className="mini-visual mini-visual--growth" aria-hidden="true"><span className="chart-rule chart-rule--one" /><span className="chart-rule chart-rule--two" /><span className="chart-rule chart-rule--three" /><span className="chart-bar chart-bar--one" /><span className="chart-bar chart-bar--two" /><span className="chart-bar chart-bar--three" /><span className="chart-bar chart-bar--four" /><span className="chart-line"><i /><i /><i /><i /></span><span className="chart-caption">RETAIL SIGNALS</span></div>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className={`project-card project-card--${index + 1} reveal`}><div className="project-topline"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.category}</span></div><ProjectVisual project={project} /><div className="project-copy"><h3>{project.title}</h3><p>{project.description}</p><p className="methods">{project.methods}</p><div className="project-links">{project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>}{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">View project <Arrow /></a>}</div></div></article>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .13 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    const onScroll = () => setIsScrolled(window.scrollY > 24); window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return <main>
    <nav className={`navbar ${isScrolled ? "navbar--compact" : ""}`} aria-label="Primary navigation"><a className="wordmark" href="#about" onClick={closeMenu}>HAFSA SADKAOUI</a><button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="site-nav"><span className="sr-only">Toggle navigation</span><span /><span /></button><div id="site-nav" className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}><a href="#about" onClick={closeMenu}>About</a><a href="#experience" onClick={closeMenu}>Experience</a><a href="#projects" onClick={closeMenu}>Projects</a><a href="#contact" onClick={closeMenu}>Contact</a><a href="/resume.pdf" target="_blank" rel="noreferrer">Resume <Arrow /></a></div></nav>
    <section id="about" className="hero section-shell" aria-labelledby="hero-title"><div className="hero-copy reveal is-visible"><p className="eyebrow">DATA · ANALYTICS · AI</p><h1 id="hero-title">Hi, I&apos;m Hafsa<br />Sadkaoui.</h1><p className="hero-lede">I work at the intersection of data, business, and AI — turning complex datasets into models, systems, and decisions.</p><p className="hero-detail">MS Business Analytics &amp; AI @ UT Dallas <span>·</span> Finance background</p><div className="hero-actions"><a className="button button--solid" href="#projects">Explore My Work <Arrow /></a><a className="button button--line" href="#contact">Get in Touch <Arrow /></a></div></div><div className="hero-visual reveal is-visible"><DataFlowVisual /></div><div className="hero-index" aria-hidden="true"><span>01</span><i /> SCROLL TO EXPLORE</div></section>
    <section id="experience" className="experience section-shell" aria-labelledby="experience-title"><div className="section-heading reveal"><p className="eyebrow">SELECTED EXPERIENCE</p><h2 id="experience-title">Analysis, research,<br />and digital systems.</h2><p>I bring financial context and analytical rigor to work that makes information more useful.</p></div><div className="timeline">{experience.map((item, index) => <article className="timeline-entry reveal" key={item.organization}><div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div><div className="timeline-date">{item.dates}</div><div className="timeline-content"><h3>{item.organization}</h3><p className="role">{item.role}</p><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</div><div className="education reveal"><p className="eyebrow">EDUCATION</p><div className="education-grid">{education.map((item) => <div key={item.school}><p className="education-date">{item.date}</p><h3>{item.school}</h3><p>{item.credential}</p></div>)}</div></div></section>
    <section id="projects" className="projects" aria-labelledby="projects-title"><div className="projects-heading reveal"><div><p className="eyebrow">SELECTED PROJECTS</p><h2 id="projects-title">Evidence, modeled.</h2></div><p>Work spanning retail growth, lending risk, and the questions behind business decisions.</p></div><div className="projects-grid">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div><p className="projects-note reveal">MORE WORK IN PROGRESS <span>·</span> PROJECTS ARE ADDED AS MARKDOWN</p></section>
    <section id="contact" className="contact section-shell" aria-labelledby="contact-title"><div className="contact-main reveal"><p className="eyebrow">CONTACT</p><h2 id="contact-title">Let&apos;s work on<br />something useful.</h2><p>For analytics, data, AI, and quantitative opportunities, I&apos;d be glad to connect.</p></div><address className="contact-links reveal"><a href="mailto:hafsa.sadkaoui@utdallas.edu"><span>Email</span><strong>hafsa.sadkaoui@utdallas.edu</strong><Arrow /></a><a href="https://www.linkedin.com/in/hafsasadkaoui" target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>linkedin.com/in/hafsasadkaoui</strong><Arrow /></a><a href="https://github.com/sadkaouihafsa" target="_blank" rel="noreferrer"><span>GitHub</span><strong>github.com/sadkaouihafsa</strong><Arrow /></a><p><span>Location</span><strong>Dallas, Texas</strong></p></address></section>
    <footer><span>© {new Date().getFullYear()} Hafsa Sadkaoui</span><span>DATA · ANALYTICS · AI</span></footer>
  </main>;
}
