import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { experience } from '../../data';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMedia';

function ExperienceCard({ item, index, sticky }) {
  return (
    <article
      className={`exp-card ${sticky ? 'lg:sticky lg:top-[calc(var(--nav-h)+1.25rem)]' : ''}`}
    >
      <div className='exp-card-shell overflow-hidden rounded-[1.6rem] border border-line bg-[#101010] p-6 md:p-9'>
        <div className='exp-card-inner'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <img
                src={item.logo}
                alt=''
                className='h-12 w-12 rounded-full bg-raised object-contain p-1.5 ring-1 ring-white/10'
              />
              <div>
                <p className='meta text-accent'>{item.roleDetail}</p>
                <p className='mt-1 text-sm text-mute'>{item.period}</p>
              </div>
            </div>
            <p className='font-mono text-[0.68rem] tracking-[0.18em] text-faint'>
              {String(index + 1).padStart(2, '0')}
            </p>
          </div>

          <h3 className='font-display mt-8 text-[clamp(1.55rem,2.8vw,2.55rem)] font-extrabold leading-[1.05] tracking-tight'>
            {item.role}
          </h3>
          <p className='mt-3 font-serif text-2xl italic text-mute'>{item.company}</p>
          <p className='mt-1 text-sm text-faint'>{item.focus}</p>
          <p className='mt-6 max-w-xl text-[0.98rem] leading-relaxed text-ink/85'>{item.summary}</p>
          <ul className='mt-6 flex flex-wrap gap-2'>
            {item.technologies.map((tech) => (
              <li
                key={tech}
                className='rounded-full border border-line px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-mute'
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Experience() {
  const rootRef = useRef(null);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.exp-card');
      const count = rootRef.current.querySelector('.exp-count');
      const fill = rootRef.current.querySelector('.exp-fill');
      const track = rootRef.current.querySelector('.exp-track');

      const setCount = (index) => {
        if (!count) return;
        count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
      };

      cards.forEach((card, index) => {
        gsap.from(card.querySelector('.exp-card-inner'), {
          y: reduced ? 0 : 28,
          opacity: 0,
          duration: reduced ? 0 : 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            once: true,
          },
        });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 48%',
          end: 'bottom 48%',
          onEnter: () => setCount(index),
          onEnterBack: () => setCount(index),
        });
      });

      if (fill && track) {
        gsap.fromTo(
          fill,
          { scaleY: 0.12 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: track,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 0.4,
            },
          }
        );
      }

      if (!isDesktop || reduced) return;

      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return;
        const shell = card.querySelector('.exp-card-shell');
        gsap.to(shell, {
          scale: 0.94,
          filter: 'brightness(0.58)',
          ease: 'none',
          transformOrigin: '50% 0%',
          scrollTrigger: {
            trigger: next,
            start: 'top bottom',
            end: 'top 22%',
            scrub: 0.55,
          },
        });
      });
    },
    { scope: rootRef, dependencies: [isDesktop, reduced] }
  );

  return (
    <section id='experience' ref={rootRef} data-theme='dark' className='relative bg-bg'>
      <div className='container-site py-24 md:py-32'>
        <div className='mb-12 flex items-end justify-between gap-6'>
          <p className='meta'>
            <span className='text-accent'>02</span> — Experience
          </p>
          <p className='exp-count hidden font-mono text-xs tracking-[0.18em] text-faint lg:block'>01 / 03</p>
        </div>

        <div className='grid items-start gap-10 lg:grid-cols-[72px_1fr]'>
          <div className='relative hidden self-stretch lg:block' aria-hidden='true'>
            <span className='sticky top-[calc(var(--nav-h)+1.5rem)] mx-auto block h-[42vh] w-px overflow-hidden bg-white/10'>
              <span className='exp-fill block h-full w-full origin-top bg-accent' />
            </span>
          </div>

          <div className='exp-track flex flex-col gap-5 pb-[18vh] lg:gap-7'>
            {experience.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} sticky={isDesktop && !reduced} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
