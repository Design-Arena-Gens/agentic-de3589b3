'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.out'
      },
      paused: prefersReducedMotion
    });

    if (!prefersReducedMotion) {
      tl.to(
        {},
        {
          duration: 2.2,
          onUpdate: () => setProgress(Math.min(100, Math.round(tl.progress() * 120))),
          onComplete: () => setProgress(100)
        }
      );

      const handleLoad = () => {
        gsap.to({}, {
          duration: 0.4,
          onComplete: () => setProgress(100)
        });
      };

      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad, { once: true });
      }
      return () => {
        tl.kill();
        window.removeEventListener('load', handleLoad);
      };
    }

    // Reduced motion: skip animation
    setProgress(100);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [progress]);

  useEffect(() => {
    if (!visible && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.6,
        ease: 'power2.out'
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1000] bg-slate/95 backdrop-blur-xl flex items-center justify-center"
      aria-live="polite"
    >
      <div className="w-72 max-w-[80vw]">
        <div className="text-center mb-6 space-y-2">
          <p className="text-base uppercase tracking-[0.3em] text-white/60">Epic Amenities</p>
          <p className="text-lg font-medium text-white/80">Calibrating Intelligent Dispensing</p>
        </div>
        <div className="gradient-border">
          <div className="relative rounded-[22px] px-6 py-5">
            <div className="flex justify-between text-sm text-white/70 mb-3">
              <span>System readiness</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-4 text-xs text-white/50 uppercase tracking-[0.2em]">
              Deploying smart vending intelligence...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
