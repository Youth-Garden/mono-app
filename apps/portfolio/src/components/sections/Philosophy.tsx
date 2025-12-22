'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const phrase =
  'Code is not just syntax; it is architecture. I believe in 0px borders, type-safety, and immutable ledgers. Whether optimizing React render cycles or writing Solidity contracts, the goal remains the same: Absolute Precision.';

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      // Split text into words manually
      const words = textRef.current?.querySelectorAll('span');

      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'bottom 50%',
              scrub: true,
              markers: false,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 md:px-12 border-b border-white/10 min-h-[50vh] flex flex-col justify-center bg-background"
    >
      <div className="max-w-4xl mx-auto">
        <p
          ref={textRef}
          className="text-3xl md:text-5xl leading-tight font-light font-sans tracking-tight text-white/90"
        >
          {phrase.split(' ').map((word, i) => (
            <span key={i} className="inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
