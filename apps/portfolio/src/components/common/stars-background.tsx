'use client';
import { useGSAP } from '@gsap/react';
import { memo, useRef } from 'react';

const StarsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      const stars: {
        x: number;
        y: number;
        radius: number;
        alpha: number;
        speed: number;
      }[] = [];
      const numStars = 100;

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          speed: Math.random() * 0.5 + 0.2,
        });
      }

      const draw = () => {
        ctx.clearRect(0, 0, width, height);

        stars.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.fill();

          // Move stars slowly upwards
          star.y -= star.speed;
          if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
          }
        });

        requestAnimationFrame(draw);
      };

      draw();

      const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },
    { scope: canvasRef }
  );

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-50 pointer-events-none"
    />
  );
};

export default memo(StarsBackground);
