'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Entrance Animation
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
      }).from(
        infoRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 1,
          stagger: 0.1,
        },
        '-=1'
      );

      // 2. Scroll Parallax
      gsap.to(titleRef.current, {
        yPercent: 30, // Parallax effect
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-between pt-32 pb-12 border-b border-white/10 uppercase"
    >
      {/* Top Bar Info */}
      <div
        ref={infoRef}
        className="w-full px-6 md:px-12 flex justify-between items-start font-mono text-xs tracking-widest text-[#888]"
      >
        <div className="flex flex-col gap-1">
          <span>[ SYSTEM ONLINE ]</span>
          <span>LOC: HO CHI MINH CITY</span>
          <span>LAT: 10.8231° N / LONG: 106.6297° E</span>
        </div>
        <div className="text-right">
          <span>FULL STACK ARCHITECTURE</span>
          <br />
          <span>EST. 2024</span>
        </div>
      </div>

      {/* Main Title Area */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 z-10">
        <h1
          ref={titleRef}
          className="text-[13vw] leading-[0.85] font-bold tracking-tighter mix-blend-exclusion text-white"
        >
          DIGITAL <br />
          <span className="text-white/40">VELOCITY</span>
        </h1>
      </div>

      {/* Bottom Info */}
      <div className="px-6 md:px-12 flex justify-between items-end border-t border-white/10 pt-6 mx-6 md:mx-12">
        <div className="max-w-md">
          <p className="text-sm md:text-base text-[#888] font-normal normal-case leading-relaxed">
            I build systems that live on the edge of performance and
            decentralization. Full Stack Developer based in Vietnam.
          </p>
        </div>
        <ArrowDownRight className="w-6 h-6 text-white animate-bounce" />
      </div>
    </section>
  );
}
