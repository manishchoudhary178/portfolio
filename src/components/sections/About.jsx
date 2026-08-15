import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { about, currently, site } from '../../data';
import { gsap } from '../../lib/gsap';
import SplitWords from '../ui/SplitWords';
import { usePrefersReducedMotion } from '../../hooks/useMedia';

export default function About() {
  const rootRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from('.about-line .split-word > span', {
        yPercent: 115,
        rotate: 5,
        stagger: 0.045,
        duration: 0.8,
        ease: 'expo.out',
        transformOrigin: '0% 100%',
        scrollTrigger: { trigger: rootRef.current, start: 'top 74%', once: true },
      });
      gsap.from('.now-row', {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.now-list', start: 'top 80%', once: true },
      });
    },
    { scope: rootRef, dependencies: [reduced] }
  );

  return (
    <section id='about' ref={rootRef} data-theme='light' className='relative bg-bg py-24 md:py-36'>
      <div className='container-site'>
        <p className='meta mb-10'>
          <span className='text-accent'>06</span> | About
        </p>
        <h2 className='about-line font-serif max-w-4xl text-[clamp(1.65rem,3.8vw,3.4rem)] font-normal italic leading-[1.12] tracking-[-0.025em]'>
          {about.statement.map((line) => (
            <span key={line} className='block overflow-hidden'>
              <SplitWords text={line} />
            </span>
          ))}
        </h2>
        <p className='mt-10 max-w-xl text-lg leading-relaxed text-mute'>{site.about}</p>

        <div className='now-list mt-20 border-t border-line pt-10'>
          <p className='meta mb-8'>Currently</p>
          <ul className='space-y-5'>
            {currently.map((item) => (
              <li key={item.label} className='now-row grid gap-1 sm:grid-cols-[160px_1fr] sm:items-baseline'>
                <span className='meta'>{item.label}</span>
                <span className='text-lg md:text-xl'>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
