'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactNode, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface SectionTransitionProps {
  children: ReactNode;
  type?: 'fade' | 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right';
  delay?: number;
  duration?: number;
}

export default function SectionTransition({
  children,
  type = 'fade-up',
  delay = 0,
  duration = 1,
}: SectionTransitionProps) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const animations: Record<string, gsap.TweenVars> = {
        fade: {
          opacity: 0,
        },
        'fade-up': {
          opacity: 0,
          y: 60,
        },
        'fade-down': {
          opacity: 0,
          y: -60,
        },
        'slide-left': {
          opacity: 0,
          x: -100,
        },
        'slide-right': {
          opacity: 0,
          x: 100,
        },
      };

      gsap.from(containerRef.current, {
        ...animations[type],
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return <div ref={containerRef}>{children}</div>;
}
