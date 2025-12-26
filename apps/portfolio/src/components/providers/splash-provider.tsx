'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { createContext, ReactNode, useContext, useRef, useState } from 'react';

const SplashContext = createContext<{ isLoading: boolean }>({
  isLoading: true,
});

export const useSplash = () => useContext(SplashContext);

export default function SplashProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => setIsLoading(false),
      });

      // Initial state
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left' });
      gsap.set(brandRef.current, { y: 20, opacity: 0 });

      // 1. Loading Sequence
      tl.to(
        {},
        {
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: function () {
            if (counterRef.current) {
              const progress = Math.round(this.progress() * 100);
              counterRef.current.innerText = `${String(progress).padStart(3, '0')}%`;
            }
          },
        }
      )
        .to(
          progressRef.current,
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.inOut',
          },
          '<'
        )
        // Reveal Brand Name "KAITOU" midway
        .to(
          brandRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=1.0'
        )
        // 2. Short pause
        .to({}, { duration: 0.4 })
        // 3. Fade out content
        .to([counterRef.current, progressRef.current, brandRef.current], {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        })
        // 4. Shutter Exit
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.0,
          ease: 'expo.inOut',
        });
    },
    { scope: containerRef }
  );

  return (
    <SplashContext.Provider value={{ isLoading }}>
      <div
        ref={containerRef}
        className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none"
        style={{ display: isLoading ? 'flex' : 'none' }}
      >
        <div className="flex flex-col items-center gap-6 relative">
          {/* Percentage Counter - Technical/Mono */}
          <div
            ref={counterRef}
            className="font-mono text-xs md:text-sm text-white/50 tracking-widest absolute -top-12"
          >
            000%
          </div>

          {/* Progress Line */}
          <div className="w-48 h-px bg-white/10 relative overflow-hidden mb-2">
            <div
              ref={progressRef}
              className="absolute inset-0 bg-white/80 w-full h-full origin-left"
            />
          </div>

          {/* Brand Name - Clean, Professional, Bold */}
          <div
            ref={brandRef}
            className="text-4xl md:text-6xl font-bold text-white tracking-[0.2em] font-sans uppercase"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}
          >
            Kaitou
          </div>
        </div>
      </div>

      {children}
    </SplashContext.Provider>
  );
}
