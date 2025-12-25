'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const SplashContext = createContext<{ isLoading: boolean }>({
  isLoading: true,
});

export const useSplash = () => useContext(SplashContext);

export default function SplashProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Trigger exit animation instead of ensuring immediate unmount
      if (containerRef.current) {
        const tl = gsap.timeline({
          onComplete: () => setIsLoading(false),
        });

        // Exit sequence
        tl.to(textRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        })
          .to(
            logoRef.current,
            {
              scale: 0.8,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
            },
            '<'
          )
          .to(
            containerRef.current,
            {
              yPercent: -100,
              duration: 0.8,
              ease: 'power4.inOut',
            },
            '-=0.2'
          );
      }
    }, 800); // 800ms loading time

    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      // Entrance / Presence animation (pulsing)
      if (isLoading && logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { scale: 0.9, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
          }
        );
      }
    },
    { scope: containerRef, dependencies: [isLoading] }
  );

  return (
    <SplashContext.Provider value={{ isLoading }}>
      {/* Splash Overlay */}
      {/* We keep it in DOM until isLoading sets to false (which happens after animation)
          Actually, state update unmounts it. Checking my exit logic.
          Ah, I set isLoading to false in onComplete. So the component re-renders.
          Depending on how I structure this:
          If I return ONLY container when loading, children won't mount/hydrate until done.
          Usually better to mount children but hide them or overlay them.
          Let's overlay them so children can initialize in background. */}

      <div
        ref={containerRef}
        className="fixed inset-0 z-9999 bg-black flex flex-col items-center justify-center select-none"
        style={{ display: isLoading ? 'flex' : 'none' }}
      >
        <div className="flex flex-col items-center">
          {/* Logo / Icon Area */}
          <div
            ref={logoRef}
            className="w-16 h-16 md:w-24 md:h-24 border-2 border-white/20 flex items-center justify-center mb-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5" />
            <div className="w-8 h-8 md:w-12 md:h-12 border border-white/40 rotate-45" />
          </div>

          {/* Text Area */}
          <div ref={textRef} className="text-center overflow-hidden">
            <h1 className="text-xl md:text-2xl font-bold tracking-[0.2em] text-white uppercase mb-2">
              System Boot
            </h1>
            <div className="flex items-center gap-2 justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                Initializing Modules...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Always rendered but covered initially */}
      {children}
    </SplashContext.Provider>
  );
}
