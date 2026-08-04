'use client';
import { LenisProvider, useLenis } from '@/hooks/use-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactNode, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

function SmoothScrollInner({ children }: { children: ReactNode }) {
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Handle anchor link clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: 0,
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [lenis]);

  return <>{children}</>;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <SmoothScrollInner>{children}</SmoothScrollInner>
    </LenisProvider>
  );
}
