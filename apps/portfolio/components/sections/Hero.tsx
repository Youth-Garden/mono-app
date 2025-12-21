'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Entrance Animation
    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .from(infoRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, "-=0.6");

    // 2. Scroll Parallax
    gsap.to(titleRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col border-b border-white/10 pt-32">
      
      {/* Top Bar Info (Grid Layout) */}
      <div ref={infoRef} className="grid grid-cols-1 md:grid-cols-3 w-full border-b border-white/10">
        <div className="p-6 border-r border-white/10">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Available For Work</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">Remote / Freelance</span>
          </div>
        </div>
        <div className="p-6 border-r border-white/10 md:col-span-1 hidden md:block">
           <span className="text-xs text-gray-500 uppercase tracking-widest">Location</span>
           <p className="mt-2 text-sm">Ho Chi Minh City, VN</p>
        </div>
        <div className="p-6 flex justify-between items-center group cursor-pointer bg-white/0 hover:bg-white/5 transition-colors">
          <span className="text-sm">Scroll Down</span>
          <ArrowDownRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
        </div>
      </div>

      {/* Main Title Area */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 overflow-hidden">
        <h1 ref={titleRef} className="text-[12vw] leading-[0.8] font-bold tracking-tighter uppercase mix-blend-exclusion">
          KAITOU <br />
          <span className="text-transparent stroke-text hover:text-white transition-colors duration-500 cursor-default">
            Design
          </span>
        </h1>
      </div>
    </section>
  );
}
