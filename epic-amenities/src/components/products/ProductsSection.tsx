'use client';

import { useMemo, useState } from 'react';
import { products, productCategories, Product, ProductCategory } from '@/data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

type CategoryFilter = ProductCategory | 'all';

const CTA_COPY = [
  { label: 'Smart restocking & predictive insights', id: 'predictive' },
  { label: 'Premium merchandising & digital storytelling', id: 'merchandising' },
  { label: 'ESG reporting & closed loop packaging', id: 'sustainability' }
];

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="products" className="section-padding relative">
      <div className="absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-slate/70 via-slate/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Product ecosystem</p>
            <h2 className="section-heading">Curated amenities tuned for every environment you steward.</h2>
            <p className="text-lg text-white/70">
              Select from our suite of adaptive vending experiences—each engineered to reflect your brand, drive revenue,
              and delight end users with precision personalization.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
            {CTA_COPY.map((item) => (
              <span key={item.id} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={clsx(
              'rounded-full px-4 py-2 text-sm font-medium transition',
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-glow'
                : 'border border-white/10 bg-white/5 text-white/60 hover:text-white'
            )}
          >
            All experiences
          </button>
          {productCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={clsx(
                'rounded-full px-4 py-2 text-sm font-medium transition',
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-glow'
                  : 'border border-white/10 bg-white/5 text-white/60 hover:text-white'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="hidden gap-8 lg:grid lg:grid-cols-1">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onInspect={setSelectedProduct} />
          ))}
        </div>

        <div className="lg:hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={24}
            slidesPerView={1.05}
            centeredSlides
            pagination={{ clickable: true }}
            className="smart-swiper"
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} onInspect={setSelectedProduct} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
