import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { useIsFinePointer, usePrefersReducedMotion } from '../../hooks/useMedia';

export default function InterfaceStack() {
  const rootRef = useRef(null);
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.55 });
      tl.from('.iface-wire', { opacity: 0, scale: 0.96, duration: 0.6 }, 0.15)
        .from('.iface-frame', { clipPath: 'inset(50% 50% 50% 50%)', duration: 0.75, ease: 'expo.out' }, 0.22)
        .from('.iface-block', { y: 18, opacity: 0, stagger: 0.06, duration: 0.45 }, 0.45)
        .from('.iface-code', { opacity: 0, y: 10, duration: 0.4 }, 0.55)
        .from('.iface-chip', { y: 12, opacity: 0, stagger: 0.08, duration: 0.4 }, 0.5);
    },
    { scope: rootRef, dependencies: [reduced] }
  );

  useEffect(() => {
    if (!fine || reduced) return undefined;
    const root = rootRef.current;

    const onMove = (event) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(root, {
        rotateY: x * 11,
        rotateX: -y * 7,
        duration: 0.9,
        ease: 'power3.out',
      });
      gsap.to(root.querySelectorAll('.iface-layer-a'), { x: x * 10, y: y * 8, duration: 1, ease: 'power3.out' });
      gsap.to(root.querySelectorAll('.iface-layer-b'), { x: x * 22, y: y * 14, duration: 1, ease: 'power3.out' });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [fine, reduced]);

  return (
    <div
      ref={rootRef}
      className='iface-scene mx-auto'
      data-cursor='visual'
      aria-hidden='true'
    >
      <div className='iface-layer-a iface-wire absolute inset-0 border border-dashed border-white/10' />

      <div className='iface-frame iface-layer-a'>
        <div className='iface-chrome'>
          <span className='iface-dot' />
          <span className='iface-dot' />
          <span className='iface-dot' />
          <span className='ml-3 font-mono text-[10px] tracking-widest text-mute'>localhost / product</span>
        </div>
        <div className='grid h-[calc(100%-40px)] grid-cols-[72px_1fr]'>
          <div className='space-y-2 border-r border-line p-3'>
            <span className='iface-block block h-2 w-8 rounded-full bg-white/15' />
            <span className='iface-block block h-8 rounded bg-white/5' />
            <span className='iface-block block h-8 rounded bg-white/5' />
            <span className='iface-block block h-8 rounded bg-accent/20' />
          </div>
          <div className='flex flex-col gap-3 p-4'>
            <span className='iface-block meta text-accent'>Module</span>
            <span className='iface-block h-3 w-2/3 rounded-full bg-white/20' />
            <span className='iface-block h-24 rounded-md bg-white/[0.04] ring-1 ring-white/10' />
            <span className='iface-block mt-auto inline-flex w-fit rounded-full bg-accent px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-accent-ink'>
              OPEN →
            </span>
          </div>
        </div>
      </div>

      <div className='iface-layer-b iface-code absolute -left-2 bottom-[12%] max-w-[70%] rounded-lg border border-line bg-black/70 px-3 py-2 font-mono text-[10px] leading-relaxed text-mute backdrop-blur-md md:-left-6'>
        <span className='text-accent'>const</span> experience = {'{'}
        <br />
        &nbsp;&nbsp;complex: <span className='text-ink'>false</span>,
        <br />
        &nbsp;&nbsp;usable: <span className='text-ink'>true</span>
        <br />
        {'}'}
      </div>

      <span className='iface-layer-b iface-chip absolute -right-3 top-[18%] rounded-full border border-line bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-ink backdrop-blur-md'>
        React
      </span>
      <span className='iface-layer-b iface-chip absolute right-[6%] top-[46%] rounded-full border border-line bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-ink backdrop-blur-md'>
        API
      </span>
      <span className='iface-layer-b iface-chip absolute bottom-[22%] right-[-4%] rounded-full border border-accent/40 bg-accent px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-accent-ink'>
        Interface
      </span>
    </div>
  );
}
