'use client';

import clsx from 'clsx';
import { useLenisInstance } from './LenisProvider';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NAV_SECTIONS = [
  { id: 'features', label: 'Technology' },
  { id: 'products', label: 'Products' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
] as const;

export default function Navigation() {
  const { lenis } = useLenisInstance();
  const [active, setActive] = useState<string>('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = ['hero', ...NAV_SECTIONS.map((item) => item.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75]
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback(
    (id: string) => {
      setMobileOpen(false);
      const target = document.getElementById(id);
      if (!target) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (lenis && !prefersReducedMotion) {
        lenis.scrollTo(target, {
          offset: -120,
          duration: 1.1
        });
      } else {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    },
    [lenis]
  );

  const navItems = useMemo(
    () =>
      NAV_SECTIONS.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavigate(item.id)}
          className={clsx(
            'relative px-4 py-2 text-sm font-medium transition-colors duration-200',
            'text-white/70 hover:text-white focus-visible:text-white focus-visible:outline-none',
            active === item.id && 'text-white'
          )}
        >
          <span
            className={clsx(
              'absolute left-1/2 -bottom-1 h-[2px] w-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300',
              active === item.id && 'w-2/3 -translate-x-1/2'
            )}
          />
          {item.label}
        </button>
      )),
    [active, handleNavigate]
  );

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate/85 via-slate/50 to-transparent blur-xl" />
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-16">
        <button
          className="pointer-events-auto flex items-center gap-3 focus-visible:outline-none"
          onClick={() => handleNavigate('hero')}
        >
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-[18px] bg-slate">
              <span className="text-lg font-semibold text-white">EA</span>
            </div>
          </div>
          <span className="hidden text-lg font-semibold tracking-tight text-white md:block">Epic Amenities</span>
        </button>
        <nav className="hidden pointer-events-auto items-center gap-1 rounded-full border border-white/10 bg-slate/80 px-2 py-1 shadow-glass backdrop-blur md:flex">
          {navItems}
        </nav>
        <div className="pointer-events-auto flex items-center gap-4">
          <button
            onClick={() => handleNavigate('contact')}
            className="hidden rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-5 py-2 text-sm font-semibold text-white shadow-glow transition hover:shadow-glow/60 lg:block"
          >
            Request Demo
          </button>
          <button
            onClick={() => setMobileOpen((state) => !state)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:text-white focus-visible:outline-none md:hidden"
          >
            {mobileOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <div
        id="mobile-navigation"
        className={clsx(
          'md:hidden fixed inset-x-4 top-24 z-50 rounded-3xl border border-white/10 bg-slate/95 p-6 shadow-glass transition-all duration-300 lg:hidden',
          mobileOpen ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-4'
        )}
      >
        <div className="flex flex-col gap-3">
          {NAV_SECTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={clsx(
                'rounded-2xl px-4 py-3 text-left text-base font-medium text-white/70 transition',
                active === item.id && 'bg-white/5 text-white shadow-inner'
              )}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavigate('contact')}
            className="mt-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-4 py-3 text-base font-semibold shadow-glow"
          >
            Speak with our team
          </button>
        </div>
      </div>
    </header>
  );
}
