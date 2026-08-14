import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { intro } from '../../data';
import { gsap } from '../../lib/gsap';
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMedia';
import SplitWords from '../ui/SplitWords';

export default function Intro() {
  const rootRef = useRef(null);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const lead = rootRef.current.querySelector('.intro-lead');
      const heroLine = rootRef.current.querySelector('.intro-hero');
      const glue = rootRef.current.querySelector('.intro-glue');
      const end = rootRef.current.querySelector('.intro-end');
      const words = rootRef.current.querySelectorAll('.intro-hero .split-word > span');

      if (reduced || !isDesktop) {
        gsap.set([lead, heroLine, glue, end, words], { opacity: 1, y: 0, scale: 1, x: 0, rotate: 0 });
        return;
      }

      gsap.set(lead, { y: 28, opacity: 0.25 });
      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.set(glue, { opacity: 0, y: 16 });
      gsap.set(end, { opacity: 0, y: 36, scale: 0.96 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
        },
      });

      tl.to(lead, { y: 0, opacity: 1, ease: 'none' }, 0)
        .to(lead, { y: -36, scale: 0.72, opacity: 0.4, ease: 'none' }, 0.22)
        .to(words, { yPercent: 0, opacity: 1, stagger: 0.08, ease: 'none' }, 0.12)
        .to(glue, { opacity: 1, y: 0, ease: 'none' }, 0.42)
        .to(end, { opacity: 1, y: 0, scale: 1, ease: 'none' }, 0.52);
    },
    { scope: rootRef, dependencies: [isDesktop, reduced] }
  );

  return (
    <section id='intro' ref={rootRef} data-theme='dark' className='relative bg-bg'>
      <div className='flex min-h-[100svh] flex-col justify-center overflow-hidden px-[6vw] py-24'>
        <p className='intro-lead font-display text-[clamp(2.1rem,5.2vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.04em]'>
          {intro.stages[0].text}
        </p>
        <p className='intro-hero font-display mt-3 max-w-[20ch] text-[clamp(1.8rem,4.8vw,4.1rem)] font-extrabold leading-[0.95] tracking-[-0.04em]'>
          <SplitWords text={intro.stages[1].text} />
        </p>
        <p className='intro-glue meta mt-8'>{intro.stages[2].text}</p>
        <p className='intro-end font-serif mt-3 text-[clamp(1.6rem,3.8vw,3.4rem)] italic leading-[1.05] text-accent'>
          {intro.stages[3].text}
        </p>
      </div>
    </section>
  );
}
