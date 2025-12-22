import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="flex justify-between items-start w-full">
        <span className="text-xs text-gray-500 uppercase tracking-widest">
          03 / Contact
        </span>
        <span className="text-xs text-green-500 uppercase tracking-widest animate-pulse">
          ● Available for Contracts
        </span>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 my-24">
        <a href="mailto:your_email@example.com" className="group relative">
          <h2 className="text-[8vw] md:text-[6vw] font-bold tracking-tighter uppercase leading-none hover:text-transparent hover:stroke-white transition-all duration-300">
            Initiate <br />
            <span className="italic font-serif group-hover:not-italic group-hover:font-sans transition-all duration-300">
              Collaboration
            </span>
          </h2>
          <ArrowUpRight className="w-12 h-12 md:w-24 md:h-24 absolute -top-8 -right-8 md:-top-12 md:-right-16 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-4 group-hover:-translate-y-4" />
        </a>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-4 border-t border-white/10 pt-12 gap-8">
        <div>
          <span className="text-xs text-[#666] block mb-2">Socials</span>
          <div className="flex flex-col gap-2 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">
              GITHUB / KAITOU
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              TWITTER / X
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              LINKEDIN
            </a>
          </div>
        </div>
        <div>
          <span className="text-xs text-[#666] block mb-2">Location</span>
          <p className="text-sm">Ho Chi Minh City, Vietnam</p>
          <p className="text-sm">10.8231° N / 106.6297° E</p>
        </div>
        <div className="md:col-span-2 text-right flex flex-col justify-end">
          <p className="text-[10vw] md:text-[4vw] font-bold leading-none opacity-10 uppercase">
            Kaitou
          </p>
        </div>
      </div>
    </section>
  );
}
