'use client';
import { GALLERY_IMAGES } from '@/constants/gallery';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Recognition() {
  const containerRef = useRef<HTMLElement>(null);
  const gateTopLeftRef = useRef<HTMLDivElement>(null);
  const gateBottomRightRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const clusterLeftRef = useRef<HTMLDivElement>(null);
  const clusterRightRef = useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<any | null>(null);

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

      // --- PHASE 1: PROFESSIONAL GATE OPEN ---
      if (gateTopLeftRef.current && gateBottomRightRef.current) {
        tl.to(
          gateTopLeftRef.current,
          {
            xPercent: -100, // Move Left
            yPercent: -50,
            opacity: 0,
            duration: 2,
            ease: 'power3.inOut',
          },
          'start'
        ).to(
          gateBottomRightRef.current,
          {
            xPercent: 100, // Move Right
            yPercent: 50,
            opacity: 0,
            duration: 2,
            ease: 'power3.inOut',
          },
          'start'
        );
      }

      // --- PHASE 2: TEXT ZOOM (The "Tunnel" Effect) ---
      // We scale the text up massively to simulate flying through it.
      if (textContainerRef.current) {
        // 1. Fade In (Appears slowly as gate opens)
        tl.fromTo(
          textContainerRef.current,
          {
            scale: 0.8,
            opacity: 0,
            z: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
          },
          'start+=0.2' // Appear earlier, just as gates start to open
        )
          // 2. Zoom Through (Slow & Smooth)
          .to(
            textContainerRef.current,
            {
              scale: 50,
              z: 500,
              opacity: 0,
              filter: 'blur(20px)',
              duration: 8, // Longer duration for slower zoom
              ease: 'power1.in', // Tu tu thôi (Gentle acceleration)
            },
            '>-0.5' // Overlap slightly with fade in finish
          );
      }

      // --- PHASE 3: CLUSTER 1 (Left - Builder Jam) ---
      // Enters from deep background, sharpens, floats by
      if (clusterLeftRef.current) {
        tl.fromTo(
          clusterLeftRef.current,
          {
            z: -1500, // Start far back
            scale: 0.5,
            opacity: 0,
            // filter: 'blur(10px)', // Handled by onUpdate
          },
          {
            z: 200, // Move past camera
            scale: 1.2,
            opacity: 1,
            duration: 5,
            ease: 'none',
            onUpdate: function () {
              const z = gsap.getProperty(clusterLeftRef.current, 'z') as number;
              // Smart Focus: Sharp when z > -600 (Close to viewer), blurry when far
              const blur = z > -600 ? 0 : Math.min(10, Math.abs(z + 600) / 100);
              gsap.set(clusterLeftRef.current, { filter: `blur(${blur}px)` });
            },
          },
          '-=3.0' // Align with the slower zoom
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
            duration: 1,
            ease: 'power1.in',
            onUpdate: function () {
              // Ensure it stays sharp during exit
              gsap.set(clusterLeftRef.current, { filter: 'blur(0px)' });
            },
          },
          '>-1'
        );
      }

      // --- PHASE 4: CLUSTER 2 (Right - Cardano) ---
      if (clusterRightRef.current) {
        tl.fromTo(
          clusterRightRef.current,
          {
            z: -2000, // Start even further back
            scale: 0.5,
            opacity: 0,
            // filter: 'blur(10px)',
          },
          {
            z: 200,
            scale: 1.2,
            opacity: 1, // Focus
            duration: 5,
            ease: 'none',
            onUpdate: function () {
              const z = gsap.getProperty(
                clusterRightRef.current,
                'z'
              ) as number;
              // Smart Focus: Sharp when z > -600
              const blur = z > -600 ? 0 : Math.min(10, Math.abs(z + 600) / 100);
              gsap.set(clusterRightRef.current, { filter: `blur(${blur}px)` });
            },
          },
          '-=3.5' // Overlap with previous cluster
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
            duration: 1,
            ease: 'power1.in',
            onUpdate: function () {
              gsap.set(clusterRightRef.current, { filter: 'blur(0px)' });
            },
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

        {/* --- PHASE 1: PROFESSIONAL GATE --- */}
        <div
          ref={gateTopLeftRef}
          className="absolute top-10 left-6 md:left-20 z-40 flex flex-col items-start"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest block mb-2">
            04 / GALLERY
          </span>
          <h1 className="text-[10vw] font-black uppercase tracking-tighter leading-[0.8] text-white mix-blend-difference">
            RECOG
          </h1>
          <h1 className="text-[10vw] font-black uppercase tracking-tighter leading-[0.8] text-transparent [-webkit-text-stroke:2px_white] opacity-70">
            NITIONS
          </h1>
        </div>

        <div
          ref={gateBottomRightRef}
          className="absolute bottom-10 right-6 md:right-20 z-40 flex flex-col items-end text-right"
        >
          <h1 className="text-[10vw] font-black uppercase tracking-tighter leading-[0.8] text-transparent [-webkit-text-stroke:2px_white] opacity-70">
            & AWARDS
          </h1>
          <span className="font-mono text-sm md:text-base text-neutral-400 mt-2 tracking-widest">
            2023 — 2025
          </span>
        </div>

        {/* --- TEXT GROUP --- */}
        <div
          ref={textContainerRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 origin-center will-change-transform opacity-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h1 className="text-[5vw] font-black uppercase tracking-tighter leading-[0.85] text-center text-white mix-blend-difference">
            ENTER
            <br />
            <span className="text-[4vw] block mt-4 text-transparent [-webkit-text-stroke:2px_white]">
              GALLERY
            </span>
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
              <GlassImage
                src={builderJamImages[0].src}
                ratio="video"
                onClick={() => setSelectedImage(builderJamImages[0]!.src)}
              />
            )}
            {builderJamImages[2] && (
              <GlassImage
                src={builderJamImages[2].src}
                ratio="square"
                onClick={() => setSelectedImage(builderJamImages[2]!.src)}
              />
            )}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 w-1/2">
            {builderJamImages[1] && (
              <GlassImage
                src={builderJamImages[1].src}
                ratio="square"
                onClick={() => setSelectedImage(builderJamImages[1]!.src)}
              />
            )}
            {builderJamImages[3] && (
              <GlassImage
                src={builderJamImages[3].src}
                ratio="video"
                onClick={() => setSelectedImage(builderJamImages[3]!.src)}
              />
            )}
            {builderJamImages[4] && (
              <GlassImage
                src={builderJamImages[4].src}
                ratio="video"
                onClick={() => setSelectedImage(builderJamImages[4]!.src)}
              />
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
              <GlassImage
                src={cardanoImages[0].src}
                ratio="portrait"
                onClick={() => setSelectedImage(cardanoImages[0]!.src)}
              />
            )}
            {cardanoImages[2] && (
              <GlassImage
                src={cardanoImages[2].src}
                ratio="video"
                onClick={() => setSelectedImage(cardanoImages[2]!.src)}
              />
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
              <GlassImage
                src={cardanoImages[1].src}
                ratio="video"
                onClick={() => setSelectedImage(cardanoImages[1]!.src)}
              />
            )}
            {cardanoImages[3] && (
              <GlassImage
                src={cardanoImages[3].src}
                ratio="square"
                onClick={() => setSelectedImage(cardanoImages[3]!.src)}
              />
            )}
          </div>
        </div>
      </div>
      <ImageModal
        src={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}

// Utility component for consistent image styling
function GlassImage({
  src,
  ratio,
  onClick,
}: {
  src: any;
  ratio: 'square' | 'video' | 'portrait';
  onClick: () => void;
}) {
  const aspect = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  }[ratio];

  return (
    <div
      onClick={onClick}
      className={`relative ${aspect} w-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group cursor-zoom-in pointer-events-auto`}
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

function ImageModal({
  src,
  isOpen,
  onClose,
}: {
  src: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-2 text-white/50 hover:text-white transition-colors z-[10000] pointer-events-auto"
      >
        <X size={32} />
      </button>

      {/* Image Container */}
      <div
        className="relative w-[90vw] h-[90vh] md:w-[80vw] md:h-[80vh] pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt="Full Screen"
          fill
          className="object-contain"
          priority
          quality={100}
        />
      </div>
    </div>,
    document.body
  );
}
