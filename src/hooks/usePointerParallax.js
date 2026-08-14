import { useEffect } from 'react';
import { gsap } from '../lib/gsap';

export function usePointerParallax(ref, { x = 14, y = 10, disabled = false } = {}) {
  useEffect(() => {
    const node = ref.current;
    if (!node || disabled) return undefined;

    const onMove = (event) => {
      const px = (event.clientX / window.innerWidth - 0.5) * 2;
      const py = (event.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(node, { x: px * x, y: py * y, duration: 1.15, ease: 'power3.out' });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [ref, x, y, disabled]);
}
