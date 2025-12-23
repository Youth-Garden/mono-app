'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textWrapperRef = useRef(null);
  const imageRevealRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Initial Reveal
      tl.to(imageRevealRef.current, {
        height: '100%',
        duration: 1.5,
        ease: 'power3.inOut',
      })
        .from(
          imageRef.current,
          {
            scale: 1.5,
            duration: 1.5,
            ease: 'power3.inOut',
          },
          0
        )
        .from(
          '.hero-text', // Selects lines by class
          {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          '.hero-meta', // Selects small details
          {
            opacity: 0,
            duration: 1,
          },
          '-=0.8'
        );

      // 2. Scroll Parallax (The "Architect" precision feel)
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text moves slightly faster/slower than image for depth
      gsap.to(textWrapperRef.current, {
        yPercent: -10,
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
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full bg-[#050505] text-white overflow-hidden flex flex-col justify-between pt-8 pb-8 px-6 md:px-12"
    >
      {/* Background: Subtle Architectural Grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Top Bar: Technical/Data Look */}
      <header className="relative z-20 flex justify-between items-start hero-meta">
        <div className="flex flex-col">
          <h2 className="text-sm font-bold tracking-tight uppercase">
            Kai Tou
          </h2>
          <span className="text-[10px] text-gray-400 tracking-widest uppercase mt-1">
            Full Stack / Web3
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-mono text-gray-400 tracking-widest uppercase">
          <span>Lat: 10.8231° N</span>
          <span>Lng: 106.6297° E</span>
          <span>EST. 2024</span>
        </div>
        {/* Placeholder for Menu alignment if needed, but the global Navbar handles the button */}
        <div className="w-12 h-4 hidden md:block" />
      </header>
      <div className="relative z-10 flex-1 flex items-center justify-center w-full">
        {/* Central Image Mask */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="relative w-[300px] md:w-[400px] h-[400px] md:h-[500px] overflow-hidden">
            {/* The "Curtain" that reveals the image */}
            <div
              ref={imageRevealRef}
              className="w-full h-0 absolute bottom-0 left-0 right-0 overflow-hidden"
            >
              <div
                ref={imageRef}
                className="w-full h-full bg-cover bg-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700 ease-out"
                style={{ backgroundImage: 'url(/me.jpg)' }}
              />
              {/* Inner Border/Crosshair for technical feel */}
              <div className="absolute inset-0 border border-white/10 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/40" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/40" />
            </div>
          </div>
        </div>

        {/* Big Typography Layer (Mix Blend Mode is key here) */}
        <div
          ref={textWrapperRef}
          className="relative z-10 w-full mix-blend-difference pointer-events-none text-center"
        >
          <h1 className="flex flex-col items-center justify-center">
            <span className="hero-text block text-[12vw] md:text-[11vw] leading-[0.85] font-bold tracking-tighter text-white">
              WE ARE
            </span>
            <span className="hero-text block text-[12vw] md:text-[11vw] leading-[0.85] font-bold tracking-tighter text-white/90 italic font-serif">
              ARCHITECTS
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom Bar */}
      <footer className="relative z-20 flex justify-between items-end hero-meta">
        <div className="max-w-md hidden md:block">
          <p className="text-xs text-gray-400 leading-relaxed font-mono">
            Building immutable ledgers and pixel-perfect interfaces. Focusing on
            performance, decentralization, and precision.
          </p>
        </div>

        <button className="group flex items-center gap-4 cursor-pointer">
          <div className="text-right">
            <span className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 group-hover:text-white transition-colors">
              Start the Journey
            </span>
            <span className="block text-sm font-medium tracking-tight group-hover:underline decoration-white/30 underline-offset-4">
              Scroll Down
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
            <ArrowDownRight size={16} />
          </div>
        </button>
      </footer>
    </section>
  );
}
