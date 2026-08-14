import { useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useIsFinePointer, usePrefersReducedMotion } from '../../hooks/useMedia';

export default function ProjectCard({ project, compact = false }) {
  const visualRef = useRef(null);
  const frameRef = useRef(null);
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();

  const onMove = (event) => {
    if (!fine || reduced || compact) return;
    const node = visualRef.current;
    const frame = frameRef.current;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(frame, { y: y * 6, x: x * 8, duration: 0.7, ease: 'power3.out' });
    gsap.to(node.querySelector('.project-cta'), { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' });
  };

  const onLeave = () => {
    gsap.to(frameRef.current, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
    gsap.to(visualRef.current?.querySelector('.project-cta'), { opacity: 0, y: 8, duration: 0.3 });
  };

  return (
    <article
      className={`project-panel relative flex h-full ${compact ? 'w-full flex-col gap-8 py-12' : 'w-screen shrink-0 items-stretch'}`}
    >
      <div
        className={`grid h-full w-full ${compact ? 'grid-cols-1 gap-8' : 'grid-cols-[minmax(240px,0.42fr)_1.58fr]'}`}
      >
        <div className={`project-copy flex flex-col justify-center ${compact ? '' : 'px-[5vw] py-24'}`}>
          <p className='meta text-accent'>
            {project.number} — {project.kicker}
          </p>
          <h3 className='project-title font-display mt-4 text-[clamp(1.6rem,3vw,2.8rem)] font-extrabold leading-[1.05] tracking-[-0.035em]'>
            {project.name}
          </h3>
          <p className='mt-5 max-w-md text-[0.95rem] leading-relaxed text-mute'>{project.description}</p>

          <ol className='stack-flow mt-8 text-sm'>
            {project.stack.map((item, index) => (
              <li key={item}>
                <span className='inline-flex items-center gap-2'>
                  <span className='h-1.5 w-1.5 rounded-full bg-accent' />
                  {item}
                </span>
                {index < project.stack.length - 1 ? <span className='stack-pulse' /> : null}
              </li>
            ))}
          </ol>

          <a
            href={project.github}
            target='_blank'
            rel='noreferrer'
            data-cursor='link'
            className='underline-anim mt-8 w-fit text-sm font-medium'
          >
            Open case study →
          </a>
        </div>

        <div
          ref={visualRef}
          className={`project-visual flex items-center ${compact ? '' : 'h-full py-20 pr-[5vw] pl-4'}`}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <a
            ref={frameRef}
            href={project.live || project.github}
            target='_blank'
            rel='noreferrer'
            data-cursor='project'
            data-cursor-label={'VIEW\nCASE'}
            className='relative block w-full'
            aria-label={`Open ${project.fullName}`}
          >
            <div className='overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_24px_80px_rgba(0,0,0,0.45)]'>
              <div className='flex h-8 items-center gap-1.5 border-b border-white/10 px-3' aria-hidden='true'>
                <span className='h-2 w-2 rounded-full bg-white/25' />
                <span className='h-2 w-2 rounded-full bg-white/25' />
                <span className='h-2 w-2 rounded-full bg-accent/80' />
              </div>
              <img
                src={project.image}
                alt={`${project.fullName} preview`}
                className='mx-auto block h-auto w-auto max-h-[72vh] max-w-full object-contain'
                loading='lazy'
                decoding='async'
              />
            </div>
            <span className='project-cta pointer-events-none absolute bottom-6 left-6 translate-y-2 rounded-full bg-ink px-5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-bg opacity-0'>
              Open case study →
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
