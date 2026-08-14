import { useRef } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { useIsFinePointer, usePrefersReducedMotion } from '../../hooks/useMedia';

export default function MagneticButton({
  as: Comp = 'a',
  children,
  className = '',
  variant = 'solid',
  strength = 0.32,
  ...props
}) {
  const ref = useRef(null);
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  useMagnetic(ref, { strength, disabled: !fine || reduced });

  const variants = {
    solid: 'bg-ink text-bg hover:bg-accent hover:text-accent-ink',
    ghost: 'border border-line bg-transparent text-ink hover:border-ink/40',
    text: 'bg-transparent text-ink',
  };

  return (
    <Comp
      ref={ref}
      data-cursor='button'
      className={`group inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
