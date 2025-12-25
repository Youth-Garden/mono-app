'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const cursor = cursorRef.current;

    if (!dot || !ring || !cursor) return;

    // --- State & Config ---
    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    let isHovering = false;
    let isMagnetic = false;

    // QuickSetters for performance
    const setRingX = gsap.quickSetter(ring, 'x', 'px');
    const setRingY = gsap.quickSetter(ring, 'y', 'px');
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');

    // --- Mouse Move Listener ---
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Show cursor if hidden
      gsap.to(cursor, { opacity: 1, duration: 0.2, overwrite: 'auto' });
    };

    // --- Ticker (Animation Loop) ---
    const tickerUpdate = () => {
      // 1. Dot follows mouse strictly (or with slight delay if desired, but strict is usually better for dot)
      // unless magnetic
      if (!isMagnetic) {
        dotPos.x += (mouse.x - dotPos.x) * 0.3; // Very fast follow
        dotPos.y += (mouse.y - dotPos.y) * 0.3;
        setDotX(dotPos.x);
        setDotY(dotPos.y);
      }

      // 2. Ring Lerp (Smooth trail)
      // If magnetic, ringPos is handled by the magnet logic, so we skip standard lerp
      if (!isMagnetic) {
        const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
        ringPos.x += (mouse.x - ringPos.x) * dt;
        ringPos.y += (mouse.y - ringPos.y) * dt;

        setRingX(ringPos.x);
        setRingY(ringPos.y);
      }
    };

    // --- Magnetic & Hover Logic ---
    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      isHovering = true;

      const isButton =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.getAttribute('role') === 'button';
      const isInput =
        target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      if (isButton) {
        // Magnetic Snap
        isMagnetic = true;
        const rect = target.getBoundingClientRect();

        // Target center
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        // Animate Ring to encompass the button
        gsap.to(ring, {
          width: rect.width + 10,
          height: rect.height + 10,
          borderRadius: getComputedStyle(target).borderRadius || '4px', // Try to match radius
          x: targetX,
          y: targetY,
          duration: 0.4,
          ease: 'power3.out',
          opacity: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'transparent',
        });

        // Hide dot or scale it down significantly
        gsap.to(dot, { scale: 0, duration: 0.3 });

        // Update ringPos to target so exiting feels natural
        ringPos.x = targetX;
        ringPos.y = targetY;
      } else if (isInput) {
        // Text Caret Mode
        gsap.to(ring, { scale: 0, opacity: 0, duration: 0.3 });
        gsap.to(dot, {
          height: 20,
          width: 2,
          borderRadius: 0,
          scale: 1,
          backgroundColor: '#ffffff',
          duration: 0.3,
        });
      } else {
        // Standard Hover (e.g. slight expand)
        gsap.to(ring, {
          scale: 1.5,
          borderColor: 'rgba(255, 255, 255, 0.8)',
          duration: 0.3,
        });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      isMagnetic = false;

      // Reset Default State
      gsap.to(ring, {
        width: 32,
        height: 32,
        borderRadius: '50%',
        scale: 1,
        opacity: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        backgroundColor: 'transparent',
        duration: 0.4,
        ease: 'power3.out',
      });

      gsap.to(dot, {
        width: 8,
        height: 8,
        borderRadius: '50%',
        scale: 1,
        backgroundColor: 'white',
        duration: 0.3,
      });
    };

    // Attach Listeners
    window.addEventListener('mousemove', onMouseMove);
    gsap.ticker.add(tickerUpdate);

    // Select interactive elements
    // We can use a broad selector or specific classes.
    // Using a broad one for "automatic" support, but manually tagging is often safer for perf.
    // Let's go broad but optimized.
    const interactives = document.querySelectorAll(
      'a, button, input, textarea, [data-cursor="hover"]'
    );

    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(tickerUpdate);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block opacity-0"
    >
      <div
        ref={ringRef}
        className="absolute top-0 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full"
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
      />
    </div>
  );
}
