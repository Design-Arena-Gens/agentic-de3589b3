'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef } from 'react';
import { Product } from '@/data/products';
import { XMarkIcon } from '@heroicons/react/24/solid';

const VendingMachineCanvas = dynamic(
  () => import('../three/VendingMachineModel').then((mod) => mod.VendingMachineCanvas),
  { ssr: false }
);

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeOnEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!product) return;
    document.addEventListener('keydown', closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>('button, a');
    firstFocusable?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [product, closeOnEscape]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-8 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`product-${product.id}`}
    >
      <div
        ref={dialogRef}
        className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-white/15 bg-slate/95 shadow-glass outline-none"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/70 transition hover:text-white"
          aria-label="Close details"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">{product.category}</p>
              <h3 id={`product-${product.id}`} className="mt-3 text-3xl font-display text-white">
                {product.name}
              </h3>
              <p className="mt-4 text-base text-white/70">{product.description}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Signature outcome</p>
              <p className="mt-2 text-base text-white">{product.headlineMetric}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Programs & highlights</h4>
              <ul className="mt-3 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                {product.highlights.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Optimized for</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/60"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Launch year {product.launchYear} · Epic Amenities Intelligent Platform™
            </p>
          </div>
          <div className="relative h-[320px] w-full rounded-[26px] border border-white/10 bg-white/5 p-4 shadow-inner sm:h-[380px] lg:h-[460px]">
            <div className="absolute inset-0 rounded-[22px] bg-gradient-to-br from-white/10 via-transparent to-white/10" />
            <VendingMachineCanvas
              palette={product.palette}
              animate={false}
              showStand
              className="h-full w-full"
              cameraPosition={[3.6, 2.8, 4.5]}
            />
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60 backdrop-blur">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
                rotate
              </span>
              <span>scroll / drag</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
