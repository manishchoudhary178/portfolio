import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { craft } from '../../data';
import { gsap } from '../../lib/gsap';
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMedia';

export default function Craft() {
  const rootRef = useRef(null);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!isDesktop || reduced) return;
      const nums = gsap.utils.toArray('.craft-num');
      const titles = gsap.utils.toArray('.craft-title');
      const texts = gsap.utils.toArray('.craft-text');

      gsap.set([nums, titles, texts], { opacity: 0 });
      gsap.set([nums[0], titles[0], texts[0]], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 1.8}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });

      nums.forEach((_, index) => {
        if (index === 0) return;
        const start = index - 1;
        tl.to([nums[start], titles[start], texts[start]], { opacity: 0, y: -20, duration: 0.4 }, start)
          .fromTo(
            [nums[index], titles[index], texts[index]],
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.4 },
            start
          );
      });
    },
    { scope: rootRef, dependencies: [isDesktop, reduced] }
  );

  return (
    <section ref={rootRef} data-theme='light' className='relative bg-bg text-ink'>
      <div className='container-site py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0'>
        <p className='meta mb-8'>
          <span className='text-accent'>04</span> | I care about
        </p>

        <div className='lg:hidden space-y-12'>
          {craft.map((item) => (
            <article key={item.id}>
              <p className='font-display text-4xl font-extrabold'>{item.number}</p>
              <h3 className='font-display mt-3 text-2xl font-bold'>{item.title}</h3>
              <p className='mt-3 max-w-md text-mute'>{item.text}</p>
            </article>
          ))}
        </div>

        <div className='hidden lg:grid lg:grid-cols-[0.4fr_1fr] lg:items-center lg:gap-16'>
          <div className='relative h-40'>
            {craft.map((item) => (
              <p key={item.id} className='craft-num font-display absolute left-0 top-0 text-[5.5rem] font-extrabold leading-none tracking-[-0.06em]'>
                {item.number}
              </p>
            ))}
          </div>
          <div className='relative min-h-[220px]'>
            {craft.map((item) => (
              <div key={item.id} className='absolute inset-0'>
                <h3 className='craft-title font-display text-5xl font-extrabold tracking-tight'>{item.title}</h3>
                <p className='craft-text mt-6 max-w-xl text-lg leading-relaxed text-mute'>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
