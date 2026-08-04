'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const NORMAL_SPEED = 0.2;
const MAGNETIC_SPEED = 0.2;
const ROTATION_SPEED = 0.2;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Refs for logic (tránh re-render)
  const state = useRef({
    mouse: { x: 0, y: 0 },
    pos: { x: 0, y: 0 },
    vel: { x: 0, y: 0 },
    rot: 0,
    ring: { w: 0, h: 0 },
    isMagnetic: false,
    target: null as HTMLElement | null,
  });

  useGSAP(() => {
    const cursor = cursorRef.current;
    const arrow = arrowRef.current;
    const ring = ringRef.current;

    if (!cursor || !arrow || !ring) return;

    // Tối ưu render bằng quickSetter
    const setCursorX = gsap.quickSetter(cursor, 'x', 'px');
    const setCursorY = gsap.quickSetter(cursor, 'y', 'px');
    const setArrowRot = gsap.quickSetter(arrow, 'rotation', 'deg');
    const setRingW = gsap.quickSetter(ring, 'width', 'px');
    const setRingH = gsap.quickSetter(ring, 'height', 'px');

    // Init ẩn cursor để tránh nháy lúc đầu
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 }); // Center cursor container
    gsap.set(arrow, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 });

    // --- Mouse Listeners ---
    const onMouseMove = (e: MouseEvent) => {
      state.current.mouse.x = e.clientX;
      state.current.mouse.y = e.clientY;

      // Hiện cursor khi di chuyển lần đầu
      gsap.to(cursor, { opacity: 1, duration: 0.3, overwrite: 'auto' });
    };

    // --- Math Helpers ---
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const lerpAngle = (start: number, end: number, amount: number) => {
      let diff = end - start;
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      return start + diff * amount;
    };

    // --- Physics Loop ---
    const updatePhysics = () => {
      const s = state.current;
      const dt = gsap.ticker.deltaRatio();

      // 1. Xác định Target & Speed
      let targetX = s.mouse.x;
      let targetY = s.mouse.y;
      let currentSmooth = NORMAL_SPEED;
      let targetW = 0;
      let targetH = 0;

      if (s.isMagnetic && s.target) {
        currentSmooth = MAGNETIC_SPEED; // Tăng tốc độ khi đang hít
        const rect = s.target.getBoundingClientRect();

        // Target là tâm của nút
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
        targetW = rect.width + 12; // Padding
        targetH = rect.height + 12;
      }

      // 2. Tính toán vị trí (Interpolation)
      // Nhân với dt để mượt trên mọi màn hình (60hz/144hz)
      const moveFactor = currentSmooth * dt;

      const nextX = lerp(s.pos.x, targetX, moveFactor);
      const nextY = lerp(s.pos.y, targetY, moveFactor);

      // Tính vận tốc để xoay mũi tên
      s.vel.x = nextX - s.pos.x;
      s.vel.y = nextY - s.pos.y;
      s.pos.x = nextX;
      s.pos.y = nextY;

      // 3. Render Vị trí
      setCursorX(s.pos.x);
      setCursorY(s.pos.y);

      // 4. Xử lý Ring (Kích thước)
      if (s.isMagnetic) {
        s.ring.w = lerp(s.ring.w, targetW, moveFactor);
        s.ring.h = lerp(s.ring.h, targetH, moveFactor);
        setRingW(s.ring.w);
        setRingH(s.ring.h);
      }

      // 5. Xử lý Xoay (Chỉ xoay khi di chuyển nhanh và không hít)
      let targetRotation = s.rot;
      const velocity = Math.sqrt(s.vel.x ** 2 + s.vel.y ** 2);

      if (!s.isMagnetic && velocity > 1) {
        // +90 độ vì mũi tên SVG mặc định hướng lên trên
        targetRotation = (Math.atan2(s.vel.y, s.vel.x) * 180) / Math.PI + 90;
      } else if (s.isMagnetic) {
        targetRotation = 0; // Reset xoay khi hít
      }

      s.rot = lerpAngle(s.rot, targetRotation, ROTATION_SPEED * dt);
      setArrowRot(s.rot);
    };

    // --- Setup Listeners ---
    window.addEventListener('mousemove', onMouseMove);
    gsap.ticker.add(updatePhysics);

    // Event Delegation for dynamic elements (Modals, etc.)
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, select, textarea, .magnetic-target'
      ) as HTMLElement;

      if (target) {
        state.current.isMagnetic = true;
        state.current.target = target;

        gsap.to(arrow, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to(ring, {
          opacity: 1,
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: getComputedStyle(target).borderRadius || '4px',
          duration: 0.2,
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, select, textarea, .magnetic-target'
      );

      if (target) {
        state.current.isMagnetic = false;
        state.current.target = null;

        gsap.to(arrow, { scale: 1, opacity: 1, duration: 0.2 });
        gsap.to(ring, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      gsap.ticker.remove(updatePhysics);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden lg:block fixed top-0 left-0 pointer-events-none z-9999 will-change-transform"
    >
      {/* SVG Arrow */}
      <div ref={arrowRef} className="absolute will-change-transform">
        <svg
          width={40}
          height={40}
          viewBox="0 0 50 54"
          fill="none"
          style={{ transform: 'scale(0.8)' }}
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

      <div
        ref={ringRef}
        className="absolute top-0 left-0 border border-white/40 pointer-events-none box-border will-change-transform"
        style={{ width: 0, height: 0, opacity: 0 }}
      />
    </div>
  );
}
