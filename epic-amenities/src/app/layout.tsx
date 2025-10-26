import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import 'swiper/css';
import '@/styles/swiper.css';
import './globals.css';
import Providers from '@/components/layout/Providers';
import Navigation from '@/components/layout/Navigation';

const sans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap'
});

const display = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Epic Amenities | Intelligent Vending for Modern Environments',
  description:
    'Epic Amenities delivers smart, data-driven vending experiences for forward-thinking workplaces, hospitality brands, campuses, and wellness destinations.',
  keywords: [
    'smart vending',
    'epic amenities',
    'connected vending machines',
    'office amenities',
    'IoT vending',
    'modern workplace'
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="relative min-h-screen bg-slate text-white">
        <a
          href="#hero"
          className="skip-to-content absolute left-4 top-4 z-[1001] -translate-y-20 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate transition-all focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <div className="noise-overlay" aria-hidden="true" />
          <Navigation />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
