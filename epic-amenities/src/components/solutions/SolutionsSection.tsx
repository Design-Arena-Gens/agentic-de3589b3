'use client';

import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { solutions } from '@/data/solutions';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SolutionsSection() {
  const [active, setActive] = useState(solutions[0].id);
  const sectionRef = useRef<HTMLElement>(null);

  const activeSolution = useMemo(() => solutions.find((solution) => solution.id === active) ?? solutions[0], [active]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.solution-item');
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="solutions" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate/40 to-slate/80" />
      <div className="absolute left-1/2 top-0 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="mb-16 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Industry-designed playbooks</p>
          <h2 className="section-heading mt-6">Tailor-made deployments for every environment you activate.</h2>
          <p className="mt-4 text-lg text-white/70">
            Choose a playbook to see how Epic Amenities choreographs merchandising, technology, and service to deliver
            measurable outcomes per industry.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="solution-item flex flex-col gap-4">
            {solutions.map((solution) => (
              <button
                key={solution.id}
                onClick={() => setActive(solution.id)}
                className={clsx(
                  'rounded-3xl border px-6 py-6 text-left transition hover:border-white/30 hover:text-white/90',
                  active === solution.id
                    ? 'border-white/40 bg-white/10 shadow-glow text-white'
                    : 'border-white/10 bg-white/5 text-white/60'
                )}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Playbook</p>
                <p className="mt-2 text-lg font-semibold text-white">{solution.industry}</p>
                <p className="mt-3 text-sm text-white/60">{solution.headline}</p>
              </button>
            ))}
          </div>
          <div className="solution-item relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glass">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: `radial-gradient(circle at 20% 20%, ${activeSolution.texture}55, transparent 60%)`
              }}
            />
            <div className="relative space-y-6">
              <div>
                <p className="uppercase tracking-[0.3em] text-xs text-white/50">Outcome narrative</p>
                <h3 className="mt-3 text-3xl font-display text-white">{activeSolution.industry}</h3>
                <p className="mt-4 text-base text-white/70">{activeSolution.narrative}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {activeSolution.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-5 text-center">
                    <p className="text-2xl font-display text-white">{stat.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Signature programs</p>
                <ul className="mt-3 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
                  {activeSolution.programs.map((program) => (
                    <li key={program} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      {program}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
