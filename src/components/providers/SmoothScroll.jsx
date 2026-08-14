import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/useMedia';

const SmoothScrollContext = createContext(null);

export function useLenis() {
  return useContext(SmoothScrollContext);
}

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setLenis(null);
      return undefined;
    }

    const instance = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    let velocity = 0;

    instance.on('scroll', (event) => {
      ScrollTrigger.update();
      velocity = Math.max(-2.6, Math.min(2.6, event.velocity * 0.12));
    });

    const ticker = (time) => {
      instance.raf(time * 1000);
      velocity *= 0.88;
      if (Math.abs(velocity) < 0.02) velocity = 0;
      document.documentElement.style.setProperty('--scroll-v', velocity.toFixed(3));
    };

    gsap.ticker.add(ticker);
    setLenis(instance);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      gsap.ticker.remove(ticker);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return <SmoothScrollContext.Provider value={lenis}>{children}</SmoothScrollContext.Provider>;
}
