import { useMemo, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { mernFlow, skillGroups, skillInsights, skillLinks, skillNetwork } from '../../data';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/useMedia';
import SplitWords from '../ui/SplitWords';

export default function Skills() {
  const rootRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(null);
  const activeGroup = useMemo(
    () => skillGroups.find((group) => group.items.includes(active))?.id || null,
    [active]
  );
  const insights = active ? skillInsights[active] || [] : [];
  const highlightSpine = active === 'MERN Stack' || activeGroup === 'fullstack';

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        '.skill-line',
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 68%', once: true },
        }
      );
      gsap.from('.skill-dot', {
        scale: 0.5,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 68%', once: true },
      });
      gsap.from('.skill-title .split-word > span', {
        yPercent: 110,
        rotate: 4,
        stagger: 0.05,
        duration: 0.7,
        ease: 'expo.out',
        transformOrigin: '0% 100%',
        scrollTrigger: { trigger: rootRef.current, start: 'top 72%', once: true },
      });
    },
    { scope: rootRef, dependencies: [reduced] }
  );

  const nodeById = Object.fromEntries(skillNetwork.map((node) => [node.id, node]));

  return (
    <section id='skills' ref={rootRef} data-theme='dark' className='relative bg-[#0c0c0c] py-24 md:py-32'>
      <div className='container-site'>
        <p className='meta mb-10'>
          <span className='text-accent'>03</span> | Technical constellation
        </p>
        <div className='grid items-start gap-16 lg:grid-cols-[0.85fr_1.15fr]'>
          <div>
            <h2 className='skill-title font-display max-w-lg text-headline font-extrabold'>
              <SplitWords text='A system, not a list.' />
            </h2>
            <p className='mt-5 max-w-md text-mute'>
              Frontend first, then APIs, auth, and data. I currently work across the full MERN stack.
            </p>

            <div className='mt-8 rounded-2xl border border-line bg-white/[0.03] p-5'>
              <p className='meta text-accent'>MERN STACK</p>
              <ol className='mt-4 font-display text-lg font-semibold tracking-tight'>
                {mernFlow.map((step, index) => (
                  <li key={step} className='flex flex-col items-start'>
                    <span>{step}</span>
                    {index < mernFlow.length - 1 ? (
                      <span className='my-1 ml-1 text-sm font-normal text-accent' aria-hidden='true'>
                        ↓
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>

            <div className='mt-8 min-h-[3.5rem]'>
              {active ? (
                <div>
                  <p className='font-serif text-3xl italic text-accent'>{active}</p>
                  <p className='mt-2 text-sm tracking-[0.18em] text-mute uppercase'>
                    {insights.join(' · ')}
                  </p>
                </div>
              ) : (
                <p className='text-sm text-faint'>Select a technology</p>
              )}
            </div>
            <div className='mt-10 space-y-8'>
              {skillGroups.map((group) => (
                <div key={group.id}>
                  <p className={`meta mb-3 ${activeGroup === group.id ? 'text-accent' : ''}`}>{group.label}</p>
                  <ul className='flex flex-wrap gap-2'>
                    {group.items.map((item) => {
                      const on = !active || active === item || activeGroup === group.id;
                      return (
                        <li key={item}>
                          <button
                            type='button'
                            onMouseEnter={() => setActive(item)}
                            onMouseLeave={() => setActive(null)}
                            onFocus={() => setActive(item)}
                            onBlur={() => setActive(null)}
                            data-cursor='link'
                            className={`rounded-full border px-3 py-1.5 text-sm transition-all duration-300 ${
                              on ? 'border-ink/15 bg-white/5 text-ink' : 'border-transparent text-faint'
                            } ${active === item ? 'border-accent text-accent' : ''}`}
                          >
                            {item}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className='relative hidden aspect-square max-h-[580px] w-full lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:block'>
            <svg viewBox='0 0 100 100' className='h-full w-full overflow-visible' role='img' aria-label='MERN stack flow from React to MongoDB'>
              {skillLinks.map(([from, to]) => {
                const a = nodeById[from];
                const b = nodeById[to];
                const related = highlightSpine
                  ? a.spine && b.spine
                  : !activeGroup || a.group === activeGroup || b.group === activeGroup;
                return (
                  <line
                    key={`${from}-${to}`}
                    className='skill-line'
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={related ? '#c8f54a' : '#2a2a2a'}
                    strokeWidth={related ? '0.35' : '0.22'}
                    pathLength='1'
                    strokeDasharray='1'
                    strokeDashoffset={reduced ? 0 : 1}
                    style={{ transition: 'stroke 0.35s ease, stroke-width 0.35s ease' }}
                  />
                );
              })}
              {skillNetwork.map((node) => {
                const on = highlightSpine
                  ? node.spine
                  : !activeGroup || node.group === activeGroup;
                return (
                  <g key={node.id} className='skill-dot' style={{ opacity: on ? 1 : 0.22 }}>
                    <circle cx={node.x} cy={node.y} r={on ? 1.35 : 1} fill={on ? '#c8f54a' : '#8b8a85'} />
                    <text
                      x={node.x}
                      y={node.y - 2.8}
                      textAnchor='middle'
                      fill={on ? '#ede9e1' : '#5c5b57'}
                      fontSize='3.2'
                      fontFamily='Syne, sans-serif'
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
