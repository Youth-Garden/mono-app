'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Square } from 'lucide-react'; // Added for geometric accent
import { useMemo, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const PHRASE =
  'Code is not just syntax; it is architecture. I believe in pixel-perfection, type-safety, and scalable systems. Whether optimizing React render cycles or architecting robust APIs, the goal remains the same: Absolute Precision.';

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Split text logic
  const splitText = useMemo(() => {
    return PHRASE.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block mr-[0.3em]">
        {word.split('').map((char, charIndex) => (
          <span
            key={charIndex}
            className="char inline-block opacity-10 will-change-opacity" // Start dimmer for contrast
          >
            {char}
          </span>
        ))}
      </span>
    ));
  }, []);

  useGSAP(
    () => {
      const chars = textRef.current?.querySelectorAll('.char');

      if (chars) {
        // 1. Text Scrubbing Animation
        gsap.to(chars, {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 0.5,
          },
        });
      }

      // 2. Line Expansion Animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-[#050505] py-32 px-6 md:px-12 snap-start overflow-hidden"
    >
      {/* --- BACKGROUND TEXTURE (Matches Menu) --- */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        {/* Grid Pattern */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            opacity: 0.3,
          }}
        />
        {/* Noise Overlay */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        {/* --- LEFT COLUMN: Editorial Label --- */}
        <div className="md:w-1/4 flex flex-col items-start pt-2">
          <div className="flex items-center gap-3 mb-4">
            {/* Geometric Anchor */}
            <Square size={8} fill="currentColor" className="text-white/40" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-[0.2em]">
              Philosophy
            </span>
          </div>

          <div className="h-px w-8 bg-white/20 mb-4" />

          <p className="text-[10px] text-gray-500 font-mono leading-relaxed max-w-[200px] hidden md:block uppercase tracking-widest">
            Engineering standards <br /> through rigor & clarity.
          </p>
        </div>

        {/* --- RIGHT COLUMN: Main Content --- */}
        <div className="md:w-3/4">
          {/* Decorative Top Line */}
          <div ref={lineRef} className="w-full h-[1px] bg-white/20 mb-12" />

          {/* Accessibility Text */}
          <span className="sr-only">{PHRASE}</span>

          {/* Visual Text */}
          <p
            ref={textRef}
            aria-hidden="true"
            className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-medium font-sans tracking-tight text-white select-none"
          >
            {splitText}
          </p>
        </div>
      </div>
    </section>
  );
}
