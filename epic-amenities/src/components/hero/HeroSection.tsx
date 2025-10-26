'use client';

import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

const VendingMachineCanvas = dynamic(() => import('../three/VendingMachineModel').then((mod) => mod.VendingMachineCanvas), {
  ssr: false
});

const HeroParticles = dynamic(() => import('./HeroParticles'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const heroPalette = {
  primary: '#2563eb',
  secondary: '#7c3aed',
  accent: '#f59e0b',
  glow: 'rgba(124, 58, 237, 0.65)'
};

const metrics = [
  { label: 'Smart deployments', value: '640+' },
  { label: 'Average ROI', value: '3.4x' },
  { label: 'Downtime reduction', value: '67%' }
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.45 }
      );

      gsap.utils.toArray<HTMLElement>('.hero-metric').forEach((metric, index) => {
        gsap.fromTo(
          metric,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.6 + index * 0.12
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative overflow-hidden pt-36 pb-20 sm:pb-28 lg:pb-32">
      <HeroParticles />
      <div className="absolute inset-0 bg-gradient-to-b from-slate/60 via-transparent to-slate/40" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 sm:px-10 lg:flex-row lg:px-16">
        <div className="flex-1 space-y-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Deploying intelligent vending ecosystems worldwide
          </div>
          <div className="space-y-8">
            <h1 ref={headlineRef} className="section-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              Smart vending that anticipates every moment, curated for modern environments.
            </h1>
            <p className="max-w-2xl text-lg text-white/70 lg:text-xl">
              Epic Amenities engineers experiential vending platforms that elevate hospitality, workplace wellbeing, and
              mobility through adaptive merchandising, edge intelligence, and concierge-grade service.
            </p>
          </div>
          <div ref={ctaRef} className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-8 py-3 text-base font-semibold text-white shadow-glow transition hover:shadow-glow/60"
              data-cursor="interactive"
            >
              Explore our ecosystem
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-base font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Request a strategy session
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="hero-metric rounded-3xl border border-white/10 bg-white/5 px-6 py-5 shadow-glass"
              >
                <p className="text-3xl font-display text-white">{metric.value}</p>
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex-1">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40 blur-3xl md:-left-16 lg:h-[420px] lg:w-[420px]" />
          <div className="gradient-border relative h-[540px] rounded-[28px] p-[1px] sm:h-[620px] lg:h-[660px]">
            <div className="relative h-full rounded-[26px] bg-slate/80 backdrop-blur-md">
              <div className="absolute left-1/2 top-6 h-1 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-white/10 via-white/40 to-white/10" />
              <VendingMachineCanvas palette={heroPalette} className="h-full w-full" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="font-semibold uppercase tracking-[0.3em]">AI uptime</span>
                  <span>99.98% real-time monitoring</span>
                </div>
                <div className="mt-3 h-1 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 right-6 w-44 rounded-3xl border border-white/10 bg-white/5 p-4 text-xs text-white/70 shadow-glass backdrop-blur">
            <p className="uppercase tracking-[0.3em] text-accent">Live KPI feed</p>
            <p className="mt-2 text-sm font-semibold text-white">Avg. dwell time: 3m 12s</p>
            <p className="mt-1 text-xs text-white/60">+18% vs. last 30 days</p>
          </div>
        </div>
      </div>
    </section>
  );
}
