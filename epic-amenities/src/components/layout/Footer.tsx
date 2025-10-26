export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-white/60 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
        <div>
          <p className="text-base font-semibold text-white">Epic Amenities</p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/40">Intelligent vending, human moments</p>
        </div>
        <div className="flex flex-col items-start gap-3 text-xs uppercase tracking-[0.3em] sm:flex-row sm:items-center sm:gap-6">
          <a href="#features" className="transition hover:text-white">
            Technology
          </a>
          <a href="#products" className="transition hover:text-white">
            Experiences
          </a>
          <a href="#solutions" className="transition hover:text-white">
            Industries
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </div>
        <p className="text-xs text-white/40">© {new Date().getFullYear()} Epic Amenities. All rights reserved.</p>
      </div>
    </footer>
  );
}
