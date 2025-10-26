'use client';

import { features } from '@/data/features';
import {
  BoltIcon,
  ChartBarIcon,
  CpuChipIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  CpuChipIcon,
  BoltIcon,
  ChartBarIcon,
  GlobeAltIcon
};

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.feature-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%'
            },
            delay: index * 0.1
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="section-padding relative">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate/60 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Smart technology</p>
          <h2 className="section-heading mt-6">
            Every Epic Amenities deployment is powered by an adaptive intelligence stack.
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Blend IoT telemetry, AI personalization, and sustainability instrumentation inside a unified platform built
            for enterprise-grade reliability.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <article
                key={feature.title}
                className="feature-card relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-glass"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/30">
                    <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/50">{feature.metrics}</p>
                  </div>
                </div>
                <p className="mt-6 text-base text-white/70">{feature.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-white/60">
                  {feature.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary via-secondary to-accent" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
