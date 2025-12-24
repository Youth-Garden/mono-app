import { CONTACT_INFO, CONTACT_META, SOCIAL_LINKS } from '@/constants/contact';
import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-between p-6 md:p-12 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="flex justify-between items-start w-full relative z-10">
        <span className="text-xs text-gray-500 uppercase tracking-widest">
          {CONTACT_META.sectionNumber}
        </span>
        <span className="text-xs text-green-500 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          {CONTACT_META.availabilityStatus}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 my-24 relative z-10">
        <a href={`mailto:${CONTACT_INFO.email}`} className="group relative">
          <h2 className="text-[8vw] md:text-[6vw] font-bold tracking-tighter uppercase leading-none text-white group-hover:scale-[1.02] transition-all duration-500">
            {CONTACT_META.ctaTitle.line1} <br />
            <span className="italic font-serif group-hover:tracking-wider transition-all duration-500">
              {CONTACT_META.ctaTitle.line2}
            </span>
          </h2>
          <ArrowUpRight className="w-12 h-12 md:w-16 md:h-16 absolute -top-4 -right-4 md:-top-8 md:-right-12 text-white/40 group-hover:text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
        </a>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 border-t border-white/10 pt-12 gap-12 relative z-10">
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-widest block mb-6">
            {CONTACT_META.sections.connect}
          </span>
          <div className="flex flex-col gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.platform !== 'Email' ? '_blank' : undefined}
                rel={
                  link.platform !== 'Email' ? 'noopener noreferrer' : undefined
                }
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300 font-mono"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs text-gray-500 uppercase tracking-widest block mb-6">
            {CONTACT_META.sections.location}
          </span>
          <p className="text-sm text-gray-400 mb-2">
            {CONTACT_INFO.location.city}
          </p>
          <p className="text-sm text-gray-400">
            {CONTACT_INFO.location.country}
          </p>
          <p className="text-xs text-gray-600 font-mono mt-4">
            {CONTACT_INFO.location.coordinates.latitude},{' '}
            {CONTACT_INFO.location.coordinates.longitude}
          </p>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-widest block mb-6">
              {CONTACT_META.sections.status}
            </span>
            <p className="text-sm text-gray-400">
              {CONTACT_INFO.status.availability}
            </p>
            <p className="text-sm text-gray-400">{CONTACT_INFO.status.types}</p>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-xs text-gray-600">
              © {CONTACT_INFO.copyright.year} {CONTACT_INFO.copyright.name}
            </p>
            <p className="text-xs text-gray-700 mt-1">All Rights Reserved</p>
          </div>
        </div>
      </div>
    </section>
  );
}
