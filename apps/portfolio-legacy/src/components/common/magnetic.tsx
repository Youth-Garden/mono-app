'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { ReactElement, useRef } from 'react';

interface MagneticProps {
  children: ReactElement;
  strength?: number; // 0 to 1 (default 0.5)
}

export default function Magnetic({ children, strength = 0.5 }: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!magneticRef.current) return;

      const xTo = gsap.quickTo(magneticRef.current, 'x', {
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });
      const yTo = gsap.quickTo(magneticRef.current, 'y', {
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } =
          magneticRef.current!.getBoundingClientRect();

        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        xTo(x * strength);
        yTo(y * strength);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      magneticRef.current.addEventListener('mousemove', handleMouseMove);
      magneticRef.current.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (magneticRef.current) {
          magneticRef.current.removeEventListener('mousemove', handleMouseMove);
          magneticRef.current.removeEventListener(
            'mouseleave',
            handleMouseLeave
          );
        }
      };
    },
    { scope: magneticRef }
  );

  return React.cloneElement(children, {
    ref: magneticRef,
    className: `${children.props.className || ''} magnetic-target`,
  });
}
