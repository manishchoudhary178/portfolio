import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { hero } from '../../data';
import { gsap } from '../../lib/gsap';
import { useIsFinePointer, usePrefersReducedMotion } from '../../hooks/useMedia';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import { useLenis } from '../providers/SmoothScroll';
import MagneticButton from '../ui/MagneticButton';
import SplitWords from '../ui/SplitWords';
import InterfaceStack from '../identity/InterfaceStack';

export default function Hero() {
  const rootRef = useRef(null);
  const typeRef = useRef(null);
  const lenis = useLenis();
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  usePointerParallax(typeRef, { x: 10, y: 6, disabled: !fine || reduced });

  useGSAP(
    () => {
      if (reduced) return;

      const words = gsap.utils.toArray('.hero-line .split-word > span');
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.48 });

      tl.from('.hero-meta > *', { y: 10, opacity: 0, stagger: 0.08, duration: 0.4 }, 0)
        .from(
          words,
          {
            yPercent: 118,
            rotate: 7,
            stagger: 0.05,
            duration: 0.78,
            transformOrigin: '0% 100%',
          },
          0.08
        )
        .from('.hero-copy', { y: 18, opacity: 0, duration: 0.5 }, 0.42)
        .from('.hero-actions > *', { y: 16, opacity: 0, stagger: 0.1, duration: 0.45 }, 0.52)
        .from('.hero-object', { x: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.28)
        .from('.hero-scroll', { opacity: 0, y: 8, duration: 0.4 }, 0.7);
    },
    { scope: rootRef, dependencies: [reduced] }
  );

  const go = (id) => {
    if (lenis) lenis.scrollTo(`#${id}`, { duration: 1.2 });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={rootRef}
      data-theme='dark'
      className='relative flex min-h-[100svh] items-center overflow-hidden pt-24'
      aria-label='Introduction'
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(200,245,74,0.07),transparent_42%)]' />

      <div className='container-site relative z-10 grid w-full items-center gap-12 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8'>
        <div>
          <div className='hero-meta mb-7 flex flex-wrap items-center justify-between gap-3 lg:max-w-2xl'>
            <span className='meta'>{hero.metaLeft}</span>
            <span className='meta'>{hero.metaRight}</span>
          </div>

          <h1 ref={typeRef} className='velocity-shift font-display text-display font-extrabold text-ink'>
            {hero.lines.map((line) => (
              <span
                key={line.text}
                className='hero-line line-mask block'
                style={{ marginLeft: line.offset }}
              >
                <SplitWords
                  text={line.text}
                  accent={line.accent}
                  className={line.accent ? 'font-serif text-[0.86em] font-normal italic' : ''}
                />
              </span>
            ))}
          </h1>

          <p className='hero-copy mt-7 max-w-md text-[0.95rem] leading-relaxed text-mute md:text-base'>
            {hero.description}
          </p>

          <div className='hero-actions mt-9 flex flex-wrap items-center gap-4'>
            <MagneticButton as='button' type='button' onClick={() => go('work')}>
              View work
              <span className='transition-transform duration-300 group-hover:translate-x-1' aria-hidden='true'>
                →
              </span>
            </MagneticButton>
            <MagneticButton as='button' type='button' variant='ghost' onClick={() => go('contact')}>
              Start a conversation
            </MagneticButton>
          </div>
          <p className='mt-8 font-mono text-[11px] leading-relaxed text-faint lg:hidden'>
            const experience = {'{'} usable: true {'}'}
          </p>
        </div>

        <div className='hero-object hidden lg:block'>
          <InterfaceStack />
        </div>
      </div>

      <button
        type='button'
        onClick={() => go('intro')}
        className='hero-scroll absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-mute md:flex'
        data-cursor='link'
      >
        <span className='meta'>Scroll</span>
        <span className='relative h-12 w-px overflow-hidden bg-white/10'>
          <span className='scroll-drop absolute inset-x-0 top-0 h-1/2 bg-accent' />
        </span>
      </button>
    </section>
  );
}
