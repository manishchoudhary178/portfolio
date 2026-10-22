import { Suspense, useEffect, useRef, useState } from 'react';

/**
 * Loads heavy section chunks only when the user scrolls near them.
 * Keeps first paint small for Lighthouse FCP/LCP.
 */
export default function DeferredSection({ children, minHeight = '50vh', rootMargin = '280px 0px' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}
