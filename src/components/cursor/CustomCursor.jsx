import { useEffect, useRef } from 'react';
import { useIsFinePointer, usePrefersReducedMotion } from '../../hooks/useMedia';

export default function CustomCursor() {
  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const enabled = useIsFinePointer() && !usePrefersReducedMotion();

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-custom-cursor');
      return undefined;
    }

    document.documentElement.classList.add('has-custom-cursor');
    const root = rootRef.current;
    let raf = 0;

    const onMove = (event) => {
      pos.current.x = event.clientX;
      pos.current.y = event.clientY;
    };

    const onOver = (event) => {
      const target = event.target.closest('[data-cursor]');
      const next = target?.getAttribute('data-cursor') || 'default';
      const label = target?.getAttribute('data-cursor-label') || '';
      root.classList.toggle('is-link', next === 'link');
      root.classList.toggle('is-button', next === 'button');
      root.classList.toggle('is-project', next === 'project');
      root.classList.toggle('is-visual', next === 'visual');
      if (labelRef.current) labelRef.current.textContent = label;
    };

    const tick = () => {
      pos.current.rx += (pos.current.x - pos.current.rx) * 0.16;
      pos.current.ry += (pos.current.y - pos.current.ry) * 0.16;
      dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      ringRef.current.style.transform = `translate3d(${pos.current.rx}px, ${pos.current.ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className='cursor' aria-hidden='true'>
      <div ref={dotRef} className='cursor-dot' />
      <div ref={ringRef} className='cursor-ring'>
        <span ref={labelRef} />
      </div>
    </div>
  );
}
