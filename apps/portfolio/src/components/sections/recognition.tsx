'use client';
import { GALLERY_IMAGES } from '@/constants/gallery';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Recognition() {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const clusterLeftRef = useRef<HTMLDivElement>(null);
  const clusterRightRef = useRef<HTMLDivElement>(null);

  // Filter images
  const builderJamImages = GALLERY_IMAGES.filter((img) =>
    img.id.includes('builder-jam')
  );
  const cardanoImages = GALLERY_IMAGES.filter((img) =>
    img.id.includes('cardano')
  );

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Lower scrub for snappier, more modern feel
          pin: true,
        },
      });

      // --- PHASE 1: TEXT ZOOM (The "Tunnel" Effect) ---
      // We scale the text up massively to simulate flying through it.
      if (textContainerRef.current) {
        tl.to(textContainerRef.current, {
          scale: 30, // Huge scale to go "through" the letters
          z: 500,
          opacity: 0,
          filter: 'blur(20px)', // Blur as it gets too close/big
          duration: 3,
          ease: 'power3.in', // Accelerate into the tunnel
        });
      }

      // --- PHASE 2: CLUSTER 1 (Left - Builder Jam) ---
      // Enters from deep background, sharpens, floats by
      if (clusterLeftRef.current) {
        tl.fromTo(
          clusterLeftRef.current,
          {
            z: -1500, // Start far back
            scale: 0.5,
            opacity: 0,
            filter: 'blur(4px)', // Reduced initial blur
          },
          {
            z: 200, // Move past camera
            scale: 1.2,
            opacity: 1,
            filter: 'blur(0px)', // Focus as it gets closer
            duration: 5,
            ease: 'none',
          },
          '-=2.5' // Overlap with text fade out
        );

        // Subtle parallax rotation for realism
        gsap.to(clusterLeftRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
          },
          rotationY: 15,
          rotationX: 5,
        });

        // Exit phase for Cluster 1 (Fade out as it passes)
        tl.to(
          clusterLeftRef.current,
          {
            opacity: 0,
            filter: 'blur(0px)', // FORCE SHARPNESS during exit
            duration: 1,
            ease: 'power1.in',
          },
          '>-1'
        );
      }

      // --- PHASE 3: CLUSTER 2 (Right - Cardano) ---
      if (clusterRightRef.current) {
        tl.fromTo(
          clusterRightRef.current,
          {
            z: -2000, // Start even further back
            scale: 0.5,
            opacity: 0,
            filter: 'blur(6px)', // Reduced blur
          },
          {
            z: 200,
            scale: 1.2,
            opacity: 1,
            filter: 'blur(0px)', // Focus
            duration: 5,
            ease: 'none',
          },
          '-=3' // Overlap with previous cluster
        );

        // Subtle parallax rotation
        gsap.to(clusterRightRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
          },
          rotationY: -15,
          rotationX: 5,
        });

        // Exit phase for Cluster 2
        tl.to(
          clusterRightRef.current,
          {
            opacity: 0,
            filter: 'blur(0px)', // FORCE SHARPNESS
            duration: 1,
            ease: 'power1.in',
          },
          '>-1'
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="recognition"
      ref={containerRef}
      className="w-full h-[400vh] bg-black relative overflow-hidden"
    >
      {/* 
        Perspective Container 
        Made perspective stronger (1000px) and fixed to screen 
      */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        {/* BACKGROUND ACCENTS (Optional: Adds speed reference) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-black to-black -z-10" />

        {/* --- TEXT GROUP --- */}
        <div
          ref={textContainerRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 origin-center will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-[0.85] text-center text-white mix-blend-difference">
            Recognit
            <span className="text-transparent [-webkit-text-stroke:2px_white] opacity-70">
              ion
            </span>
            <br />
            <span className="text-[8vw] block mt-4">& Awards</span>
          </h1>
        </div>

        {/* --- CLUSTER 1 (Left) --- */}
        <div
          ref={clusterLeftRef}
          className="absolute top-1/2 left-[15%] md:left-[20%] -translate-x-1/2 -translate-y-1/2 w-[40vw] md:w-[35vw] flex gap-4 pointer-events-none will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-4 w-1/2 pt-12">
            <div className="text-left mb-4">
              <span className="inline-block px-2 py-1 bg-green-500/20 border border-green-500/50 text-green-400 text-xs font-mono mb-2 rounded">
                BUILDER JAM
              </span>
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                Top 1
              </h3>
            </div>
            {builderJamImages[0] && (
              <GlassImage src={builderJamImages[0].src} ratio="video" />
            )}
            {builderJamImages[2] && (
              <GlassImage src={builderJamImages[2].src} ratio="square" />
            )}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 w-1/2">
            {builderJamImages[1] && (
              <GlassImage src={builderJamImages[1].src} ratio="square" />
            )}
            {builderJamImages[3] && (
              <GlassImage src={builderJamImages[3].src} ratio="video" />
            )}
            {builderJamImages[4] && (
              <GlassImage src={builderJamImages[4].src} ratio="video" />
            )}
          </div>
        </div>

        {/* --- CLUSTER 2 (Right) --- */}
        <div
          ref={clusterRightRef}
          className="absolute top-1/2 right-[15%] md:right-[20%] translate-x-1/2 -translate-y-1/2 w-[40vw] md:w-[35vw] flex gap-4 pointer-events-none will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-4 w-1/2">
            {cardanoImages[0] && (
              <GlassImage src={cardanoImages[0].src} ratio="portrait" />
            )}
            {cardanoImages[2] && (
              <GlassImage src={cardanoImages[2].src} ratio="video" />
            )}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 w-1/2 pt-12">
            <div className="text-right mb-4">
              <span className="inline-block px-2 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-400 text-xs font-mono mb-2 rounded">
                CARDANO
              </span>
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                Runner Up
              </h3>
            </div>
            {cardanoImages[1] && (
              <GlassImage src={cardanoImages[1].src} ratio="video" />
            )}
            {cardanoImages[3] && (
              <GlassImage src={cardanoImages[3].src} ratio="square" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Utility component for consistent image styling
function GlassImage({
  src,
  ratio,
}: {
  src: any;
  ratio: 'square' | 'video' | 'portrait';
}) {
  const aspect = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  }[ratio];

  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group`}
    >
      <Image
        src={src}
        alt="Gallery Image"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
    </div>
  );
}
