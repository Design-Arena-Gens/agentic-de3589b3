'use client';

import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

const VendingMachineCanvas = dynamic(
  () => import('../three/VendingMachineModel').then((mod) => mod.VendingMachineCanvas),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

const palette = {
  primary: '#2563eb',
  secondary: '#7c3aed',
  accent: '#f59e0b',
  glow: 'rgba(37, 99, 235, 0.7)'
};

const milestones = [
  { year: '2018', detail: 'Launched Epic Amenities with 12 pilot deployments in premium offices.' },
  { year: '2020', detail: 'Introduced AI planogram orchestration and edge diagnostics across the fleet.' },
  { year: '2022', detail: 'Expanded to hospitality and transit, unlocking 24/7 experiential retail revenue.' },
  { year: '2024', detail: 'Certified carbon-neutral operations, scaling to 14 global markets.' }
];

const stats = [
  { label: 'Global markets', value: '14', caption: 'Active in North America, EMEA, APAC' },
  { label: 'Uptime guarantee', value: '99.98%', caption: 'Edge intelligence + predictive service' },
  { label: 'Sustainability credits delivered', value: '41k', caption: 'Earned via circular packaging loops' }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const stats = gsap.utils.toArray<HTMLElement>('.about-stat');
      gsap.fromTo(
        stats,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate/50 to-slate/80" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-gradient-to-br from-primary/25 via-secondary/25 to-accent/20 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">About epic amenities</p>
            <h2 className="section-heading">
              Engineering the world&apos;s most advanced amenity ecosystems for modern businesses.
            </h2>
            <p className="text-lg text-white/70">
              We started as workplace futurists designing hospitality-grade amenities for elite headquarters. Today our
              technology choreographs intelligent vending fleets across luxury hotels, healthcare networks, transit hubs,
              and campuses—empowering operators with the data, agility, and wow-factor that tomorrow requires.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="about-stat rounded-3xl border border-white/10 bg-white/5 px-5 py-6 text-center shadow-glass"
                >
                  <p className="text-3xl font-display text-white">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
                  <p className="mt-2 text-xs text-white/50">{stat.caption}</p>
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Milestones</p>
              <ul className="mt-4 space-y-4 text-sm text-white/70">
                {milestones.map((milestone) => (
                  <li key={milestone.year} className="flex items-start gap-4">
                    <div className="relative mt-1.5 h-3 w-3">
                      <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{milestone.year}</p>
                      <p className="mt-1 text-sm text-white/70">{milestone.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative flex h-[480px] items-center justify-center rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-glass">
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/10 via-transparent to-white/10" />
            <VendingMachineCanvas
              palette={palette}
              animate
              showStand
              cameraPosition={[3.2, 2.4, 4.1]}
              className="h-full w-full"
            />
            <div className="absolute bottom-6 left-1/2 flex w-[80%] -translate-x-1/2 flex-col gap-2 rounded-3xl border border-white/10 bg-black/40 px-5 py-4 text-xs text-white/60 backdrop-blur">
              <div className="flex justify-between">
                <span className="uppercase tracking-[0.3em]">Telemetry snapshot</span>
                <span>Live</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px] uppercase tracking-[0.15em]">
                <span>Temperature · 36°F</span>
                <span>Stock health · 98%</span>
                <span>Energy load · -23%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
