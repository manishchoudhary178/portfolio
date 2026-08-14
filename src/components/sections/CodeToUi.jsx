import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMedia';

export default function CodeToUi() {
  const rootRef = useRef(null);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const code = rootRef.current.querySelector('.code-panel');
      const ui = rootRef.current.querySelector('.ui-panel');
      if (!code || !ui) return;

      if (!isDesktop) {
        gsap.from(ui, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%', once: true },
        });
        return;
      }

      gsap.set(ui, { clipPath: 'inset(50% 50% 50% 50%)', scale: 0.86, opacity: 0.4 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
          },
        })
        .to(code, { x: -40, opacity: 0.28, filter: 'blur(1px)', ease: 'none' }, 0)
        .to(ui, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, opacity: 1, ease: 'none' }, 0);
    },
    { scope: rootRef, dependencies: [isDesktop, reduced] }
  );

  return (
    <section ref={rootRef} data-theme='dark' className='relative overflow-hidden bg-bg'>
      <div className='container-site flex min-h-[100svh] flex-col justify-center py-24'>
        <p className='meta mb-8'>
          <span className='text-accent'>05</span> — Code becomes experience
        </p>
        <div className='grid items-center gap-10 lg:grid-cols-2'>
          <pre className='code-panel overflow-x-auto rounded-2xl border border-line bg-black/50 p-6 font-mono text-[13px] leading-7 text-mute md:text-sm'>
            <code>
              <span className='text-accent'>const</span> experience = {'{'}
              {'\n'}
              {'  '}design: <span className='text-ink'>true</span>,{'\n'}
              {'  '}performance: <span className='text-ink'>true</span>,{'\n'}
              {'  '}usability: <span className='text-ink'>true</span>
              {'\n'}
              {'}'}
            </code>
          </pre>

          <div className='ui-panel rounded-3xl border border-line bg-raised p-6 shadow-2xl'>
            <div className='mb-5 flex items-center justify-between'>
              <p className='meta'>ERP module</p>
              <span className='rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold tracking-widest text-mute'>
                SKETCH
              </span>
            </div>
            <h3 className='font-display text-3xl font-bold'>Invoice register</h3>
            <p className='mt-2 text-sm text-mute'>Finance workflow — clear states, typed data, API-backed rows.</p>
            <div className='mt-6 space-y-2'>
              <div className='flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm'>
                <span>Draft</span>
                <span className='text-mute'>Waiting</span>
              </div>
              <div className='flex items-center justify-between rounded-xl bg-accent/15 px-4 py-3 text-sm'>
                <span>In review</span>
                <span className='text-accent'>Active</span>
              </div>
              <div className='flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm'>
                <span>Posted</span>
                <span className='text-mute'>Complete</span>
              </div>
            </div>
            <button type='button' className='mt-6 rounded-full bg-ink px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-bg'>
              Open module →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
