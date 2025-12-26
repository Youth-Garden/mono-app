'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import { useRef } from 'react';

interface ModalProps {
  onDismiss?: () => void;
  children: React.ReactNode;
  isOpen?: boolean;
}

export function Modal({ onDismiss, children, isOpen }: ModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (isOpen) {
        // ENTRANCE
        gsap.fromTo(
          containerRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
        );
      } else {
        // EXIT
        gsap.to(containerRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    },
    { dependencies: [isOpen], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full opacity-0 scale-90 pointer-events-none [&>*]:pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button - Absolutely positioned relative to the content area or viewport? 
          Since this Modal is inside a full-screen flex container (from DialogProvider), 
          absolute positioning here works relative to this div. 
          But this div is `w-full h-full flex items-center`. 
          So `absolute top-10 right-10` puts it in the screen corner. Perfect.
      */}
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-6 right-6 md:top-10 md:right-10 p-4 group cursor-pointer pointer-events-auto"
      >
        <div className="relative flex items-center justify-center p-3 rounded-full border border-white/20 bg-black/50 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
          <X className="w-8 h-8 transition-transform duration-300 group-hover:rotate-90" />
        </div>
      </button>

      {/* Content */}
      {children}
    </div>
  );
}
