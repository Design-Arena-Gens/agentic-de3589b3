import dynamic from 'next/dynamic';
import FeaturesSection from '@/components/features/FeaturesSection';
import ProductsSection from '@/components/products/ProductsSection';
import SolutionsSection from '@/components/solutions/SolutionsSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import AboutSection from '@/components/about/AboutSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/layout/Footer';

const HeroSection = dynamic(() => import('@/components/hero/HeroSection'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <SolutionsSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}
