import { useEffect } from 'react';
import { gsap } from '../lib/gsap';

export function useMagnetic(ref, { strength = 0.28, disabled = false } = {}) {
  useEffect(() => {
    const node = ref.current;
    if (!node || disabled) return undefined;

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(node, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' });
    };

    const onLeave = () => {
      gsap.to(node, { x: 0, y: 0, duration: 0.7, ease: 'expo.out' });
    };

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, strength, disabled]);
}
