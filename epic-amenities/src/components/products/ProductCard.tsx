'use client';

import dynamic from 'next/dynamic';
import { Product } from '@/data/products';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const VendingMachineCanvas = dynamic(
  () => import('../three/VendingMachineModel').then((mod) => mod.VendingMachineCanvas),
  { ssr: false }
);

type ProductCardProps = {
  product: Product;
  onInspect: (product: Product) => void;
};

export default function ProductCard({ product, onInspect }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-glass"
    >
      <div className="absolute inset-x-0 top-0 h-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="grid gap-6 p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
        <div className="space-y-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
              {product.category}
            </div>
            <h3 className="mt-4 text-2xl font-display text-white">{product.name}</h3>
            <p className="mt-3 text-sm text-white/70">{product.description}</p>
          </div>
          <p className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.3em] text-white/60">
            {product.headlineMetric}
          </p>
          <ul className="space-y-3 text-sm text-white/70">
            {product.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-primary via-secondary to-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {product.industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/50"
              >
                {industry}
              </span>
            ))}
          </div>
          <button
            onClick={() => onInspect(product)}
            className={clsx(
              'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition',
              'border border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:text-white focus-visible:outline-none'
            )}
            data-cursor="interactive"
          >
            Inspect in 3D
          </button>
        </div>
        <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate/60 via-slate/30 to-slate/60">
          <div className="absolute -left-24 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-white/10 via-white/0 to-transparent blur-3xl" />
          <VendingMachineCanvas
            palette={product.palette}
            className="h-full w-full"
            animate
            showStand={false}
            cameraPosition={[3, 2.2, 4]}
          />
        </div>
      </div>
    </motion.article>
  );
}
