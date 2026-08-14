import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/useMedia';
import { site } from '../../data';

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null);
  const doneRef = useRef(false);
  const reduced = usePrefersReducedMotion();

  const complete = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onComplete?.();
  };

  useEffect(() => {
    const safety = window.setTimeout(complete, 1600);
    return () => window.clearTimeout(safety);
  }, [onComplete]);

  useGSAP(
    () => {
      if (reduced) {
        complete();
        return;
      }

      const letters = rootRef.current.querySelectorAll('.pl-letter');
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: complete,
      });

      tl.from(letters, { yPercent: 120, stagger: 0.035, duration: 0.45 }, 0)
        .fromTo('.preloader-bar', { scaleX: 0 }, { scaleX: 1, duration: 0.42, ease: 'power3.inOut' }, 0.12)
        .to(rootRef.current, { yPercent: -100, duration: 0.72, ease: 'power4.inOut' }, 0.62);
    },
    { scope: rootRef, dependencies: [reduced] }
  );

  if (reduced) return null;

  return (
    <div ref={rootRef} className='preloader' aria-hidden='true'>
      <div className='flex flex-col items-center gap-6'>
        <p className='font-display overflow-hidden text-4xl font-bold tracking-[0.28em] md:text-6xl'>
          {site.firstName.toUpperCase().split('').map((letter, i) => (
            <span key={`${letter}-${i}`} className='pl-letter inline-block'>
              {letter}
            </span>
          ))}
        </p>
        <span className='preloader-bar h-px w-40 bg-accent' />
      </div>
    </div>
  );
}
