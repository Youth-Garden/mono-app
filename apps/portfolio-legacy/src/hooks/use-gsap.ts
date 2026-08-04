'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollTrigger({
  trigger,
  start = 'top bottom',
  end = 'bottom top',
  scrub = false,
  markers = false,
  animation,
}: {
  trigger: React.RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  animation?: gsap.TweenVars;
}) {
  useGSAP(
    () => {
      if (!trigger.current) return;

      ScrollTrigger.create({
        trigger: trigger.current,
        start,
        end,
        scrub,
        markers,
        animation: animation ? gsap.to(trigger.current, animation) : undefined,
      });
    },
    { scope: trigger }
  );
}

export function useSplitText(text: string) {
  // Basic implementation since SplitText is a paid plugin.
  // We will simulate it by splitting by words or characters manually in the component for now,
  // or return a helper to split string into span elements.
  return text.split('').map((char, index) => ({
    char,
    id: index,
  }));
}
