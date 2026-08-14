import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { projects } from '../../data';
import { gsap } from '../../lib/gsap';
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMedia';
import ProjectCard from './ProjectCard';

export default function Work() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!isDesktop || reduced) return;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!track) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray('.project-panel').forEach((panel) => {
        const visual = panel.querySelector('.project-visual');
        const copy = panel.querySelector('.project-copy');
        if (visual) {
          gsap.fromTo(
            visual,
            { y: 36, opacity: 0.35 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'left 82%',
                end: 'left 38%',
                scrub: true,
              },
            }
          );
        }
        if (copy) {
          gsap.fromTo(
            copy,
            { x: -28, opacity: 0.25 },
            {
              x: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'left 78%',
                end: 'left 40%',
                scrub: true,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef, dependencies: [isDesktop, reduced] }
  );

  return (
    <section id='work' ref={sectionRef} data-theme='dark' className='relative bg-surface'>
      {isDesktop ? (
        <div className='h-screen overflow-hidden'>
          <div className='pointer-events-none absolute left-[5vw] top-8 z-10'>
            <p className='meta'>
              <span className='text-accent'>01</span> — Selected work
            </p>
          </div>
          <div ref={trackRef} className='flex h-full will-change-transform'>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ) : (
        <div className='container-site py-20'>
          <p className='meta mb-10'>
            <span className='text-accent'>01</span> — Selected work
          </p>
          {projects.map((project) => (
            <div key={project.id} className='border-t border-line'>
              <ProjectCard project={project} compact />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
