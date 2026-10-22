import { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { site, hero } from '../data/site';
import { projects } from '../data/projects';
import { experience } from '../data/experience';
import { skillGroups } from '../data/skills';
import Scene3D from '../components/three/Scene3D';

const ease = [0.16, 1, 0.3, 1];

const TECH_COLORS = {
  'React.js': '#61dafb',
  'Next.js': '#ffffff',
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  HTML: '#e34f26',
  CSS: '#1572b6',
  'Tailwind CSS': '#06b6d4',
  'Ant Design': '#1677ff',
  'Material UI': '#007fff',
  ShadcnUI: '#ffffff',
  'Node.js': '#339933',
  'Express.js': '#68a063',
  MongoDB: '#47a248',
  Mongoose: '#880000',
  PostgreSQL: '#336791',
  MySQL: '#4479a1',
  Git: '#f05032',
  GitHub: '#ffffff',
  Postman: '#ff6c37',
  'VS Code': '#007acc',
  NPM: '#cb3837',
  Figma: '#f24e1e',
  Vercel: '#ffffff',
  Netlify: '#00c7b7',
  JWT: '#d63aff',
  OAuth: '#eb5424',
  'REST APIs': '#c8f54a',
  Zod: '#3068b7',
  'Responsive Design': '#06b6d4',
  'Reusable UI Components': '#61dafb',
  'API Development': '#68a063',
  Authentication: '#d63aff',
  Authorization: '#eb5424',
  Middleware: '#68a063',
  'Server Side Validation': '#339933',
  'Error Handling': '#f05032',
  'Business Logic': '#339933',
  'Database Design': '#336791',
  'CRUD Operations': '#47a248',
  Aggregation: '#47a248',
  Indexing: '#336791',
  'MERN Stack': '#c8f54a',
  'API Integration': '#c8f54a',
  'Frontend and Backend Integration': '#c8f54a',
  'Authentication Flow': '#d63aff',
  'Role Based Access Control': '#eb5424',
  'Data Validation': '#3068b7',
  'File Uploads': '#68a063',
  React: '#61dafb',
  Express: '#68a063',
  'Node.js': '#339933',
  REST: '#c8f54a',
  Strapi: '#4945ff',
  PDF: '#ff4444',
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const staggerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const letterPop = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const lineGrow = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
};

const slideRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

/* ── Utility Components ── */

function SplitLetters({ text, className = '' }) {
  return (
    <motion.span className={`inline-block ${className}`} variants={stagger}>
      {text.split('').map((ch, i) => (
        <motion.span key={i} variants={letterPop} className='inline-block'>
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

function Section({ children, className = '', id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionTitle({ children, number }) {
  return (
    <div className='relative mb-16 md:mb-20'>
      {number && (
        <motion.span
          variants={fadeUp}
          className='absolute -left-2 -top-10 font-display text-[8rem] font-black leading-none text-white/[0.02] select-none md:-left-4 md:-top-14 md:text-[12rem]'
        >
          {number}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className='relative font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'
      >
        {children}
      </motion.h2>
      <motion.div
        variants={lineGrow}
        className='mt-4 h-px w-full origin-left bg-gradient-to-r from-[#c8f54a] to-transparent'
      />
    </div>
  );
}

function TiltCard({ children, className = '' }) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform =
      `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.02, 1.02, 1.02)`;
    ref.current.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
    ref.current.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`ap-glow-card ${className}`}
      style={{
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}

/* ── Animated Counter ── */

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Category Icons (Animated SVGs) ── */

function CategoryIcon({ type }) {
  const icons = {
    frontend: (
      <svg viewBox='0 0 32 32' width='28' height='28' fill='none' className='ap-icon'>
        <path
          d='M10 24L2 16L10 8'
          stroke='#c8f54a'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='ap-dash-draw'
          style={{ strokeDasharray: 40, strokeDashoffset: 40 }}
        />
        <path
          d='M22 8L30 16L22 24'
          stroke='#c8f54a'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='ap-dash-draw'
          style={{ strokeDasharray: 40, strokeDashoffset: 40, animationDelay: '0.3s' }}
        />
        <line
          x1='18'
          y1='6'
          x2='14'
          y2='26'
          stroke='#c8f54a'
          strokeWidth='1.5'
          opacity='0.6'
          className='ap-dash-draw'
          style={{ strokeDasharray: 24, strokeDashoffset: 24, animationDelay: '0.5s' }}
        />
      </svg>
    ),
    backend: (
      <svg viewBox='0 0 32 32' width='28' height='28' fill='none' className='ap-icon'>
        <rect x='4' y='4' width='24' height='8' rx='2' stroke='#c8f54a' strokeWidth='1.5' className='ap-dash-draw' style={{ strokeDasharray: 60, strokeDashoffset: 60 }} />
        <circle cx='8' cy='8' r='1.5' fill='#c8f54a' className='ap-blink' />
        <circle cx='12' cy='8' r='1.5' fill='#c8f54a' className='ap-blink' style={{ animationDelay: '0.3s' }} />
        <rect x='4' y='14' width='24' height='8' rx='2' stroke='#c8f54a' strokeWidth='1.5' className='ap-dash-draw' style={{ strokeDasharray: 60, strokeDashoffset: 60, animationDelay: '0.2s' }} />
        <circle cx='8' cy='18' r='1.5' fill='#c8f54a' className='ap-blink' style={{ animationDelay: '0.6s' }} />
        <circle cx='12' cy='18' r='1.5' fill='#c8f54a' className='ap-blink' style={{ animationDelay: '0.9s' }} />
        <line x1='16' y1='24' x2='16' y2='28' stroke='#c8f54a' strokeWidth='1.5' opacity='0.4' className='ap-dash-draw' style={{ strokeDasharray: 6, strokeDashoffset: 6, animationDelay: '0.4s' }} />
      </svg>
    ),
    database: (
      <svg viewBox='0 0 32 32' width='28' height='28' fill='none' className='ap-icon'>
        <ellipse cx='16' cy='8' rx='10' ry='4' stroke='#c8f54a' strokeWidth='1.5' className='ap-dash-draw' style={{ strokeDasharray: 50, strokeDashoffset: 50 }} />
        <path d='M6 8v16c0 2.2 4.48 4 10 4s10-1.8 10-4V8' stroke='#c8f54a' strokeWidth='1.5' className='ap-dash-draw' style={{ strokeDasharray: 60, strokeDashoffset: 60, animationDelay: '0.3s' }} />
        <ellipse cx='16' cy='16' rx='10' ry='4' stroke='#c8f54a' strokeWidth='0.8' opacity='0.3' className='ap-dash-draw' style={{ strokeDasharray: 50, strokeDashoffset: 50, animationDelay: '0.5s' }} />
        <ellipse cx='16' cy='22' rx='10' ry='4' stroke='#c8f54a' strokeWidth='0.8' opacity='0.3' className='ap-dash-draw' style={{ strokeDasharray: 50, strokeDashoffset: 50, animationDelay: '0.7s' }} />
      </svg>
    ),
    fullstack: (
      <svg viewBox='0 0 32 32' width='28' height='28' fill='none' className='ap-icon'>
        <rect x='5' y='18' width='22' height='8' rx='1.5' stroke='#c8f54a' strokeWidth='1.5' opacity='0.4' className='ap-dash-draw' style={{ strokeDasharray: 56, strokeDashoffset: 56 }} />
        <rect x='5' y='12' width='22' height='8' rx='1.5' stroke='#c8f54a' strokeWidth='1.5' opacity='0.65' className='ap-dash-draw' style={{ strokeDasharray: 56, strokeDashoffset: 56, animationDelay: '0.2s' }} />
        <rect x='5' y='6' width='22' height='8' rx='1.5' stroke='#c8f54a' strokeWidth='1.5' className='ap-dash-draw' style={{ strokeDasharray: 56, strokeDashoffset: 56, animationDelay: '0.4s' }} />
        <line x1='16' y1='2' x2='16' y2='30' stroke='#c8f54a' strokeWidth='0.8' opacity='0.2' className='ap-dash-draw' style={{ strokeDasharray: 30, strokeDashoffset: 30, animationDelay: '0.6s' }} />
      </svg>
    ),
    tools: (
      <svg viewBox='0 0 32 32' width='28' height='28' fill='none' className='ap-icon ap-spin-slow'>
        <circle cx='16' cy='16' r='6' stroke='#c8f54a' strokeWidth='1.5' />
        <circle cx='16' cy='16' r='2.5' fill='#c8f54a' opacity='0.6' />
        <line x1='16' y1='3' x2='16' y2='8' stroke='#c8f54a' strokeWidth='2' strokeLinecap='round' />
        <line x1='16' y1='24' x2='16' y2='29' stroke='#c8f54a' strokeWidth='2' strokeLinecap='round' />
        <line x1='3' y1='16' x2='8' y2='16' stroke='#c8f54a' strokeWidth='2' strokeLinecap='round' />
        <line x1='24' y1='16' x2='29' y2='16' stroke='#c8f54a' strokeWidth='2' strokeLinecap='round' />
        <line x1='6.8' y1='6.8' x2='10.3' y2='10.3' stroke='#c8f54a' strokeWidth='1.5' strokeLinecap='round' />
        <line x1='21.7' y1='21.7' x2='25.2' y2='25.2' stroke='#c8f54a' strokeWidth='1.5' strokeLinecap='round' />
      </svg>
    ),
  };

  return (
    <motion.div variants={scaleIn} className='inline-flex'>
      {icons[type] || null}
    </motion.div>
  );
}

/* ── Tech Icon (small inline) ── */

function TechDot({ name, size = 6 }) {
  const color = TECH_COLORS[name] || '#c8f54a';

  if (name === 'React.js' || name === 'React') {
    return (
      <svg width={size + 8} height={size + 8} viewBox='0 0 20 20' className='ap-spin-slow'>
        <circle cx='10' cy='10' r='2' fill={color} />
        <ellipse cx='10' cy='10' rx='8' ry='3' stroke={color} strokeWidth='0.7' fill='none' opacity='0.7' />
        <ellipse cx='10' cy='10' rx='8' ry='3' stroke={color} strokeWidth='0.7' fill='none' opacity='0.7' transform='rotate(60 10 10)' />
        <ellipse cx='10' cy='10' rx='8' ry='3' stroke={color} strokeWidth='0.7' fill='none' opacity='0.7' transform='rotate(120 10 10)' />
      </svg>
    );
  }

  if (name === 'Node.js') {
    return (
      <svg width={size + 8} height={size + 8} viewBox='0 0 20 20'>
        <polygon points='10,2 18,6 18,14 10,18 2,14 2,6' stroke={color} strokeWidth='1' fill={color} fillOpacity='0.15' />
      </svg>
    );
  }

  if (name === 'MongoDB' || name === 'Mongoose') {
    return (
      <svg width={size + 6} height={size + 8} viewBox='0 0 16 20'>
        <path d='M8 2C8 2 4 6 4 11c0 3.3 1.8 6 4 7 2.2-1 4-3.7 4-7C12 6 8 2 8 2z' stroke={color} strokeWidth='1' fill={color} fillOpacity='0.15' />
        <line x1='8' y1='6' x2='8' y2='16' stroke={color} strokeWidth='0.8' opacity='0.5' />
      </svg>
    );
  }

  if (name === 'Git') {
    return (
      <svg width={size + 8} height={size + 8} viewBox='0 0 20 20'>
        <circle cx='10' cy='6' r='2' stroke={color} strokeWidth='1' fill='none' />
        <circle cx='6' cy='16' r='2' stroke={color} strokeWidth='1' fill='none' />
        <circle cx='14' cy='16' r='2' stroke={color} strokeWidth='1' fill='none' />
        <line x1='10' y1='8' x2='6' y2='14' stroke={color} strokeWidth='1' />
        <line x1='10' y1='8' x2='14' y2='14' stroke={color} strokeWidth='1' />
      </svg>
    );
  }

  if (name === 'PostgreSQL' || name === 'MySQL') {
    return (
      <svg width={size + 6} height={size + 8} viewBox='0 0 16 20'>
        <ellipse cx='8' cy='5' rx='6' ry='2.5' stroke={color} strokeWidth='0.8' fill='none' />
        <path d='M2 5v10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V5' stroke={color} strokeWidth='0.8' fill='none' />
      </svg>
    );
  }

  return (
    <span
      className='inline-block rounded-full ap-pulse-dot'
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size}px ${color}50`,
      }}
    />
  );
}

/* ── Glow Badge ── */

function GlowBadge({ name }) {
  const color = TECH_COLORS[name] || '#c8f54a';

  return (
    <motion.span
      variants={fadeUp}
      whileHover={{
        scale: 1.08,
        boxShadow: `0 0 24px ${color}30`,
        borderColor: `${color}60`,
      }}
      className='group inline-flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[13px] text-white/80 transition-all duration-300 hover:bg-white/[0.08] hover:text-white'
    >
      <TechDot name={name} />
      {name}
    </motion.span>
  );
}

/* ── Floating Decorative Elements ── */

function FloatingShape({ type, x, y, size, delay }) {
  const shapes = {
    ring: (
      <svg width={size} height={size} viewBox='0 0 40 40'>
        <circle cx='20' cy='20' r='16' stroke='#c8f54a' strokeWidth='0.5' fill='none' opacity='0.15' />
        <circle cx='20' cy='20' r='10' stroke='#c8f54a' strokeWidth='0.3' fill='none' opacity='0.1' />
      </svg>
    ),
    cross: (
      <svg width={size} height={size} viewBox='0 0 40 40'>
        <line x1='12' y1='20' x2='28' y2='20' stroke='#c8f54a' strokeWidth='0.8' opacity='0.15' />
        <line x1='20' y1='12' x2='20' y2='28' stroke='#c8f54a' strokeWidth='0.8' opacity='0.15' />
      </svg>
    ),
    dot: (
      <div
        className='rounded-full'
        style={{ width: size, height: size, background: '#c8f54a', opacity: 0.1, boxShadow: '0 0 20px #c8f54a20' }}
      />
    ),
    diamond: (
      <svg width={size} height={size} viewBox='0 0 40 40'>
        <rect x='12' y='12' width='16' height='16' rx='2' transform='rotate(45 20 20)' stroke='#c8f54a' strokeWidth='0.5' fill='none' opacity='0.12' />
      </svg>
    ),
    triangle: (
      <svg width={size} height={size} viewBox='0 0 40 40'>
        <polygon points='20,6 34,34 6,34' stroke='#c8f54a' strokeWidth='0.5' fill='none' opacity='0.12' />
      </svg>
    ),
  };

  return (
    <div
      className={`pointer-events-none absolute ap-float-${(delay % 3) + 1}`}
      style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay * 0.7}s` }}
    >
      {shapes[type]}
    </div>
  );
}

/* ── Tech Marquee ── */

function TechMarquee() {
  const allSkills = skillGroups.flatMap((g) => g.items);
  const doubled = [...allSkills, ...allSkills];

  return (
    <div className='relative z-10 overflow-hidden border-y border-white/[0.04] py-6'>
      <div className='ap-marquee flex whitespace-nowrap'>
        {doubled.map((skill, i) => (
          <span
            key={i}
            className='mx-6 font-display text-lg font-bold uppercase tracking-widest text-white/[0.06] md:text-xl'
          >
            {skill}
            <span className='mx-6 text-[#c8f54a]/20'>/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Gradient Blob Background ── */

function GradientBlob({ x, y, size, color = '#c8f54a', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 2 }}
      className={`pointer-events-none absolute rounded-full blur-[120px] ap-float-${(delay % 3) + 1}`}
      style={{ left: x, top: y, width: size, height: size, background: color, opacity: 0.04 }}
    />
  );
}

/* ── Nav ── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const links = ['about', 'skills', 'projects', 'experience', 'contact'];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.6, ease }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl' : ''
      }`}
    >
      <nav className='mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10'>
        <Link
          to='/'
          className='group flex items-center gap-2 font-display text-xs font-semibold tracking-[0.25em] text-[#c8f54a] transition-colors hover:text-white'
        >
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' className='transition-transform group-hover:-translate-x-1'>
            <path d='M19 12H5M5 12L12 19M5 12L12 5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
          MAIN SITE
        </Link>

        <ul className='hidden items-center gap-7 md:flex'>
          {links.map((id) => (
            <li key={id}>
              <button
                type='button'
                onClick={() => scroll(id)}
                className='group relative text-[11px] font-medium uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white'
              >
                {id}
                <span className='absolute -bottom-1 left-0 h-px w-0 bg-[#c8f54a] transition-all duration-300 group-hover:w-full' />
              </button>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${site.email}`}
          className='group flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-[#c8f54a]'
        >
          <span className='h-1.5 w-1.5 rounded-full bg-[#c8f54a] transition-transform group-hover:scale-150' />
          Contact
        </a>
      </nav>
    </motion.header>
  );
}

/* ── Hero ── */

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  return (
    <section ref={ref} className='relative flex min-h-[100svh] items-center justify-center overflow-hidden'>
      <FloatingShape type='ring' x={5} y={20} size={60} delay={0} />
      <FloatingShape type='cross' x={85} y={15} size={30} delay={1} />
      <FloatingShape type='diamond' x={10} y={70} size={40} delay={2} />
      <FloatingShape type='triangle' x={90} y={65} size={35} delay={3} />
      <FloatingShape type='dot' x={75} y={80} size={8} delay={4} />
      <FloatingShape type='ring' x={50} y={85} size={25} delay={5} />

      <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className='relative z-10 text-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.8, ease }}
          className='mx-auto mb-8 flex items-center justify-center gap-3'
        >
          <span className='h-px w-8 bg-gradient-to-r from-transparent to-[#c8f54a]/50' />
          <span className='text-[11px] font-medium uppercase tracking-[0.35em] text-[#c8f54a]'>
            {site.title} &bull; {site.locationShort}
          </span>
          <span className='h-px w-8 bg-gradient-to-l from-transparent to-[#c8f54a]/50' />
        </motion.div>

        <motion.h1
          initial='hidden'
          animate='visible'
          variants={stagger}
          className='font-display text-[clamp(2.5rem,9vw,8rem)] font-extrabold leading-[0.9] tracking-tighter'
        >
          <span className='block'>
            <SplitLetters text={site.firstName.toUpperCase()} />
          </span>
          <span className='block text-[#c8f54a]'>
            <SplitLetters text={site.lastName.toUpperCase()} />
          </span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 1.2, ease }}
          className='mx-auto mt-8 h-px w-32 origin-center bg-gradient-to-r from-transparent via-[#c8f54a] to-transparent'
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease }}
          className='mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/50 md:text-base'
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7, ease }}
          className='mt-8 flex flex-wrap items-center justify-center gap-4'
        >
          <button
            type='button'
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className='group relative overflow-hidden rounded-full bg-[#c8f54a] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0a0a0a] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(200,245,74,0.35)]'
          >
            <span className='relative z-10 flex items-center gap-2'>
              <svg width='14' height='14' viewBox='0 0 24 24' fill='none'>
                <path d='M7 17L17 7M17 7H7M17 7V17' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              View Projects
            </span>
          </button>
          <button
            type='button'
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className='group rounded-full border border-white/15 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-all hover:border-[#c8f54a]/30 hover:text-white hover:shadow-[0_0_30px_rgba(200,245,74,0.1)]'
          >
            <span className='flex items-center gap-2'>
              <span className='h-1.5 w-1.5 rounded-full bg-[#c8f54a] transition-transform group-hover:scale-150' />
              Get in Touch
            </span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className='mt-12 flex flex-wrap items-center justify-center gap-3'
        >
          {['React', 'Node.js', 'MongoDB', 'Express'].map((tech) => (
            <span
              key={tech}
              className='inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-white/30'
            >
              <TechDot name={tech} size={4} />
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.button
        type='button'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className='absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2'
      >
        <span className='text-[10px] uppercase tracking-[0.3em] text-white/30'>Scroll</span>
        <span className='ap-scroll-line relative h-10 w-px overflow-hidden bg-white/10'>
          <span className='ap-scroll-dot absolute inset-x-0 top-0 h-1/2 bg-[#c8f54a]' />
        </span>
      </motion.button>
    </section>
  );
}

/* ── About ── */

function AboutSection() {
  const words = site.about.split(' ');

  return (
    <Section id='about' className='relative py-24 md:py-32'>
      <GradientBlob x='70%' y='20%' size='400px' delay={0} />

      <div className='mx-auto max-w-[1400px] px-5 md:px-10'>
        <SectionTitle number='01'>About</SectionTitle>

        <div className='grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-20'>
          <motion.p variants={stagger} className='text-xl leading-relaxed md:text-2xl lg:text-3xl lg:leading-relaxed'>
            {words.map((word, i) => (
              <motion.span key={i} variants={fadeUp} className='mr-[0.3em] inline-block text-white/90'>
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.div variants={staggerSlow} className='space-y-5'>
            {[
              { value: experience.length, suffix: '+', label: 'Companies', icon: '///' },
              { value: projects.length, suffix: '+', label: 'Projects', icon: '<>' },
              { label: 'Stack', text: 'MERN', icon: '{}' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ scale: 1.03, borderColor: 'rgba(200, 245, 74, 0.2)' }}
                className='group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04]'
              >
                <div className='absolute right-4 top-4 font-mono text-[10px] text-white/[0.06]'>{stat.icon}</div>
                <div className='absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100' style={{ background: 'radial-gradient(circle at 50% 50%, rgba(200,245,74,0.04), transparent 70%)' }} />
                <p className='relative text-3xl font-bold text-[#c8f54a]'>
                  {stat.text || <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
                </p>
                <p className='relative mt-1 text-xs uppercase tracking-[0.2em] text-white/40'>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ── Skills ── */

function SkillsSection() {
  const categoryMap = { frontend: 'frontend', backend: 'backend', database: 'database', fullstack: 'fullstack', tools: 'tools' };

  return (
    <Section id='skills' className='relative py-24 md:py-32'>
      <GradientBlob x='10%' y='30%' size='350px' color='#61dafb' delay={1} />
      <GradientBlob x='80%' y='60%' size='300px' delay={2} />

      <div className='mx-auto max-w-[1400px] px-5 md:px-10'>
        <SectionTitle number='02'>Skills</SectionTitle>

        <div className='space-y-14'>
          {skillGroups.map((group) => (
            <motion.div key={group.id} variants={fadeUp}>
              <div className='mb-5 flex items-center gap-3'>
                <CategoryIcon type={categoryMap[group.id] || 'frontend'} />
                <h3 className='text-[11px] font-medium uppercase tracking-[0.25em] text-[#c8f54a]'>{group.label}</h3>
                <span className='h-px flex-1 bg-gradient-to-r from-[#c8f54a]/20 to-transparent' />
                <span className='text-[10px] text-white/20'>{group.items.length}</span>
              </div>
              <motion.div variants={stagger} className='flex flex-wrap gap-2.5'>
                {group.items.map((skill) => (
                  <GlowBadge key={skill} name={skill} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Projects ── */

function ProjectsSection() {
  return (
    <Section id='projects' className='relative py-24 md:py-32'>
      <GradientBlob x='50%' y='10%' size='500px' delay={0} />

      <div className='mx-auto max-w-[1400px] px-5 md:px-10'>
        <SectionTitle number='03'>Projects</SectionTitle>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project, i) => (
            <motion.div key={project.id} variants={fadeUp} custom={i}>
              <TiltCard className='group h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-500 hover:border-[#c8f54a]/20'>
                <div className='relative overflow-hidden'>
                  <img
                    src={project.image}
                    alt={project.name}
                    className='aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent' />
                  <span className='absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#c8f54a]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#c8f54a] backdrop-blur-sm'>
                    <svg width='10' height='10' viewBox='0 0 20 20' fill='none'>
                      <circle cx='10' cy='10' r='8' stroke='currentColor' strokeWidth='1.5' />
                      <line x1='10' y1='6' x2='10' y2='10' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                      <line x1='10' y1='10' x2='13' y2='13' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                    </svg>
                    {project.year}
                  </span>
                </div>

                <div className='p-6'>
                  <h3 className='font-display text-xl font-bold transition-colors group-hover:text-[#c8f54a]'>{project.fullName}</h3>
                  <p className='mt-2 text-[13px] leading-relaxed text-white/60'>{project.description}</p>

                  <div className='mt-4 flex flex-wrap gap-1.5'>
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className='inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] transition-colors'
                        style={{ color: (TECH_COLORS[tech] || '#c8f54a') + 'cc' }}
                      >
                        <TechDot name={tech} size={3} />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className='mt-5 flex gap-3'>
                    {project.github && (
                      <a
                        href={project.github}
                        target='_blank'
                        rel='noreferrer'
                        className='group/btn inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white/60 transition-all hover:border-[#c8f54a]/30 hover:text-[#c8f54a]'
                      >
                        <svg width='12' height='12' viewBox='0 0 24 24' fill='currentColor'>
                          <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
                        </svg>
                        GitHub
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target='_blank'
                        rel='noreferrer'
                        className='inline-flex items-center gap-2 rounded-full bg-[#c8f54a]/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[#c8f54a] transition-all hover:bg-[#c8f54a]/20'
                      >
                        <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                          <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6' />
                          <polyline points='15 3 21 3 21 9' />
                          <line x1='10' y1='14' x2='21' y2='3' />
                        </svg>
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Experience ── */

function ExperienceSection() {
  return (
    <Section id='experience' className='relative py-24 md:py-32'>
      <GradientBlob x='80%' y='20%' size='400px' color='#9af54a' delay={1} />

      <div className='mx-auto max-w-[1400px] px-5 md:px-10'>
        <SectionTitle number='04'>Experience</SectionTitle>

        <div className='relative space-y-10 pl-8 md:pl-12'>
          <div className='absolute inset-y-0 left-0 w-px'>
            <div className='h-full w-full bg-gradient-to-b from-[#c8f54a] via-[#c8f54a]/30 to-transparent' />
            <div className='ap-timeline-flow absolute inset-0 w-full' />
          </div>

          {experience.map((exp, i) => (
            <motion.div key={exp.id} variants={slideRight} className='relative'>
              <span className='ap-timeline-pulse absolute -left-8 top-3 h-3 w-3 rounded-full border-2 border-[#c8f54a] bg-[#050505] md:-left-12'>
                <span className='absolute inset-0 rounded-full bg-[#c8f54a]/30' />
              </span>

              <TiltCard className='overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-500 hover:border-[#c8f54a]/20 md:p-8'>
                <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                  <div>
                    <h3 className='font-display text-xl font-bold'>{exp.role}</h3>
                    <p className='mt-0.5 flex items-center gap-2 text-sm text-[#c8f54a]'>
                      <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                        <rect x='2' y='7' width='20' height='14' rx='2' ry='2' />
                        <path d='M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16' />
                      </svg>
                      {exp.company}
                    </p>
                  </div>
                  <span className='inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/40'>
                    <svg width='10' height='10' viewBox='0 0 20 20' fill='none' stroke='currentColor' strokeWidth='1.5'>
                      <circle cx='10' cy='10' r='8' />
                      <line x1='10' y1='6' x2='10' y2='10' strokeLinecap='round' />
                      <line x1='10' y1='10' x2='13' y2='12' strokeLinecap='round' />
                    </svg>
                    {exp.period}
                  </span>
                </div>

                <p className='mt-4 text-[13px] leading-relaxed text-white/60'>{exp.summary}</p>

                <div className='mt-5 flex flex-wrap gap-1.5'>
                  {exp.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className='inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em]'
                      style={{ color: (TECH_COLORS[tech] || '#c8f54a') + '99' }}
                    >
                      <TechDot name={tech} size={3} />
                      {tech}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Contact ── */

function ContactSection() {
  return (
    <Section id='contact' className='relative py-24 md:py-32'>
      <GradientBlob x='50%' y='40%' size='500px' delay={0} />
      <FloatingShape type='ring' x={8} y={30} size={50} delay={0} />
      <FloatingShape type='cross' x={88} y={25} size={25} delay={1} />
      <FloatingShape type='diamond' x={15} y={70} size={35} delay={2} />

      <div className='mx-auto max-w-[1400px] px-5 text-center md:px-10'>
        <motion.p variants={fadeUp} className='inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.35em] text-[#c8f54a]'>
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
            <polyline points='22,6 12,13 2,6' />
          </svg>
          Get in touch
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className='mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl'
        >
          Let&apos;s build
          <br />
          <span className='ap-gradient-text'>something great.</span>
        </motion.h2>

        <motion.div
          variants={lineGrow}
          className='mx-auto mt-8 h-px w-32 origin-center bg-gradient-to-r from-transparent via-[#c8f54a] to-transparent'
        />

        <motion.div variants={fadeUp} className='mt-10 flex flex-wrap items-center justify-center gap-5'>
          <a
            href={`mailto:${site.email}`}
            className='group flex items-center gap-3 rounded-full border border-white/10 px-6 py-3.5 text-[12px] font-medium tracking-[0.1em] text-white/70 transition-all hover:border-[#c8f54a]/30 hover:text-white hover:shadow-[0_0_40px_rgba(200,245,74,0.12)]'
          >
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#c8f54a' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='transition-transform group-hover:scale-110'>
              <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
              <polyline points='22,6 12,13 2,6' />
            </svg>
            {site.email}
          </a>
          <a
            href={site.github}
            target='_blank'
            rel='noreferrer'
            className='group flex items-center gap-3 rounded-full border border-white/10 px-6 py-3.5 text-[12px] font-medium tracking-[0.1em] text-white/70 transition-all hover:border-[#c8f54a]/30 hover:text-white hover:shadow-[0_0_40px_rgba(200,245,74,0.12)]'
          >
            <svg width='16' height='16' viewBox='0 0 24 24' fill='#c8f54a' className='transition-transform group-hover:scale-110'>
              <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
            </svg>
            GitHub
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

/* ── Footer ── */

function Footer() {
  return (
    <footer className='relative z-10 border-t border-white/5 py-8'>
      <div className='mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10'>
        <p className='text-[11px] text-white/25'>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <Link
          to='/'
          className='group flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-[#c8f54a]'
        >
          Main Site
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' className='transition-transform group-hover:translate-x-1'>
            <path d='M5 12H19M19 12L12 5M19 12L12 19' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </Link>
      </div>
    </footer>
  );
}

/* ── Main Export ── */

export default function AnimatedPortfolio() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='ap-root min-h-screen bg-[#050505] text-white'>
      <div className='pointer-events-none fixed inset-0' style={{ zIndex: -1 }}>
        <Scene3D />
      </div>

      <Nav />

      <div className='relative z-10'>
        <HeroSection />
        <TechMarquee />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
