import { CONTACT_INFO, CONTACT_META } from '@/constants/contact';
import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-between p-6 md:p-12 relative overflow-hidden"
    >
      {/* <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div> */}

      <div className="flex justify-between items-start w-full relative z-10">
        <span className="text-xs text-gray-500 uppercase tracking-widest">
          {CONTACT_META.sectionNumber}
        </span>
        <span className="text-xs text-green-500 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          {CONTACT_META.availabilityStatus}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 w-full relative z-10">
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="group relative inline-block cursor-none"
        >
          <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
          <h2 className="text-[10vw] md:text-[8vw] font-black tracking-tighter uppercase leading-[0.8] text-center text-white mix-blend-difference hover:opacity-80 transition-opacity duration-300">
            {CONTACT_META.ctaTitle.line1}
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] group-hover:text-white group-hover:[-webkit-text-stroke:0px] transition-all duration-300">
              {CONTACT_META.ctaTitle.line2}
            </span>
          </h2>
          <ArrowUpRight className="w-8 h-8 md:w-16 md:h-16 absolute top-0 right-0 md:-top-8 md:-right-12 text-white opacity-50 group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300" />
        </a>
      </div>

      <div className="w-full relative z-10 flex justify-between items-end border-t border-white/10 pt-6">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] md:text-xs text-neutral-500 font-mono tracking-wider uppercase">
            {CONTACT_INFO.location.city}, {CONTACT_INFO.location.country}
          </p>
          <p className="text-[10px] md:text-xs text-neutral-600 font-mono">
            {CONTACT_INFO.location.coordinates.latitude},{' '}
            {CONTACT_INFO.location.coordinates.longitude}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] md:text-xs text-neutral-500 font-mono tracking-wider uppercase">
            © {CONTACT_INFO.copyright.year} {CONTACT_INFO.copyright.name}
          </p>
          <p className="text-[10px] md:text-xs text-neutral-600 font-mono mt-0.5">
            All Rights Reserved
          </p>
        </div>
      </div>
    </section>
  );
}
