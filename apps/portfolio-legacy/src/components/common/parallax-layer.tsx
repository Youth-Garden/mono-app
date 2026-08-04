'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactNode, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  children: ReactNode;
  depth?: number;
  className?: string;
}

export default function ParallaxLayer({
  children,
  depth = 1,
  className = '',
}: ParallaxLayerProps) {
  const layerRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(layerRef.current, {
        y: () => -100 * depth,
        ease: 'none',
        scrollTrigger: {
          trigger: layerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    },
    { scope: layerRef }
  );

  return (
    <div
      ref={layerRef}
      className={className}
      style={{
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
