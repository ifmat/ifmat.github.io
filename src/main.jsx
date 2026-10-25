import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Github, Linkedin, Mail, ArrowUpRight, Code2, Database, Layers3, Terminal,
  ExternalLink, Menu, Monitor, BriefcaseBusiness, GraduationCap, Globe, Send,
  Sparkles, Server, ShoppingBag, School, Wrench, GitFork, Star, Clock3
} from 'lucide-react';
import './style.css';

const GITHUB_USERNAME = 'ifmat';
const githubProfile = `https://github.com/${GITHUB_USERNAME}`;
const socials = {
  github: githubProfile,
  linkedin: 'https://www.linkedin.com/in/matin-afzali',
  telegram: 'https://t.me/comatozze_rfs666',
  email: 'Matin.Afzali.Dev@gmail.com'
};

const projects = [
  {
    number: '01', icon: School, name: 'School Management Automation',
    type: 'Web Application · Education',
    description: 'A school workflow management system covering attendance, grades, student and staff workflows, reports, and role-based panels.',
    tags: ['PHP', 'WordPress', 'School Automation'], status: 'Product', link: 'https://lastbell.ir', linkLabel: 'Visit website'
  },
  {
    number: '02', icon: Server, name: 'Gamer Management Tool',
    type: 'WordPress · Custom Uploader',
    description: 'A WordPress-based project focused on managing gamer-related information and a custom uploader workflow.',
    tags: ['WordPress', 'PHP', 'Uploader'], status: 'Personal project', link: githubProfile, linkLabel: 'Browse GitHub'
  },
  {
    number: '03', icon: ShoppingBag, name: 'Online Store Website',
    type: 'E-commerce · WordPress',
    description: 'A store website project built around product presentation and the core experience of browsing an online shop.',
    tags: ['WordPress', 'E-commerce', 'Web Design'], status: 'Website project', link: githubProfile, linkLabel: 'Browse GitHub'
  }
];

const matrix = [
  { title: 'Backend Development', icon: Code2, score: 70, tone: 'mint', items: ['PHP', 'Laravel', 'WordPress', 'REST APIs', 'Server-side logic'] },
  { title: 'Frontend Stack', icon: Layers3, score: 45, tone: 'blue', items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Tailwind CSS', 'React'] },
  { title: 'Database', icon: Database, score: 55, tone: 'violet', items: ['MySQL', 'SQL', 'Relational data', 'CRUD workflows'] },
  { title: 'Operating Systems', icon: Monitor, score: 65, tone: 'gold', items: ['Windows', 'Linux', 'Ubuntu', 'Command line'] },
  { title: 'Developer Tools', icon: Wrench, score: 60, tone: 'pink', items: ['Git', 'GitHub', 'Postman', 'PhpStorm', 'VS Code', 'npm'] },
  { title: 'Web Integration', icon: Globe, score: 50, tone: 'cyan', items: ['AJAX', 'jQuery', 'Responsive UI', 'API integration'] }
];

const experience = [
  { period: '6 months', role: 'Programmer', company: 'Law Office', description: 'Worked on programming tasks and website-related development in a legal-office environment.', icon: Code2 },
  { period: '3 months', role: 'Website Administrator', company: 'Tourism Website', description: 'Handled day-to-day website administration and content-related tasks for a tourism website.', icon: Globe },
  { period: '1 month', role: 'Website Support', company: 'Company Website', description: 'Provided website support and helped with routine website issues and maintenance.', icon: BriefcaseBusiness }
];

function Starfield() {
  const stars = Array.from({ length: 42 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 11) % 100}%`,
    top: `${(i * 61 + 7) % 100}%`,
    delay: `${(i % 9) * -0.7}s`,
    duration: `${3 + (i % 5)}s`,
    size: `${1 + (i % 3) * 0.6}px`
  }));
  return <div className="starfield" aria-hidden="true">{stars.map(star => <i key={star.id} style={{ left: star.left, top: star.top, animationDelay: star.delay, animationDuration: star.duration, width: star.size, height: star.size }} />)}</div>;
}

function App() {
  const [typedRole, setTypedRole] = useState('');
  const [repos, setRepos] = useState([]);
  const [repoState, setRepoState] = useState('loading');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const phrases = ['Backend Developer', 'PHP & Laravel Developer', 'Web Application Builder'];
    let phraseIndex = 0, charIndex = 0, deleting = false, timeout;
    const tick = () => {
      const phrase = phrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      setTypedRole(phrase.slice(0, charIndex));
      let delay = deleting ? 45 : 82;
      if (!deleting && charIndex === phrase.length) { deleting = true; delay = 1500; }
      else if (deleting && charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 300; }
      timeout = setTimeout(tick, delay);
    };
    timeout = setTimeout(tick, 350);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let active = true;
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
      .then(response => { if (!response.ok) throw new Error('GitHub API unavailable'); return response.json(); })
      .then(data => {
        if (!active) return;
        const sorted = data.filter(repo => !repo.fork).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 6);
        setRepos(sorted);
        setRepoState('ready');
      })
      .catch(() => { if (active) setRepoState('error'); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [repos, repoState]);

  return <div className="app-shell">
    <Starfield />
    <div className="aurora aurora-one" aria-hidden="true" />
    <div className="aurora aurora-two" aria-hidden="true" />
    <div className="grid-overlay" aria-hidden="true" />

    <header className="nav wrap glass-panel">
      <a className="brand" href="#home" aria-label="ifmat home"><span className="brand-mark">&lt;/&gt;</span><span>ifmat<span className="brand-dot">.</span></span></a>
      <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu size={20}/></button>
      <nav className={mobileMenuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation" onClick={() => setMobileMenuOpen(false)}>
        <a href="#about">About</a><a href="#matrix">Technical Matrix</a><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#github">Repositories</a><a href="#contact" className="nav-cta">Contact <ArrowUpRight size={15}/></a>
      </nav>
    </header>

    <main>
      <section className="hero wrap" id="home">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span className="status-dot" /> OPEN TO OPPORTUNITIES <Sparkles size={13}/></div>
          <p className="kicker">HELLO, I'M MATIN AFZALI</p>
          <h1>Building useful<br/><span className="gradient-text">digital experiences.</span></h1>
          <div className="typed-line"><span className="typed-prefix">&gt;</span> <span>{typedRole}</span><i className="typing-cursor" /></div>
          <p className="hero-desc">I build and maintain web applications with a backend-first mindset, using PHP, Laravel, WordPress, and the frontend tools needed to bring products to life.</p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a>
            <a className="button secondary" href={`mailto:${socials.email}`}><Mail size={17}/> Get in touch</a>
          </div>
          <div className="social-row">
            <a href={socials.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a>
            <a href={socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a>
            <a href={socials.telegram} target="_blank" rel="noreferrer"><Send size={16}/> Telegram</a>
            <span className="social-separator"></span><span className="location">Mashhad, Iran</span>
          </div>
        </div>
        <aside className="code-card glass-panel reveal" aria-label="Developer profile card">
          <div className="code-top"><div className="window-dots"><i/><i/><i/></div><span>matin.profile.ts</span><span className="code-live">● LIVE</span></div>
          <div className="code-body">
            <p><span className="line-no">01</span><span className="syntax-purple">const</span> developer = {'{'}</p>
            <p><span className="line-no">02</span>&nbsp;&nbsp;name: <span className="syntax-green">'Matin Afzali'</span>,</p>
            <p><span className="line-no">03</span>&nbsp;&nbsp;role: <span className="syntax-green">'Backend Developer'</span>,</p>
            <p><span className="line-no">04</span>&nbsp;&nbsp;backend: [<span className="syntax-orange">'PHP'</span>, <span className="syntax-orange">'Laravel'</span>,</p>
            <p><span className="line-no">05</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-orange">'WordPress'</span>, <span className="syntax-orange">'MySQL'</span>],</p>
            <p><span className="line-no">06</span>&nbsp;&nbsp;frontend: [<span className="syntax-orange">'React'</span>, <span className="syntax-orange">'JS'</span>],</p>
            <p><span className="line-no">07</span>&nbsp;&nbsp;systems: [<span className="syntax-green">'Windows'</span>, <span className="syntax-green">'Linux'</span>]</p>
            <p><span className="line-no">08</span>{'}'};</p>
            <div className="code-divider"/><p className="code-comment"><span className="line-no">09</span>// Make it work. Make it useful.</p>
          </div>
          <div className="code-footer"><span><span className="status-dot"/> Building practical solutions</span><span>ifmat / profile</span></div>
          <div className="floating-chip chip-one"><Code2 size={15}/> PHP / Laravel</div>
          <div className="floating-chip chip-two"><Sparkles size={15}/> Always improving</div>
        </aside>
        <a className="scroll-cue" href="#about"><span/> SCROLL TO EXPLORE</a>
      </section>

      <section className="section wrap" id="about">
        <div className="section-heading reveal"><p className="kicker">01 / ABOUT ME</p><h2>Curious by nature.<br/><span className="muted">Driven to build.</span></h2></div>
        <div className="about-grid reveal">
          <p className="about-lead">I'm a dedicated Backend Developer who enjoys building clean, optimized, and scalable server-side applications. I love learning new technologies, improving my skills, and turning ideas into real, functional solutions. Currently expanding my knowledge in Laravel and modern backend tools. 🚀</p>
          <div className="about-details">
            <p>I work across backend development and practical website projects, from server-side logic and database workflows to the interfaces people use every day.</p>
            <p>I value readable code, useful features, solving real issues, and continuously improving the way an application works.</p>
            <div className="mini-facts"><div><span>PRIMARY FOCUS</span><strong>Backend & Web Apps</strong></div><div><span>CORE STACK</span><strong>PHP · Laravel · WordPress</strong></div><div><span>WORK APPROACH</span><strong>Practical & iterative</strong></div></div>
          </div>
        </div>
      </section>

      <section className="section matrix-section" id="matrix">
        <div className="wrap">
          <div className="section-heading reveal"><p className="kicker">02 / TECHNICAL MATRIX</p><h2>My current technical stack.</h2><p className="section-subtitle">A broad, self-assessed overview of my experience across development areas.</p></div>
          <div className="matrix-grid">{matrix.map((group, index) => { const Icon = group.icon; return <article className={`matrix-card glass-panel reveal tone-${group.tone}`} style={{ transitionDelay: `${index * 70}ms` }} key={group.title}>
            <div className="matrix-head"><div className="matrix-label"><span className="matrix-icon"><Icon size={20}/></span><h3>{group.title}</h3></div><span className="matrix-score">{group.score}%</span></div>
            <div className="progress-track"><span style={{ '--progress': `${group.score}%` }} /></div>
            <div className="tags">{group.items.map(item => <span className="tag" key={item}>{item}</span>)}</div>
          </article>; })}</div>
          <p className="skill-note reveal">Percentages are broad self-assessments of familiarity and hands-on experience, not formal test results or claims of expert-level proficiency.</p>
        </div>
      </section>

      <section className="section wrap" id="experience">
        <div className="section-heading reveal"><p className="kicker">03 / EXPERIENCE</p><h2>Where I've contributed.</h2><p className="section-subtitle">Practical experience across development, site administration, and support.</p></div>
        <div className="timeline">{experience.map((job, index) => { const Icon = job.icon; return <article className="experience-card glass-panel reveal" style={{ transitionDelay: `${index * 100}ms` }} key={job.role}>
          <div className="experience-icon"><Icon size={21}/></div><div className="experience-content"><div className="experience-meta"><span className="experience-period"><Clock3 size={13}/>{job.period}</span><span className="experience-index">0{index + 1}</span></div><h3>{job.role}</h3><p className="experience-company">{job.company}</p><p className="experience-desc">{job.description}</p></div>
        </article>; })}</div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="wrap">
          <div className="section-heading project-heading reveal"><div><p className="kicker">04 / SELECTED PROJECTS</p><h2>Projects with a purpose.</h2></div><a className="text-link" href={githubProfile} target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={16}/></a></div>
          <div className="projects-grid">{projects.map((project, index) => { const Icon = project.icon; return <article className="project-card glass-panel reveal" style={{ transitionDelay: `${index * 100}ms` }} key={project.number}>
            <div className="project-meta"><span className="project-number">{project.number}</span><span className="project-status">{project.status}</span></div>
            <div className="project-icon"><Icon size={24}/></div><p className="project-type">{project.type}</p><h3>{project.name}</h3><p className="project-desc">{project.description}</p>
            <div className="tags">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
            <a className="project-link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <ExternalLink size={15}/></a>
          </article>; })}</div>
        </div>
      </section>

      <section className="section wrap github-section" id="github">
        <div className="section-heading project-heading reveal"><div><p className="kicker">05 / GITHUB ACTIVITY</p><h2>Repositories, straight from GitHub.</h2><p className="section-subtitle">This section loads public repositories directly from the GitHub API.</p></div><a className="button secondary" href={githubProfile} target="_blank" rel="noreferrer"><Github size={17}/> View profile <ArrowUpRight size={15}/></a></div>
        {repoState === 'loading' && <div className="repo-message glass-panel"><span className="loader"/> Fetching public repositories…</div>}
        {repoState === 'error' && <div className="repo-message glass-panel">GitHub's API could not be reached right now. <a href={githubProfile} target="_blank" rel="noreferrer">Open the profile directly <ArrowUpRight size={14}/></a></div>}
        {repoState === 'ready' && repos.length === 0 && <div className="repo-message glass-panel">No public repositories were found. <a href={githubProfile} target="_blank" rel="noreferrer">Open GitHub <ArrowUpRight size={14}/></a></div>}
        {repoState === 'ready' && repos.length > 0 && <div className="repos-grid">{repos.map((repo, index) => <a className="repo-card glass-panel reveal" style={{ transitionDelay: `${index * 70}ms` }} href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}>
          <div className="repo-card-top"><Github size={19}/><span className="repo-visibility">Public</span></div><h3>{repo.name.replaceAll('-', ' ').replaceAll('_', ' ')}</h3><p>{repo.description || 'Public repository by Matin Afzali.'}</p>
          <div className="repo-meta"><span>{repo.language || 'Code'}</span><span><Star size={13}/>{repo.stargazers_count}</span><span><GitFork size={13}/>{repo.forks_count}</span></div>
        </a>)}</div>}
      </section>

      <section className="section wrap education-section">
        <div className="section-heading reveal"><p className="kicker">06 / EDUCATION</p><h2>Computer software studies.</h2></div>
        <div className="education-card glass-panel reveal"><div className="education-mark"><GraduationCap size={25}/></div><div><h3>Associate-level studies in Computer Software</h3><p>University of Sajjad · Mashhad, Iran</p><span>Currently studying</span></div></div>
      </section>

      <section className="contact-section" id="contact"><div className="wrap contact-inner reveal"><p className="kicker">07 / CONTACT & SOCIALS</p><h2>Let's build something useful.</h2><p>Have an opportunity, a project, or just want to connect? Choose the platform that works for you.</p>
        <div className="contact-grid">
          <a className="contact-card glass-panel" href={`mailto:${socials.email}`}><span className="contact-icon"><Mail size={21}/></span><span><strong>Email</strong><small>{socials.email}</small></span><ArrowUpRight size={16}/></a>
          <a className="contact-card glass-panel" href={socials.github} target="_blank" rel="noreferrer"><span className="contact-icon"><Github size={21}/></span><span><strong>GitHub</strong><small>@ifmat · Repositories</small></span><ArrowUpRight size={16}/></a>
          <a className="contact-card glass-panel" href={socials.linkedin} target="_blank" rel="noreferrer"><span className="contact-icon"><Linkedin size={21}/></span><span><strong>LinkedIn</strong><small>Professional profile</small></span><ArrowUpRight size={16}/></a>
          <a className="contact-card glass-panel" href={socials.telegram} target="_blank" rel="noreferrer"><span className="contact-icon"><Send size={21}/></span><span><strong>Telegram</strong><small>@comatozze_rfs666</small></span><ArrowUpRight size={16}/></a>
        </div>
      </div></section>
    </main>
    <footer className="footer wrap"><a className="brand" href="#home"><span className="brand-mark">&lt;/&gt;</span><span>ifmat<span className="brand-dot">.</span></span></a><span>Designed & built by Matin Afzali</span><a href="#home" className="back-top">Back to top ↑</a></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
