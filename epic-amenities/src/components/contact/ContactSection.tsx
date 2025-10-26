'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import { useLenisInstance } from '@/components/layout/LenisProvider';

type ContactForm = {
  name: string;
  company: string;
  email: string;
  industry: string;
  timeline: string;
  budget: string;
  message: string;
};

const industries = [
  'Corporate office',
  'Hospitality',
  'Healthcare',
  'Education',
  'Fitness & wellness',
  'Transportation hub',
  'Other'
];

export default function ContactSection() {
  const { lenis } = useLenisInstance();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactForm>({
    mode: 'onBlur'
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
      reset();
      gsap.fromTo(
        '.contact-alert',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
      lenis?.scrollTo('#contact', { offset: -80, duration: 0.8 });
    } catch (error) {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate/80 via-slate/60 to-slate/90" />
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/25 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Start the conversation</p>
          <h2 className="section-heading mt-6">
            Let’s design an amenity program that feels future-ready from day one.
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Share a bit about your environment and goals—our strategists will schedule a discovery session within 24
            hours.
          </p>
        </div>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-6 text-sm text-white/70">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glass">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Global concierge</p>
              <p className="mt-3 text-lg text-white">Strategists on call across New York, London, and Singapore.</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/50">
                Response SLA: <span className="text-white">under 4 hours</span>
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Partnership Model</p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
                  <span>Co-design workshops mapping guest journeys and merchandising opportunities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
                  <span>On-site activation team + 24/7 command center with predictive alerts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
                  <span>Quarterly strategy reviews benchmarking revenue, experience, and ESG metrics.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Contact</p>
              <p className="mt-3 text-sm text-white">hello@epicamenities.com</p>
              <p className="text-sm text-white/60">+1 (646) 684-2200</p>
            </div>
          </aside>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 rounded-[32px] border border-white/15 bg-black/40 p-6 shadow-glass sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Name
                </label>
                <input
                  id="name"
                  {...register('name', { required: 'Please enter your name.' })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent/80"
                  placeholder="Jordan Lee"
                />
                {errors.name && <p className="mt-1 text-xs text-accent">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="company" className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Company
                </label>
                <input
                  id="company"
                  {...register('company', { required: 'Please tell us your organization.' })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent/80"
                  placeholder="Epic Collective HQ"
                />
                {errors.company && <p className="mt-1 text-xs text-accent">{errors.company.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'We use your email to coordinate next steps.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please provide a valid email address.'
                    }
                  })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent/80"
                  placeholder="you@company.com"
                />
                {errors.email && <p className="mt-1 text-xs text-accent">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="industry" className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Industry
                </label>
                <select
                  id="industry"
                  {...register('industry', { required: 'Select the industry closest to your environment.' })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent/80"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-slate text-white">
                    Choose industry
                  </option>
                  {industries.map((option) => (
                    <option key={option} value={option} className="bg-slate text-white">
                      {option}
                    </option>
                  ))}
                </select>
                {errors.industry && <p className="mt-1 text-xs text-accent">{errors.industry.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="timeline" className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Target go-live
                </label>
                <select
                  id="timeline"
                  {...register('timeline', { required: 'Tell us when you want to launch.' })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent/80"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-slate text-white">
                    Select timeline
                  </option>
                  <option value="30-60 days">30-60 days</option>
                  <option value="60-90 days">60-90 days</option>
                  <option value="90+ days">90+ days</option>
                </select>
                {errors.timeline && <p className="mt-1 text-xs text-accent">{errors.timeline.message}</p>}
              </div>
              <div>
                <label htmlFor="budget" className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Annual program scope
                </label>
                <select
                  id="budget"
                  {...register('budget', { required: 'An estimated budget helps us prepare relevant options.' })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent/80"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-slate text-white">
                    Select estimate
                  </option>
                  <option value="$50k - $150k">$50k - $150k</option>
                  <option value="$150k - $500k">$150k - $500k</option>
                  <option value="$500k+">$500k+</option>
                </select>
                {errors.budget && <p className="mt-1 text-xs text-accent">{errors.budget.message}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="text-xs uppercase tracking-[0.3em] text-white/50">
                What are you hoping to solve?
              </label>
              <textarea
                id="message"
                rows={5}
                {...register('message', { required: 'Share a few details so we can personalize the session.' })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent/80"
                placeholder="Tell us about your environment, number of locations, and guest expectations."
              />
              {errors.message && <p className="mt-1 text-xs text-accent">{errors.message.message}</p>}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-8 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-glow/60 disabled:cursor-not-allowed disabled:opacity-70"
                data-cursor="interactive"
              >
                {isSubmitting ? 'Preparing intake...' : 'Schedule discovery call'}
              </button>
              <p className="text-xs text-white/50">
                By clicking submit you agree to Epic Amenities&apos; privacy and data stewardship promise.
              </p>
            </div>
            {status === 'success' && (
              <div
                role="status"
                className="contact-alert mt-3 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200"
              >
                We received your request. An Epic Amenities strategist will reach out within 24 hours.
              </div>
            )}
            {status === 'error' && (
              <div
                role="alert"
                className="contact-alert mt-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                Something went wrong. Please refresh the page and try again—or email hello@epicamenities.com.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
