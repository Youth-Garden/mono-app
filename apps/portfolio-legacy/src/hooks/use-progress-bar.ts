import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface UseProgressBarOptions {
  containerRef: RefObject<HTMLElement>;
}

export function useProgressBar({ containerRef }: UseProgressBarOptions) {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
              width: `${self.progress * 100}%`,
              duration: 0.1,
              ease: 'none',
            });
          }
        },
      });
    },
    { scope: containerRef }
  );

  return progressBarRef;
}
