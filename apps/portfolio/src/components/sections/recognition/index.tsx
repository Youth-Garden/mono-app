'use client';
import { ImageModal } from '@/components/common/image-modal';
import StarsBackground from '@/components/common/stars-background';
import { GALLERY_IMAGES } from '@/constants/gallery';
import { useModal } from '@/hooks/use-modal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { memo, useRef } from 'react';
import { ClusterBuilderJam } from './cluster-builder-jam';
import { ClusterCardano } from './cluster-cardano';
import { ClusterGoogleCloud } from './cluster-google-cloud';

gsap.registerPlugin(ScrollTrigger);

function Recognition() {
  const containerRef = useRef<HTMLElement>(null);
  const gateTopLeftRef = useRef<HTMLDivElement>(null);
  const gateBottomRightRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const clusterLeftRef = useRef<HTMLDivElement>(null);
  const clusterCloudRef = useRef<HTMLDivElement>(null);
  const clusterRightRef = useRef<HTMLDivElement>(null);

  const [presentImageModal] = useModal(ImageModal);

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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Unified scrub for smoother sync
          pin: true,
          anticipatePin: 1,
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
            force3D: true,
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
            force3D: true,
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
            filter: 'blur(20px)', // Keep this single transition as it's part of the exit effect
            duration: 8,
            ease: 'power1.in',
          },
          '>-0.5'
        );
      }

      // --- PHASE 3: CLUSTER 1 (Left - Builder Jam) ---
      if (clusterLeftRef.current) {
        const label = 'clusterLeft';
        tl.addLabel(label, '-=3.0');

        // 1. Movement & Rotation (Full duration)
        tl.fromTo(
          clusterLeftRef.current,
          {
            z: -1500,
            scale: 0.5,
            opacity: 0,
            rotationY: 0,
            rotationX: 0,
            pointerEvents: 'none', // Start disabled
          },
          {
            z: 1200,
            scale: 1.2,
            opacity: 1,
            rotationY: 15,
            rotationX: 5,
            duration: 5,
            ease: 'none',
            force3D: true,
          },
          label
        );

        // 2. Blur (Clears fast as it approaches)
        tl.fromTo(
          clusterLeftRef.current,
          { filter: 'blur(10px)' },
          {
            filter: 'blur(0px)',
            duration: 2.5, // Clears by the time it reaches ~ -200z
            ease: 'power1.out',
          },
          label
        );

        // 3. Interaction Window (Only active in the middle ~z -300 to 300)
        tl.set(
          clusterLeftRef.current,
          { pointerEvents: 'auto' },
          `${label}+=2.0`
        );
        tl.set(
          clusterLeftRef.current,
          { pointerEvents: 'none' },
          `${label}+=3.8`
        );

        // 4. Exit Fade (Safety)
        tl.to(
          clusterLeftRef.current,
          { opacity: 0, duration: 0.5, ease: 'none' },
          `${label}+=4.5`
        );
      }

      // --- PHASE 4: CLUSTER 2 (Right - Cardano) ---
      if (clusterRightRef.current) {
        const label = 'clusterRight';
        tl.addLabel(label, '-=3.5'); // Relative to previous insertion point

        tl.fromTo(
          clusterRightRef.current,
          {
            z: -2000,
            scale: 0.5,
            opacity: 0,
            rotationY: 0,
            rotationX: 0,
            pointerEvents: 'none',
          },
          {
            z: 1200,
            scale: 1.2,
            opacity: 1,
            rotationY: -15,
            rotationX: 5,
            duration: 5,
            ease: 'none',
            force3D: true,
          },
          label
        );

        tl.fromTo(
          clusterRightRef.current,
          { filter: 'blur(10px)' },
          {
            filter: 'blur(0px)',
            duration: 2.5,
            ease: 'power1.out',
          },
          label
        );

        tl.set(
          clusterRightRef.current,
          { pointerEvents: 'auto' },
          `${label}+=2.0`
        );
        tl.set(
          clusterRightRef.current,
          { pointerEvents: 'none' },
          `${label}+=3.8`
        );

        tl.to(
          clusterRightRef.current,
          { opacity: 0, duration: 0.5, ease: 'none' },
          `${label}+=4.5`
        );
      }

      // --- PHASE 5: CLUSTER CLOUD (Center/Right - Google Cloud) ---
      if (clusterCloudRef.current) {
        const label = 'clusterCloud';
        tl.addLabel(label, '-=4.0');

        tl.fromTo(
          clusterCloudRef.current,
          {
            z: -2500,
            xPercent: 50,
            scale: 0.5,
            opacity: 0,
            rotationY: 0,
            rotationX: 0,
            pointerEvents: 'none',
          },
          {
            z: 1200,
            xPercent: 20,
            scale: 1.2,
            opacity: 1,
            rotationY: -10,
            rotationX: 10,
            duration: 5.5,
            ease: 'none',
            force3D: true,
          },
          label
        );

        tl.fromTo(
          clusterCloudRef.current,
          { filter: 'blur(10px)' },
          {
            filter: 'blur(0px)',
            duration: 3.0, // Longer duration for cloud as it starts further
            ease: 'power1.out',
          },
          label
        );

        tl.set(
          clusterCloudRef.current,
          { pointerEvents: 'auto' },
          `${label}+=2.2`
        );
        tl.set(
          clusterCloudRef.current,
          { pointerEvents: 'none' },
          `${label}+=4.2`
        );

        tl.to(
          clusterCloudRef.current,
          { opacity: 0, duration: 0.5, ease: 'none' },
          `${label}+=5.0`
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-neutral-800/20 via-black to-black -z-10" />
        <StarsBackground />

        {/* --- PHASE 1: PROFESSIONAL GATE --- */}
        <div
          ref={gateTopLeftRef}
          className="absolute top-10 left-6 md:left-20 z-40 flex flex-col items-start will-change-transform transform-gpu"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest block mb-2">
            04 / GALLERY
          </span>
          <h1 className="text-[10vw] font-black uppercase tracking-tighter leading-[0.8] text-white mix-blend-difference">
            RECOG
          </h1>
          <h1 className="text-[10vw] font-black uppercase tracking-tighter leading-[0.8] text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
            NITIONS
          </h1>
        </div>

        <div
          ref={gateBottomRightRef}
          className="absolute bottom-10 right-6 md:right-20 z-40 flex flex-col items-end text-right will-change-transform transform-gpu"
        >
          <h1 className="text-[10vw] font-black uppercase tracking-tighter leading-[0.8] text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
            & AWARDS
          </h1>
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
            <span className="text-[4vw] block mt-4 text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
              GALLERY
            </span>
          </h1>
        </div>

        {/* --- CLUSTER 1 (Left - Builder Jam) --- */}
        <ClusterBuilderJam
          ref={clusterLeftRef}
          images={builderJamImages}
          onImageClick={(src) => presentImageModal({ src })}
        />

        {/* --- CLUSTER 3 (Center - Google Cloud) --- */}
        <ClusterGoogleCloud
          ref={clusterCloudRef}
          images={googleCloudImages}
          onImageClick={(src) => presentImageModal({ src })}
        />

        {/* --- CLUSTER 2 (Right - Cardano) --- */}
        <ClusterCardano
          ref={clusterRightRef}
          images={cardanoImages}
          onImageClick={(src) => presentImageModal({ src })}
        />
      </div>
    </section>
  );
}

export default memo(Recognition);
