'use client';
import { ImageModal } from '@/components/common/image-modal';
import { GALLERY_IMAGES } from '@/constants/gallery';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { ClusterBuilderJam } from './cluster-builder-jam';
import { ClusterCardano } from './cluster-cardano';
import { ClusterGoogleCloud } from './cluster-google-cloud';

gsap.registerPlugin(ScrollTrigger);

export default function Recognition() {
  const containerRef = useRef<HTMLElement>(null);
  const gateTopLeftRef = useRef<HTMLDivElement>(null);
  const gateBottomRightRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const clusterLeftRef = useRef<HTMLDivElement>(null);
  const clusterCloudRef = useRef<HTMLDivElement>(null);
  const clusterRightRef = useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  // Filter images
  const builderJamImages = GALLERY_IMAGES.filter((img) =>
    img.id.includes('builder-jam')
  );
  const googleCloudImages = GALLERY_IMAGES.filter((img) =>
    img.id.includes('google-cloud')
  );
  const cardanoImages = GALLERY_IMAGES.filter((img) =>
    img.id.includes('cardano')
  );

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // --- HELPER: updateClusterState ---
      // This ensures a cluster is ONLY interactive when it is focused and visible.
      // It runs on every frame of the animation to prevent "ghost clicks" on faded items.
      const updateClusterState = (ref: React.RefObject<HTMLDivElement>) => {
        if (!ref.current) return;
        const z = gsap.getProperty(ref.current, 'z') as number;
        const opacity = gsap.getProperty(ref.current, 'opacity') as number;

        // Calculate blur based on depth (starts blurring at z < -600)
        const blur = z > -600 ? 0 : Math.min(10, Math.abs(z + 600) / 100);

        // Strict Active Check:
        // 1. Must be close enough to camera (z > -300)
        // 2. Must be visible enough (opacity > 0.5)
        const isActive = z > -300 && opacity > 0.5;

        gsap.set(ref.current, {
          filter: `blur(${blur}px)`,
          pointerEvents: isActive ? 'auto' : 'none',
        });
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
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
      if (textContainerRef.current) {
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
          'start+=0.2'
        ).to(
          textContainerRef.current,
          {
            scale: 50,
            z: 500,
            opacity: 0,
            filter: 'blur(20px)',
            duration: 8,
            ease: 'power1.in',
          },
          '>-0.5'
        );
      }

      // --- PHASE 3: CLUSTER 1 (Left - Builder Jam) ---
      if (clusterLeftRef.current) {
        tl.fromTo(
          clusterLeftRef.current,
          {
            z: -1500,
            scale: 0.5,
            opacity: 0,
            // filter and pointerEvents handled by onUpdate
          },
          {
            z: 200,
            scale: 1.2,
            opacity: 1,
            duration: 5,
            ease: 'none',
            onUpdate: () => updateClusterState(clusterLeftRef),
          },
          '-=3.0'
        );

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

        tl.to(
          clusterLeftRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: 'power1.in',
            onUpdate: () => updateClusterState(clusterLeftRef),
          },
          '>-1'
        );
      }

      // --- PHASE 4: CLUSTER 2 (Right - Cardano) ---
      if (clusterRightRef.current) {
        tl.fromTo(
          clusterRightRef.current,
          {
            z: -2000,
            scale: 0.5,
            opacity: 0,
            // pointerEvents handled by onUpdate
          },
          {
            z: 200,
            scale: 1.2,
            opacity: 1,
            duration: 5,
            ease: 'none',
            onUpdate: () => updateClusterState(clusterRightRef),
          },
          '-=3.5'
        );

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

        tl.to(
          clusterRightRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: 'power1.in',
            onUpdate: () => updateClusterState(clusterRightRef),
          },
          '>-1'
        );
      }

      // --- PHASE 5: CLUSTER CLOUD (Center/Right - Google Cloud) ---
      if (clusterCloudRef.current) {
        tl.fromTo(
          clusterCloudRef.current,
          {
            z: -2500, // Start very far back
            xPercent: 50, // Slightly to the right
            scale: 0.5,
            opacity: 0,
            // filter and pointerEvents handled by onUpdate
          },
          {
            z: 200,
            xPercent: 20, // Move towards center
            scale: 1.2,
            opacity: 1,
            duration: 5.5,
            ease: 'none',
            onUpdate: () => updateClusterState(clusterCloudRef),
          },
          '-=4.0' // Overlap with Cardano
        );

        gsap.to(clusterCloudRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
          },
          rotationY: -10,
          rotationX: 10,
        });

        tl.to(
          clusterCloudRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: 'power1.in',
            onUpdate: () => updateClusterState(clusterCloudRef),
          },
          '+=0.5' // Fade out after movement finishes (keeps it visible longer)
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
      {/* Perspective Container */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        {/* BACKGROUND ACCENTS */}
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
          className="absolute inset-0 flex flex-col items-center justify-center z-30 origin-center will-change-transform opacity-0 pointer-events-none"
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

        {/* --- CLUSTER 1 (Left - Builder Jam) --- */}
        <ClusterBuilderJam
          ref={clusterLeftRef}
          images={builderJamImages}
          onImageClick={(src) => setSelectedImage(src)}
        />

        {/* --- CLUSTER 3 (Center - Google Cloud) --- */}
        <ClusterGoogleCloud
          ref={clusterCloudRef}
          images={googleCloudImages}
          onImageClick={(src) => setSelectedImage(src)}
        />

        {/* --- CLUSTER 2 (Right - Cardano) --- */}
        <ClusterCardano
          ref={clusterRightRef}
          images={cardanoImages}
          onImageClick={(src) => setSelectedImage(src)}
        />
      </div>
      <ImageModal
        src={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}
