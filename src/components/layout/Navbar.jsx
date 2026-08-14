import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { navLinks, site } from '../../data';
import { gsap } from '../../lib/gsap';
import { useLenis } from '../providers/SmoothScroll';
import { usePrefersReducedMotion } from '../../hooks/useMedia';
import { useNavTheme } from '../../hooks/useNavTheme';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const headerRef = useRef(null);
  const lenis = useLenis();
  const reduced = usePrefersReducedMotion();
  const theme = useNavTheme();

  useGSAP(() => {
    if (reduced) return;
    gsap.from(headerRef.current, { y: -18, opacity: 0, duration: 0.55, ease: 'power3.out', delay: 0.7 });
  }, [reduced]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    if (lenis) lenis.scrollTo(`#${id}`, { offset: 0, duration: 1.1 });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const goTop = () => {
    setOpen(false);
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      ref={headerRef}
      data-theme={theme}
      className={`fixed inset-x-0 top-0 z-50 text-ink transition-[background-color,backdrop-filter,height,border-color,color] duration-500 ${
        scrolled || open
          ? 'border-b border-line bg-bg/75 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a
        href='#work'
        className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-bg'
      >
        Skip to work
      </a>
      <nav
        className={`container-site flex items-center justify-between transition-[height,padding] duration-500 ${
          scrolled ? 'h-14' : 'h-[76px]'
        }`}
        aria-label='Primary'
      >
        <button
          type='button'
          onClick={goTop}
          data-cursor='link'
          className='font-display text-sm font-semibold tracking-[0.22em] text-ink'
        >
          {site.firstName.toUpperCase()}
        </button>

        <ul className='hidden items-center gap-8 lg:flex'>
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type='button'
                onClick={() => go(link.id)}
                data-cursor='link'
                className={`nav-link meta text-ink/80 ${active === link.id ? 'is-active text-ink' : ''}`}
                aria-current={active === link.id ? 'location' : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className='hidden items-center gap-5 lg:flex'>
          {site.resumeUrl ? (
            <a
              href={site.resumeUrl}
              target='_blank'
              rel='noreferrer'
              data-cursor='link'
              className='meta text-accent underline-anim'
            >
              Resume
            </a>
          ) : (
            <button type='button' onClick={() => go('contact')} data-cursor='link' className='meta text-accent underline-anim'>
              Get in touch
            </button>
          )}
        </div>

        <button
          type='button'
          className='relative z-50 flex h-10 w-10 items-center justify-center lg:hidden'
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className='sr-only'>Menu</span>
          <span className='flex w-5 flex-col gap-1.5'>
            <span className={`h-px w-full bg-ink transition-transform ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`h-px w-full bg-ink transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl lg:hidden'
          >
            <div className='flex h-full flex-col justify-between px-6 pb-10 pt-24'>
              <ul className='space-y-5'>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.35 }}
                  >
                    <button
                      type='button'
                      onClick={() => go(link.id)}
                      className='font-display text-4xl font-semibold tracking-tight text-ink'
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className='space-y-3 text-mute'>
                <a href={`mailto:${site.email}`} className='block underline-anim'>
                  {site.email}
                </a>
                <a href={site.github} target='_blank' rel='noreferrer' className='block underline-anim'>
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
