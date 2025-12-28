'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createContext, ReactNode, useContext, useRef, useState } from 'react';

const SplashContext = createContext<{ isLoading: boolean }>({
  isLoading: true,
});

export const useSplash = () => useContext(SplashContext);

export default function SplashProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          // Force recalculation of ScrollTriggers after splash is gone/hidden
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);
        },
      });

      // Initial States
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left' });
      gsap.set(counterRef.current, { opacity: 0, y: 20 });

      // 1. Loading Animation
      tl.to(counterRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .to(
          progressRef.current,
          {
            scaleX: 1,
            duration: 2.0,
            ease: 'expo.inOut',
          },
          '<'
        )
        // Counter Number Update
        .to(
          {},
          {
            duration: 2.0,
            onUpdate: function () {
              if (counterRef.current) {
                const progress = Math.round(this.progress() * 100);
                counterRef.current.innerText = `${String(progress).padStart(3, '0')}%`;
              }
            },
          },
          '<'
        )

        // 2. Short Pause
        .to({}, { duration: 0.2 })

        // 3. Exit Sequence
        .to([counterRef.current, progressRef.current], {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
        })
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 1.0,
            ease: 'power4.inOut',
          },
          '-=0.2'
        );
    },
    { scope: containerRef }
  );

  return (
    <SplashContext.Provider value={{ isLoading }}>
      <div
        ref={containerRef}
        className="fixed inset-0 z-9999 bg-black flex flex-col items-center justify-center select-none overflow-hidden"
        style={{ display: isLoading ? 'flex' : 'none' }}
      >
        {/* Bottom Progress Bar & Counter */}
        <div className="absolute bottom-0 left-0 w-full">
          {/* Large Counter Number */}
          <div
            ref={counterRef}
            className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-8xl md:text-[12rem] font-black text-white/90 leading-none tracking-tighter mix-blend-exclusion opacity-0 translate-y-5"
          >
            000%
          </div>

          {/* Full Width Bar */}
          <div className="w-full h-1.5 bg-white/5 relative overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-0 bg-white w-full h-full origin-left shadow-[0_0_20px_white] scale-x-0"
            />
          </div>
        </div>
      </div>

      {children}
    </SplashContext.Provider>
  );
}
