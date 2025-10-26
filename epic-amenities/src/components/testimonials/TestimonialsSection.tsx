'use client';

import { testimonials } from '@/data/testimonials';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { StarIcon } from '@heroicons/react/24/solid';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = rating >= index + 1 || rating > index && rating < index + 1;
        const partial = rating > index && rating < index + 1;
        return (
          <span key={index} className="relative h-5 w-5">
            <StarIcon className={`h-5 w-5 ${filled ? 'text-accent' : 'text-white/20'}`} />
            {partial && (
              <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${(rating - index) * 100}%` }}
              >
                <StarIcon className="h-5 w-5 text-accent" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector('.testimonials-heading');
      if (!heading) return;

      gsap.fromTo(
        heading,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
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
    <section id="testimonials" ref={sectionRef} className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate/40 via-transparent to-slate/80" />
      <div className="absolute right-10 top-10 h-64 w-64 rounded-full bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/15 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="testimonials-heading mb-16 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">What partners experience</p>
          <h2 className="section-heading mt-6">Six industries. Six proofs of impact.</h2>
          <p className="mt-4 text-lg text-white/70">
            Measurable outcomes from Epic Amenities deployments powering corporate HQs, hospitality brands, mobility
            hubs, and world-class healthcare networks.
          </p>
        </div>
        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 1.2 },
            1024: { slidesPerView: 1.6 }
          }}
          className="smart-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <article className="relative flex h-full flex-col gap-6 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-glass sm:p-8">
                <div className="absolute -right-16 top-0 h-36 w-36 rounded-full bg-gradient-to-br from-primary/25 via-secondary/15 to-accent/25 blur-3xl" />
                <div className="relative flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{testimonial.industry}</p>
                    <h3 className="mt-2 text-2xl font-display text-white">{testimonial.company}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/40">{testimonial.duration}</p>
                  </div>
                  <StarRating rating={testimonial.rating} />
                </div>
                <p className="relative text-base text-white/70 lg:text-lg">“{testimonial.quote}”</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {testimonial.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-center text-sm text-white/70"
                    >
                      <p className="text-xl font-display text-white">{metric.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/40">{metric.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white/60">{testimonial.summary}</p>
                <div className="relative flex items-center gap-4">
                  <Image
                    src={testimonial.author.headshot}
                    alt={testimonial.author.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full border border-white/20 object-cover"
                  />
                  <div>
                    <p className="text-base font-semibold text-white">{testimonial.author.name}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50">{testimonial.author.title}</p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
