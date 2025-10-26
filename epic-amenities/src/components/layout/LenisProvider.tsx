'use client';

import Lenis from 'lenis';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useRef, useState } from 'react';

type LenisContextValue = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null
});

export const useLenisInstance = () => useContext(LenisContext);

export function LenisProvider({ children }: PropsWithChildren) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setLenis(null);
      return;
    }

    const instance = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      gestureOrientation: 'vertical'
    });

    const raf = (time: number) => {
      instance.raf(time);
      frameRef.current = requestAnimationFrame(raf);
    };

    frameRef.current = requestAnimationFrame(raf);
    setLenis(instance);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      instance.destroy();
    };
  }, []);

  const value = useMemo(() => ({ lenis }), [lenis]);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
