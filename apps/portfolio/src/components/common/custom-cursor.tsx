'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

// Cấu hình độ mượt (càng nhỏ càng chậm/mượt, càng lớn càng nhanh/bám sát)
const SMOOTH_FACTOR = 0.15; // Tăng một chút để resize nhanh hơn
const ROTATION_SMOOTHING = 0.1;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cursor = cursorRef.current;
    const arrow = arrowRef.current;
    const ring = ringRef.current;

    if (!cursor || !arrow || !ring) return;

    // --- State ---
    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    const vel = { x: 0, y: 0 };
    let currentRotation = 0;

    // Ring Size State
    const ringSize = { w: 0, h: 0 }; // Current rendered size

    // Magnetic State
    let isMagnetic = false;
    let magneticTarget: HTMLElement | null = null;

    // Init
    gsap.set(cursor, { x: 0, y: 0 }); // Fixed container
    gsap.set(arrow, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: 'center center',
    });
    gsap.set(ring, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      width: 0,
      height: 0,
    });

    // --- Mouse Listeners ---
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Reveal cursor
      gsap.to(cursor, { opacity: 1, duration: 0.2, overwrite: 'auto' });
    };

    // --- Helper: Lerp ---
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const lerpAngle = (start: number, end: number, amount: number) => {
      let diff = end - start;
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      return start + diff * amount;
    };

    // --- Physics Loop (Run every frame) ---
    const updatePhysics = () => {
      // 0. DT setup
      const dt = gsap.ticker.deltaRatio();
      const smooth = SMOOTH_FACTOR * dt;

      // 1. Calculate Target Position & Size
      let targetX = mouse.x;
      let targetY = mouse.y;
      let targetW = 0;
      let targetH = 0;

      if (isMagnetic && magneticTarget) {
        // Real-time tracking of button position & size (fixes scroll drift & content resize)
        const rect = magneticTarget.getBoundingClientRect();
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;

        targetW = rect.width + 12; // +Padding
        targetH = rect.height + 12;
      }

      // 2. Smooth Position Follow
      const moveX = (targetX - pos.x) * smooth;
      const moveY = (targetY - pos.y) * smooth;

      pos.x += moveX;
      pos.y += moveY;

      // Calculate velocity for rotation
      vel.x = moveX;
      vel.y = moveY;

      // 3. Smooth Size Follow (Dynamic Resize)
      // Only interpolate size if magnetic, otherwise it stays 0 (hidden)
      if (isMagnetic) {
        ringSize.w = lerp(ringSize.w, targetW, smooth);
        ringSize.h = lerp(ringSize.h, targetH, smooth);
      } else {
        // Reset size when not magnetic (optional, or just let opacity hide it)
        ringSize.w = lerp(ringSize.w, 0, smooth);
        ringSize.h = lerp(ringSize.h, 0, smooth);
      }

      // 4. Rotation Logic (Arrow Only)
      let targetRotation = currentRotation;
      const velocityMag = Math.sqrt(vel.x * vel.x + vel.y * vel.y);

      if (!isMagnetic && velocityMag > 0.5) {
        // +90deg because SVG arrow points up-left(-ish) or we assume standard
        targetRotation = (Math.atan2(vel.y, vel.x) * 180) / Math.PI + 90;
      } else if (isMagnetic) {
        targetRotation = 0;
      }

      currentRotation = lerpAngle(
        currentRotation,
        targetRotation,
        ROTATION_SMOOTHING * dt
      );

      // 5. Render Transforms
      cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      arrow.style.transform = `rotate(${currentRotation}deg) translate(-50%, -50%)`;

      // Render Ring Size & Transform
      // Note: Ring is centered by xPercent/yPercent: -50 in CSS/Init
      // We just need to set width/height
      if (isMagnetic) {
        ring.style.width = `${ringSize.w}px`;
        ring.style.height = `${ringSize.h}px`;
      }
    };

    // --- Hover Logic ---
    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const isInteractive = target.closest(
        'a, button, [role="button"], input, select'
      );

      if (isInteractive) {
        isMagnetic = true;
        magneticTarget = target as HTMLElement;

        // 1. Hide Arrow
        gsap.to(arrow, { scale: 0, opacity: 0, duration: 0.2 });

        // 2. Show Ring (Size is handled in updatePhysics loop)
        gsap.to(ring, {
          opacity: 1,
          scale: 1,
          borderWidth: '1px',
          borderColor: 'rgba(255, 255, 255, 0.4)',
          borderRadius: getComputedStyle(target).borderRadius || '4px',
          duration: 0.2,
        });

        // Instant update size slightly to avoid 0->target jump?
        // Or cleaner: Let the lerp handle it from 0 (expand effect).
        // If we want it to START at current size, we could seed it:
        // const rect = target.getBoundingClientRect();
        // ringSize.w = rect.width + 12;
        // ringSize.h = rect.height + 12;
        // But allowing "growth" animation is usually nicer.
      }
    };

    const handleMouseLeave = () => {
      if (isMagnetic) {
        isMagnetic = false;
        magneticTarget = null;

        // 1. Show Arrow
        gsap.to(arrow, { scale: 1, opacity: 1, duration: 0.2 });

        // 2. Hide Ring
        gsap.to(ring, {
          opacity: 0,
          duration: 0.2,
        });
      }
    };

    // --- Listeners ---
    window.addEventListener('mousemove', onMouseMove);
    gsap.ticker.add(updatePhysics);

    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, select'
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(updatePhysics);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform opacity-0"
    >
      {/* SVG Arrow */}
      <div
        ref={arrowRef}
        className="absolute top-0 left-0 will-change-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 50 54"
          fill="none"
          style={{ transform: 'scale(0.6)' }}
        >
          <g filter="url(#filter0_d_91_7928)">
            <path
              d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
              fill="black"
            />
            <path
              d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
              stroke="white"
              strokeWidth={2.25825}
            />
          </g>
          <defs>
            <filter
              id="filter0_d_91_7928"
              x={0.602397}
              y={0.952444}
              width={49.0584}
              height={52.428}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy={2.25825} />
              <feGaussianBlur stdDeviation={2.25825} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_91_7928"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_91_7928"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Magnetic Ring (Hidden by default) */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 border border-white/20 pointer-events-none box-border"
        style={{
          width: 0,
          height: 0,
          opacity: 0,
          transform: 'translate(-50%, -50%)', // Ensure initial transform matches logic
        }}
      />
    </div>
  );
}
