'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface LenisContextValue {
  lenis: Lenis | null;
  scrollProgress: number;
  scrollVelocity: number;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollProgress: 0,
  scrollVelocity: 0,
});

export const useLenis = () => useContext(LenisContext);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);

    // Sync Lenis with ScrollTrigger
    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update state for hooks
    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      setScrollProgress(e.progress);
      setScrollVelocity(e.velocity);
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider
      value={{
        lenis: lenisInstance,
        scrollProgress,
        scrollVelocity,
      }}
    >
      {children}
    </LenisContext.Provider>
  );
}
