import { CONTACT_INFO, CONTACT_META } from '@/constants/contact';
import { ArrowUpRight } from 'lucide-react';
import BackgroundGrid from '../common/background-grid';

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-between px-6 py-10 md:px-12 md:py-16 relative overflow-hidden"
    >
      <BackgroundGrid />
      {/* Top meta bar */}
      <header className="flex justify-between items-start w-full relative z-10">
        <span className="text-xs text-neutral-500 uppercase tracking-[0.25em]">
          {CONTACT_META.sectionNumber}
        </span>

        <span className="text-xs text-emerald-400 uppercase tracking-[0.25em] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {CONTACT_META.availabilityStatus}
        </span>
      </header>

      {/* Main CTA */}
      <div className="flex flex-col items-center justify-center flex-1 w-full relative z-10">
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="group relative inline-block"
        >
          <h2 className="text-[12vw] md:text-[7vw] font-black tracking-tight uppercase leading-[0.8] text-center text-white">
            {CONTACT_META.ctaTitle.line1}
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] group-hover:text-white group-hover:[-webkit-text-stroke:0px] transition-all duration-300">
              {CONTACT_META.ctaTitle.line2}
            </span>
          </h2>

          <ArrowUpRight className="w-7 h-7 md:w-10 md:h-10 absolute -top-4 -right-4 md:-top-8 md:-right-10 text-white/70 group-hover:text-white group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
        </a>
      </div>

      {/* Bottom meta */}
      <footer className="w-full relative z-10 flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] md:text-xs text-neutral-500 font-mono tracking-[0.2em] uppercase">
            {CONTACT_INFO.location.city}, {CONTACT_INFO.location.country}
          </p>
          <p className="text-[10px] md:text-xs text-neutral-600 font-mono">
            {CONTACT_INFO.location.coordinates.latitude},{' '}
            {CONTACT_INFO.location.coordinates.longitude}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] md:text-xs text-neutral-500 font-mono tracking-[0.2em] uppercase">
            © {CONTACT_INFO.copyright.year} {CONTACT_INFO.copyright.name}
          </p>
          <p className="text-[10px] md:text-xs text-neutral-600 font-mono mt-0.5">
            All rights reserved
          </p>
        </div>
      </footer>
    </section>
  );
}
