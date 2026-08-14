import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap } from '../../lib/gsap';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  });

  return <div ref={barRef} className='scroll-progress' aria-hidden='true' />;
}
