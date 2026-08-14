import { useEffect, useState } from 'react';

export function useNavTheme() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const sections = document.querySelectorAll('[data-theme]');
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setTheme(visible.target.getAttribute('data-theme') || 'dark');
      },
      { rootMargin: '-12% 0px -70% 0px', threshold: [0, 0.2, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return theme;
}
