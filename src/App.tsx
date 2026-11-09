/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

interface PortfolioItem {
  id: string;
  category: 'poster' | 'photo' | 'video' | 'motion' | 'branding';
  title: string;
  categoryLabel: string;
  image: string;
  description: string;
  isVideo?: boolean;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'photo-1',
    category: 'photo',
    categoryLabel: 'Photography',
    title: 'Wedding Shoot',
    image: '/assets/aistudio/photo1_f6b7cd81.png',
    description: 'Luxury wedding photography and high-end portrait storytelling.'
  },
  {
    id: 'photo-2',
    category: 'photo',
    categoryLabel: 'Photography',
    title: 'Travel Photography',
    image: '/assets/aistudio/photo2_f6b7cd81.png',
    description: 'Cinematic landscape, moody outdoor atmospheres and travel culture.'
  },
  {
    id: 'video-1',
    category: 'video',
    categoryLabel: 'Videography',
    title: 'Brand Campaign & Showreel',
    image: '/assets/aistudio/showreel_92b2b418.mp4',
    description: 'Commercial advertisement, dramatic cuts, and rhythmic color-graded media.',
    isVideo: true
  },
  {
    id: 'poster-1',
    category: 'poster',
    categoryLabel: 'Poster Design',
    title: 'Event Poster Design',
    image: '/assets/aistudio/photo1_f6b7cd81.png',
    description: 'Marketing campaign poster with impactful typography and dynamic layout.'
  },
  {
    id: 'motion-1',
    category: 'motion',
    categoryLabel: 'Motion Graphics',
    title: 'Logo & Title Animation',
    image: '/assets/aistudio/photo2_f6b7cd81.png',
    description: 'Dynamic kinetic typography, 3D title transitions and logo reveal animations.'
  },
  {
    id: 'branding-1',
    category: 'branding',
    categoryLabel: 'Branding',
    title: 'ShadowStack.web Identity',
    image: '/assets/aistudio/photo1_f6b7cd81.png',
    description: 'Modern digital solutions brand identity, dark luxury aesthetic, and design kit.'
  }
];

const SKILL_PILLS = [
  { icon: 'fa-video', label: 'Videography' },
  { icon: 'fa-camera-retro', label: 'Photography' },
  { icon: 'fa-film', label: 'Video Editing' },
  { icon: 'fa-pen-nib', label: 'Graphic Design' },
  { icon: 'fa-wand-magic-sparkles', label: 'Motion Graphics' },
  { icon: 'fa-robot', label: 'AI Content' },
  { icon: 'fa-palette', label: 'Branding' },
  { icon: 'fa-share-nodes', label: 'Social Media' },
  { icon: 'fa-chart-line', label: 'Strategy' },
  { icon: 'fa-book-open', label: 'Storytelling' },
  { icon: 'fa-sliders', label: 'Color Grading' },
  { icon: 'fa-bullseye', label: 'Creative Direction' },
];

const TOOLS = [
  { name: 'Photoshop', icon: '/assets/aistudio/photoshop_ed2c71f2.png' },
  { name: 'Illustrator', icon: '/assets/aistudio/illustrator_2b94bffe.png' },
  { name: 'Premiere Pro', icon: '/assets/aistudio/premiere_fe0da38e.png' },
  { name: 'After Effects', icon: '/assets/aistudio/after-effects_91de1631.png' },
  { name: 'DaVinci Resolve', icon: '/assets/aistudio/icons8-davinci-resolve-48_e3f50eb9.png' },
  { name: 'CapCut', icon: '/assets/aistudio/capcut-icon_e669bbd3.png' },
  { name: 'Final Cut Pro', icon: '/assets/aistudio/final_cut_pro_macos_bigsur_icon_190177_6a50f9c7.png' },
  { name: 'Canva', icon: '/assets/aistudio/icons8-canva-app-48_9ae10e44.png' },
  { name: 'ChatGPT', icon: '/assets/aistudio/icons8-chatgpt-50_f9416737.png' },
  { name: 'Midjourney', icon: '/assets/aistudio/icons8-midjourney-50_f6325b1d.png' },
  { name: 'Runway ML', icon: '/assets/aistudio/icons8-runway-50_3d8a9c5b.png' },
  { name: 'Adobe Firefly', icon: '/assets/aistudio/Adobe_Firefly_CC_2026_icon.svg_e97b50dc.png' },
];

const TYPED_STRINGS = [
  'Photographer',
  'Videographer',
  'Video Editor',
  'Graphic Designer',
  'Motion Graphics Artist',
  'AI Content Creator'
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);
  const [categoryModalFilter, setCategoryModalFilter] = useState<string | null>(null);
  const [showreelModalOpen, setShowreelModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Typewriter effect state
  const [typedText, setTypedText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sync dark mode class on document.body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Scroll listener for progress bar and back-to-top
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setScrollProgress(scrollPercent);
      }
      setShowBackToTop(totalScroll > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility: Escape key closes active modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalItem(null);
        setCategoryModalFilter(null);
        setShowreelModalOpen(false);
        setResumeModalOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Modal body scroll lock to prevent background drift
  useEffect(() => {
    const isModalActive = activeModalItem !== null || categoryModalFilter !== null || showreelModalOpen || resumeModalOpen || mobileMenuOpen;
    if (isModalActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalItem, categoryModalFilter, showreelModalOpen, resumeModalOpen, mobileMenuOpen]);

  // Typewriter effect logic
  useEffect(() => {
    const currentString = TYPED_STRINGS[stringIndex];
    const typingSpeed = isDeleting ? 35 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentString.length) {
        setTypedText(currentString.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      } else if (!isDeleting && charIndex === currentString.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex > 0) {
        setTypedText(currentString.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setStringIndex(prev => (prev + 1) % TYPED_STRINGS.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, stringIndex]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter portfolio
  const filteredPortfolio = activeFilter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeFilter);

  // Category works for the category modal (from original script.js)
  const categoryModalItems = categoryModalFilter
    ? PORTFOLIO_ITEMS.filter(item => item.category === categoryModalFilter)
    : [];

  const handleFilterClick = (filterKey: string) => {
    setActiveFilter(filterKey);
    if (filterKey !== 'all') {
      setCategoryModalFilter(filterKey);
    }
  };

  return (
    <>
      {/* Skip link for screen reader and keyboard accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Scroll Progress Bar */}
      <div id="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Floating Shapes Background */}
      <div className="floating-shapes">
        <span className="shape shape1"></span>
        <span className="shape shape2"></span>
        <span className="shape shape3"></span>
        <span className="shape shape4"></span>
        <span className="shape shape5"></span>
      </div>

      {/* Header */}
      <header className="header" role="banner">
        <div className="container">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="logo" aria-label="Ajith P K Home">
            AJITH<span>.</span>
          </a>

          <nav className="navbar" aria-label="Primary Navigation">
            <ul>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
              <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Skills</a></li>
              <li><a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}>Experience</a></li>
              <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}>Portfolio</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <button
              id="themeToggle"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={isDarkMode}
            >
              <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>

            <button
              className="hamburger"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobileNavigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        id="mobileNavigation"
        className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-nav-header">
          <span className="logo">AJITH<span>.</span></span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-close"
            aria-label="Close navigation menu"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="mobile-nav-links">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}><i className="fas fa-home"></i> Home</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}><i className="fas fa-user"></i> About</a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}><i className="fas fa-bolt"></i> Skills</a>
          <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}><i className="fas fa-briefcase"></i> Experience</a>
          <a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}><i className="fas fa-layer-group"></i> Portfolio</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}><i className="fas fa-cubes"></i> Services</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}><i className="fas fa-paper-plane"></i> Contact</a>
        </div>

        <div className="mobile-nav-actions">
          <button onClick={() => { setMobileMenuOpen(false); setResumeModalOpen(true); }} className="btn primary w-full">
            <i className="fas fa-file-pdf"></i> Download Resume
          </button>
          <a href="https://wa.me/917306257449" target="_blank" rel="noopener noreferrer" className="btn secondary w-full">
            <i className="fab fa-whatsapp"></i> Chat on WhatsApp
          </a>
        </div>

        <div className="mobile-nav-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          <a href="https://behance.net" target="_blank" rel="noopener noreferrer" aria-label="Behance"><i className="fab fa-behance"></i></a>
        </div>
      </div>

      {/* Main Content Landmark for SEO & Accessibility */}
      <main id="main-content">
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="container hero-container">
            <div className="hero-left">
              <span className="hero-tag">
                Creative Media Professional
              </span>

              <h1>AJITH P K</h1>

              <h2>
                <span>{typedText}</span>
                <span className="typed-cursor">|</span>
              </h2>

              <p className="hero-desc">
                Creative Media Professional specializing in Photography, Videography, Video Editing,
                Graphic Design, AI Content Creation, and Branding.
                <span className="block mt-2">
                  Experienced in producing visual campaigns, promotional videos, and brand materials using industry-leading software and AI tools with a focus on purposeful storytelling.
                </span>
              </p>

              <div className="hero-buttons">
                <div className="hero-btn-group">
                  <button onClick={() => scrollToSection('portfolio')} className="btn primary">
                    View Portfolio
                  </button>
                  <button onClick={() => scrollToSection('contact')} className="btn secondary">
                    Contact Me
                  </button>
                </div>
                <button onClick={() => setResumeModalOpen(true)} className="btn glass hero-resume-btn">
                  <i className="fas fa-file-pdf"></i> Download Resume
                </button>
              </div>

              <div className="hero-social">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" aria-label="Behance">
                  <i className="fab fa-behance"></i>
                </a>
              </div>
            </div>

            <div className="hero-right">
              <div className="profile-wrapper">
                <img
                  src="/assets/aistudio/profile_c1887477.jpg"
                  alt="Ajith P K - Creative Media Professional, Photographer & Videographer"
                  width={500}
                  height={667}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          <div className="scroll-indicator" aria-hidden="true">
            <span></span>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <div className="container">
            <div className="section-header">
              <span>ABOUT ME</span>
              <h2>Creative Storytelling Meets Modern Technology</h2>
            </div>

            <h3>Passionate Creative Professional</h3>
            <p>
              Passionate creative professional combining storytelling, technology, and visual design
              to create impactful content that drives brand growth and audience engagement.
            </p>

            <div className="about-highlights">
              <div className="highlight-card glass">
                <h4>Creative Philosophy</h4>
                <p>Design with purpose. Create with impact.</p>
              </div>
              <div className="highlight-card glass">
                <h4>Professional Journey</h4>
                <p>From graphic design to media production and branding.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills">
          <div className="container">
            <div className="section-header">
              <span>CORE EXPERTISE</span>
              <h2>Skills & Capabilities</h2>
              <p>A multidimensional skill set spanning photography, visual design, post-production and generative media.</p>
            </div>

            <div className="skills-slider">
              {SKILL_PILLS.map((pill, i) => (
                <div key={i} className="skill-pill">
                  <i className={`fas ${pill.icon}`} aria-hidden="true"></i>
                  <span>{pill.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Software & Tools Section */}
        <section id="tools" className="tools-section">
          <div className="container">
            <div className="section-header">
              <span>TOOLS & SOFTWARE</span>
              <h2>Creative Ecosystem</h2>
              <p>Industry-standard creative software and AI-powered tools.</p>
            </div>

            <div className="tools-grid">
              {TOOLS.map((tool, idx) => (
                <div key={idx} className="tool-card glass">
                  <img
                    src={tool.icon}
                    alt={`${tool.name} software icon`}
                    width={44}
                    height={44}
                    loading="lazy"
                    decoding="async"
                  />
                  <h4>{tool.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <div className="section-header">
            <span>CAREER MILESTONES</span>
            <h2>Professional Experience</h2>
            <p>
              Proven track record in video production, motion graphics, and visual design across international education, media publications, and creative agencies.
            </p>
            <div className="experience-summary-pill">
              <i className="fas fa-briefcase"></i>
              <span>4+ Years Creative Media & Production Experience</span>
            </div>
          </div>

          <div className="experience-stream">
            {/* Experience Card 1 - London Education Centre */}
            <div className="exp-card">
              <div className="exp-header">
                <div className="exp-role-group">
                  <h3>Videographer cum Editor | Graphic Designer</h3>
                  <div className="exp-company-meta">
                    <span>London Education Centre</span>
                    <span>•</span>
                    <span className="location"><i className="fas fa-map-marker-alt"></i> Doha, Qatar</span>
                  </div>
                </div>

                <div className="exp-meta-badge-wrap">
                  <span className="exp-current-badge">
                    <span className="exp-current-pulse"></span>
                    Current Role
                  </span>
                  <span className="exp-period-pill">2025 – Present</span>
                </div>
              </div>

              <p className="exp-desc">
                Leading multimedia creative production, conceptualizing promotional video assets, educational storytelling series, and brand design campaigns across digital channels.
              </p>

              <span className="exp-section-title">Key Deliverables & Responsibilities</span>
              <div className="exp-chips">
                <span className="exp-chip"><i className="fas fa-check"></i> Promotional Videos</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Educational Content</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Social Media Campaigns</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Motion Graphics</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Color Grading</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Marketing Materials</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Brand Communication</span>
              </div>

              <div className="exp-tools-row">
                <span className="exp-tools-label">Stack:</span>
                <span className="exp-tool-badge">Premiere Pro</span>
                <span className="exp-tool-badge">Photoshop</span>
                <span className="exp-tool-badge">Illustrator</span>
                <span className="exp-tool-badge">After Effects</span>
                <span className="exp-tool-badge">DaVinci Resolve</span>
                <span className="exp-tool-badge">AI Creative Tools</span>
              </div>
            </div>

            {/* Experience Card 2 - Townbook */}
            <div className="exp-card">
              <div className="exp-header">
                <div className="exp-role-group">
                  <h3>Media Wing Coordinator | Editor cum Videographer</h3>
                  <div className="exp-company-meta">
                    <span>Townbook</span>
                    <span>•</span>
                    <span className="location"><i className="fas fa-map-marker-alt"></i> Poonoor, Calicut</span>
                  </div>
                </div>

                <div className="exp-meta-badge-wrap">
                  <span className="exp-period-pill">2022 – 2025 (3 Years)</span>
                </div>
              </div>

              <p className="exp-desc">
                Spearheaded the media division, overseeing historical documentary productions, cultural storytelling projects, and cross-platform publishing initiatives while managing creative talent and shoot logistics.
              </p>

              <span className="exp-section-title">Key Deliverables & Responsibilities</span>
              <div className="exp-chips">
                <span className="exp-chip"><i className="fas fa-check"></i> Historical Documentaries</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Storytelling Projects</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Media Campaigns</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Cinematography & Videography</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Photography</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Editorial Publishing</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Team Coordination</span>
              </div>

              <div className="exp-tools-row">
                <span className="exp-tools-label">Stack:</span>
                <span className="exp-tool-badge">Premiere Pro</span>
                <span className="exp-tool-badge">Cinema Cameras</span>
                <span className="exp-tool-badge">Photoshop</span>
                <span className="exp-tool-badge">Audio Post</span>
                <span className="exp-tool-badge">Publishing Workflows</span>
              </div>
            </div>

            {/* Experience Card 3 - Infographics */}
            <div className="exp-card">
              <div className="exp-header">
                <div className="exp-role-group">
                  <h3>Graphic Designer</h3>
                  <div className="exp-company-meta">
                    <span>Infographics</span>
                    <span>•</span>
                    <span className="location"><i className="fas fa-map-marker-alt"></i> Calicut, India</span>
                  </div>
                </div>

                <div className="exp-meta-badge-wrap">
                  <span className="exp-period-pill">2022</span>
                </div>
              </div>

              <p className="exp-desc">
                Designed promotional marketing creatives, social media graphics, visual identity collateral, and digital brand communication assets.
              </p>

              <span className="exp-section-title">Key Deliverables & Responsibilities</span>
              <div className="exp-chips">
                <span className="exp-chip"><i className="fas fa-check"></i> Marketing Creatives</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Social Media Graphics</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Brand Assets</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Promotional Collateral</span>
              </div>

              <div className="exp-tools-row">
                <span className="exp-tools-label">Stack:</span>
                <span className="exp-tool-badge">Photoshop</span>
                <span className="exp-tool-badge">Illustrator</span>
                <span className="exp-tool-badge">Typography</span>
                <span className="exp-tool-badge">Print & Digital</span>
              </div>
            </div>

            {/* Experience Card 4 - Ecommates */}
            <div className="exp-card">
              <div className="exp-header">
                <div className="exp-role-group">
                  <h3>Graphic Designer</h3>
                  <div className="exp-company-meta">
                    <span>Ecommates</span>
                    <span>•</span>
                    <span className="location"><i className="fas fa-map-marker-alt"></i> Calicut, India</span>
                  </div>
                </div>

                <div className="exp-meta-badge-wrap">
                  <span className="exp-period-pill">2021</span>
                </div>
              </div>

              <p className="exp-desc">
                Crafted e-commerce branding kits, website promotional banners, marketing visuals, and ad creatives for direct-to-consumer digital commerce brands.
              </p>

              <span className="exp-section-title">Key Deliverables & Responsibilities</span>
              <div className="exp-chips">
                <span className="exp-chip"><i className="fas fa-check"></i> E-commerce Branding</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Website Promotions</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Marketing Graphics</span>
                <span className="exp-chip"><i className="fas fa-check"></i> Social Creatives</span>
              </div>

              <div className="exp-tools-row">
                <span className="exp-tools-label">Stack:</span>
                <span className="exp-tool-badge">Illustrator</span>
                <span className="exp-tool-badge">Photoshop</span>
                <span className="exp-tool-badge">Digital Ad Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="section-header">
            <span>PORTFOLIO</span>
            <h2>Selected Creative Works</h2>
            <p>A collection of branding, photography, videography and creative projects.</p>
          </div>

          <div className="portfolio-filter">
            <button
              className={activeFilter === 'all' ? 'active' : ''}
              onClick={() => handleFilterClick('all')}
            >
              All Works
            </button>
            <button
              className={activeFilter === 'poster' ? 'active' : ''}
              onClick={() => handleFilterClick('poster')}
            >
              Posters
            </button>
            <button
              className={activeFilter === 'photo' ? 'active' : ''}
              onClick={() => handleFilterClick('photo')}
            >
              Photography
            </button>
            <button
              className={activeFilter === 'video' ? 'active' : ''}
              onClick={() => handleFilterClick('video')}
            >
              Videography
            </button>
            <button
              className={activeFilter === 'motion' ? 'active' : ''}
              onClick={() => handleFilterClick('motion')}
            >
              Motion Graphics
            </button>
            <button
              className={activeFilter === 'branding' ? 'active' : ''}
              onClick={() => handleFilterClick('branding')}
            >
              Branding
            </button>
          </div>

          <div className="portfolio-grid">
            {filteredPortfolio.map((item) => (
              <div
                key={item.id}
                className="portfolio-item"
                onClick={() => setActiveModalItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveModalItem(item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title} project details`}
              >
                <span className="portfolio-badge">{item.categoryLabel}</span>
                {item.isVideo ? (
                  <video
                    src={item.image}
                    poster="/assets/aistudio/photo2_f6b7cd81.png"
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    aria-label={item.title}
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.categoryLabel} by Ajith P K`}
                    width={400}
                    height={230}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="portfolio-overlay">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showreel Section */}
      <section className="showreel" aria-label="Featured Showreel">
        <div className="showreel-video">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/aistudio/photo2_f6b7cd81.png"
            aria-hidden="true"
          >
            <source src="/assets/aistudio/showreel_92b2b418.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="showreel-overlay"></div>

        <div className="container">
          <div className="showreel-content">
            <span>FEATURED SHOWREEL</span>
            <h2>Bringing Stories To Life Through Motion</h2>
            <p>
              A cinematic collection of creative campaigns, commercial projects,
              motion graphics, brand storytelling and visual experiences.
            </p>
            <button
              onClick={() => setShowreelModalOpen(true)}
              className="play-showreel"
            >
              <i className="fas fa-play"></i> Watch Showreel
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <span>SERVICES</span>
            <h2>Creative Services</h2>
            <p>Helping brands and businesses create memorable visual experiences.</p>
          </div>

          <div className="services-grid">
            <div className="service-card glass">
              <i className="fas fa-camera"></i>
              <h3>Photography</h3>
              <p>Professional photography for brands, events and campaigns.</p>
            </div>

            <div className="service-card glass">
              <i className="fas fa-video"></i>
              <h3>Videography</h3>
              <p>Commercial videos, promotional videos and event coverage.</p>
            </div>

            <div className="service-card glass">
              <i className="fas fa-film"></i>
              <h3>Video Editing</h3>
              <p>Professional editing, storytelling and color grading.</p>
            </div>

            <div className="service-card glass">
              <i className="fas fa-pen-ruler"></i>
              <h3>Graphic Design</h3>
              <p>Posters, flyers, social media creatives and marketing assets.</p>
            </div>

            <div className="service-card glass">
              <i className="fas fa-wand-magic-sparkles"></i>
              <h3>Motion Graphics</h3>
              <p>Animations, titles, intros and visual effects.</p>
            </div>

            <div className="service-card glass">
              <i className="fas fa-robot"></i>
              <h3>AI Content Creation</h3>
              <p>AI-generated images, videos and digital campaigns.</p>
            </div>

            <div className="service-card glass">
              <i className="fas fa-layer-group"></i>
              <h3>Branding</h3>
              <p>Creative brand identity and visual development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education">
        <div className="container">
          <div className="section-header">
            <span>EDUCATION</span>
            <h2>Academic Journey</h2>
          </div>

          <div className="education-timeline">
            <div className="edu-card glass">
              <span>2020 - 2021</span>
              <h3>Professional Diploma in Motion Graphics</h3>
              <h4>G-TEC, Calicut</h4>
            </div>

            <div className="edu-card glass">
              <span>2016 - 2019</span>
              <h3>Diploma in Architecture</h3>
              <h4>KMCT College, Kallanthod, Calicut</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <span>CONTACT</span>
            <h2>Let's Create Something Amazing</h2>
          </div>

          <div className="contact-wrapper">
            <div className="contact-info">
              <div className="contact-card glass">
                <div className="contact-icon-bubble">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-text">
                  <h4>Phone</h4>
                  <p>
                    <a href="tel:+97477268747">+974 77268747</a>
                  </p>
                </div>
                <a href="tel:+97477268747" className="contact-action-badge">
                  Call <i className="fas fa-chevron-right"></i>
                </a>
              </div>

              <div className="contact-card glass">
                <div className="contact-icon-bubble">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:ajitheditor5@gmail.com">ajitheditor5@gmail.com</a>
                  </p>
                </div>
                <a href="mailto:ajitheditor5@gmail.com" className="contact-action-badge">
                  Write <i className="fas fa-chevron-right"></i>
                </a>
              </div>

              <div className="contact-card glass">
                <div className="contact-icon-bubble whatsapp">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div className="contact-text">
                  <h4>WhatsApp</h4>
                  <p>
                    <a href="https://wa.me/917306257449" target="_blank" rel="noopener noreferrer">
                      +91 73062 57449
                    </a>
                  </p>
                </div>
                <a href="https://wa.me/917306257449" target="_blank" rel="noopener noreferrer" className="contact-action-badge whatsapp">
                  Chat <i className="fas fa-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h2>AJITH P K</h2>
              <p>
                Creative Media Professional specializing in photography, videography,
                editing, branding and AI content creation.
              </p>
            </div>

            <div>
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
                <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}>Portfolio</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
              </ul>
            </div>

            <div>
              <h3>Portfolio</h3>
              <ul>
                <li onClick={() => { scrollToSection('portfolio'); handleFilterClick('photo'); }}>Photography</li>
                <li onClick={() => { scrollToSection('portfolio'); handleFilterClick('video'); }}>Videography</li>
                <li onClick={() => { scrollToSection('portfolio'); handleFilterClick('motion'); }}>Motion Graphics</li>
                <li onClick={() => { scrollToSection('portfolio'); handleFilterClick('branding'); }}>Branding</li>
              </ul>
            </div>

            <div>
              <h3>Contact</h3>
              <p><a href="tel:+97477268747">+974 77268747</a></p>
              <p><a href="mailto:ajitheditor5@gmail.com">ajitheditor5@gmail.com</a></p>

              <div className="footer-social">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Ajith P K on Instagram"><i className="fab fa-instagram"></i></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Ajith P K on YouTube"><i className="fab fa-youtube"></i></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Ajith P K on LinkedIn"><i className="fab fa-linkedin"></i></a>
                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" aria-label="Ajith P K on Behance"><i className="fab fa-behance"></i></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 ShadowStack.web. All Rights Reserved.</p>
            <p style={{ fontSize: '0.85rem' }}>Designed for Ajith P K</p>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <button
        id="backToTop"
        className={showBackToTop ? 'active' : ''}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* Individual Item Preview Modal */}
      {activeModalItem && (
        <div
          className="portfolio-modal active"
          onClick={() => setActiveModalItem(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="itemModalTitle"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setActiveModalItem(null)} aria-label="Close project preview">
              <i className="fas fa-times"></i>
            </button>
            <h2 id="itemModalTitle" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '4px' }}>
              {activeModalItem.title}
            </h2>
            <span style={{ display: 'inline-block', color: '#0066ff', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px' }}>
              {activeModalItem.categoryLabel}
            </span>
            <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '16px', maxHeight: '380px', display: 'flex', justifyContent: 'center', background: '#000' }}>
              {activeModalItem.isVideo ? (
                <video
                  src={activeModalItem.image}
                  controls
                  autoPlay
                  style={{ width: '100%', maxHeight: '380px' }}
                />
              ) : (
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  style={{ width: '100%', objectFit: 'contain', maxHeight: '380px' }}
                />
              )}
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--secondary)', lineHeight: 1.55 }}>
              {activeModalItem.description}
            </p>
          </div>
        </div>
      )}

      {/* Category Modal (from script.js portfolioCategoryModal) */}
      {categoryModalFilter && (
        <div
          className="portfolio-modal active"
          onClick={() => setCategoryModalFilter(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="categoryModalTitle"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setCategoryModalFilter(null)} aria-label="Close category gallery">
              <i className="fas fa-times"></i>
            </button>
            <h2 id="categoryModalTitle" style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'capitalize', marginBottom: '6px' }}>
              {categoryModalFilter === 'poster' ? 'Posters' :
               categoryModalFilter === 'photo' ? 'Photography' :
               categoryModalFilter === 'video' ? 'Videography' :
               categoryModalFilter === 'motion' ? 'Motion Graphics' :
               categoryModalFilter === 'branding' ? 'Branding' : categoryModalFilter}
            </h2>
            <p style={{ color: 'var(--secondary)', fontSize: '0.88rem', marginBottom: '16px' }}>
              Curated collection of {categoryModalFilter} projects.
            </p>

            <div className="category-grid">
              {categoryModalItems.map((work) => (
                <div
                  key={work.id}
                  className="work-card"
                  onClick={() => { setActiveModalItem(work); setCategoryModalFilter(null); }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalItem(work);
                      setCategoryModalFilter(null);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${work.title}`}
                  style={{ cursor: 'pointer' }}
                >
                  {work.isVideo ? (
                    <video src={work.image} muted autoPlay loop preload="metadata" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                  ) : (
                    <img src={work.image} alt={work.title} loading="lazy" decoding="async" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                  )}
                  <h4>{work.title}</h4>
                  <p>{work.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Featured Showreel Video Modal */}
      {showreelModalOpen && (
        <div
          className="portfolio-modal active"
          onClick={() => setShowreelModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="showreelModalTitle"
        >
          <div className="modal-content" style={{ maxWidth: '720px', background: '#000', color: '#fff', padding: '24px 18px' }} onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setShowreelModalOpen(false)}
              aria-label="Close showreel player"
              style={{ color: '#fff', background: 'rgba(255,255,255,0.15)' }}
            >
              <i className="fas fa-times"></i>
            </button>
            <h3 id="showreelModalTitle" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>
              Ajith P K — Featured Showreel
            </h3>
            <div style={{ borderRadius: '14px', overflow: 'hidden' }}>
              <video
                src="/assets/aistudio/showreel_92b2b418.mp4"
                controls
                autoPlay
                style={{ width: '100%', maxHeight: '65vh' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Resume Overview Modal */}
      {resumeModalOpen && (
        <div
          className="portfolio-modal active"
          onClick={() => setResumeModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resumeModalTitle"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setResumeModalOpen(false)} aria-label="Close resume overview">
              <i className="fas fa-times"></i>
            </button>
            <h2 id="resumeModalTitle" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
              Ajith P K — Resume Summary
            </h2>
            <p style={{ color: '#0066ff', fontWeight: 700, marginBottom: '20px' }}>
              Creative Media Professional | Videographer | Editor | Designer
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(0,102,255,0.06)' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '10px' }}><i className="fas fa-briefcase text-blue-500 mr-2"></i> Experience</h4>
                <ul style={{ fontSize: '0.9rem', color: 'var(--secondary)', lineHeight: 1.6 }}>
                  <li><strong>2025 - Present:</strong> Videographer cum Editor & Designer, London Education Centre (Qatar)</li>
                  <li><strong>2022 - 2025:</strong> Media Wing Coordinator, Townbook (Calicut)</li>
                  <li><strong>2022:</strong> Graphic Designer, Infographics (Calicut)</li>
                  <li><strong>2021:</strong> Graphic Designer, Ecommates (Calicut)</li>
                </ul>
              </div>

              <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(0,102,255,0.06)' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '10px' }}><i className="fas fa-graduation-cap text-blue-500 mr-2"></i> Education</h4>
                <ul style={{ fontSize: '0.9rem', color: 'var(--secondary)', lineHeight: 1.6 }}>
                  <li><strong>2020 - 2021:</strong> Professional Diploma in Motion Graphics, G-TEC, Calicut</li>
                  <li><strong>2016 - 2019:</strong> Diploma in Architecture, KMCT College, Calicut</li>
                </ul>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <a
                href="mailto:ajitheditor5@gmail.com?subject=Job%20Inquiry%20for%20Ajith%20P%20K"
                className="btn primary"
              >
                <i className="fas fa-envelope"></i> Request Full Resume via Email
              </a>
              <a
                href="https://wa.me/917306257449?text=Hi%20Ajith,%20I%20would%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="btn secondary"
              >
                <i className="fab fa-whatsapp"></i> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
