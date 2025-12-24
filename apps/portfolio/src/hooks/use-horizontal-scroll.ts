import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface UseHorizontalScrollOptions {
  containerRef: RefObject<HTMLElement>;
  itemCount: number;
  viewportWidthMultiplier?: number;
}

export function useHorizontalScroll({
  containerRef,
  itemCount,
  viewportWidthMultiplier = 0.75,
}: UseHorizontalScrollOptions) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const container = containerRef.current;

      if (!track || !container || itemCount === 0) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth =
          window.innerWidth < 768
            ? window.innerWidth
            : window.innerWidth * viewportWidthMultiplier;
        return -(trackWidth - viewportWidth);
      };

      const getScrollDistance = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth =
          window.innerWidth < 768
            ? window.innerWidth
            : window.innerWidth * viewportWidthMultiplier;
        return trackWidth - viewportWidth;
      };

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              gsap.to(progressBarRef.current, {
                width: `${self.progress * 100}%`,
                duration: 0.1,
                ease: 'none',
              });
            }
          },
        },
      });
    },
    { scope: containerRef }
  );

  return { trackRef, progressBarRef };
}
