'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ReactNode, useRef, useState } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glareOpacity?: number;
  glareColor?: string;
}

export default function Card3D({
  children,
  className = '',
  maxTilt = 10,
  perspective = 1000,
  scale = 1.02,
  glareOpacity = 0.4,
  glareColor = 'rgba(255, 255, 255, 0.4)',
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // GSAP ContextSafe usage for performance if needed, but simple refs work well here
  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const posX = (x - centerX) / centerX;
    const posY = (y - centerY) / centerY;

    const rotateX = posY * -maxTilt;
    const rotateY = posX * maxTilt;

    // Apply rotation
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: scale,
      duration: 0.1,
      ease: 'power1.out',
      overwrite: 'auto',
    });

    // Update glare position
    if (glareRef.current) {
      const bgX = (x / rect.width) * 100;
      const bgY = (y / rect.height) * 100;
      gsap.to(glareRef.current, {
        '--bg-x': `${bgX}%`,
        '--bg-y': `${bgY}%`,
        duration: 0.1,
        ease: 'none',
      });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    setIsHovering(false);

    // Reset rotation
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // Reset glare
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        '--bg-x': '50%',
        '--bg-y': '50%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  });

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <div
      ref={cardRef}
      className={`relative will-change-transform ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: `${perspective}px`, // Using standard CSS perspective
      }}
    >
      <div
        ref={contentRef}
        className="relative z-10 h-full w-full pointer-events-none"
      >
        {/* Important: pointer-events-none on wrapper to ensure underlying interactive elements (buttons) still work if they have pointer-events-auto, but here we want bubbling from container. 
            Actually, if card children have interactivity, we need pointer-events-auto. 
            Let's keep it default. */}
        <div className="h-full w-full pointer-events-auto">{children}</div>
      </div>

      <div
        ref={glareRef}
        className="absolute inset-0 z-20 pointer-events-none rounded-[inherit] mix-blend-overlay"
        style={{
          background: `radial-gradient(
            farthest-corner circle at var(--bg-x, 50%) var(--bg-y, 50%),
            ${glareColor} 0%,
            rgba(255, 255, 255, 0) 80%
          )`,
          opacity: isHovering ? glareOpacity : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
}
