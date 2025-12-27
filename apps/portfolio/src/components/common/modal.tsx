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
      className="relative flex items-center justify-center w-full h-full opacity-0 scale-90 pointer-events-none *:pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-6 right-6 md:top-10 md:right-10 p-1 rounded-full group cursor-pointer pointer-events-auto"
      >
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/50 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 backdrop-blur-sm">
          <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
        </div>
      </button>

      {/* Content */}
      {children}
    </div>
  );
}
