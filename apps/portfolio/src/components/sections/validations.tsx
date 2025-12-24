'use client';
import { GALLERY_IMAGES } from '@/constants/gallery';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Validations() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray('.gallery-item');

      items.forEach((item, index) => {
        const element = item as HTMLElement;

        gsap.to(element, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.2)',
          delay: index * 0.05,
          scrollTrigger: {
            trigger: element,
            start: 'top 95%',
            once: true,
            onEnter: () => {
              element.style.transform = 'scale(1)';
              element.style.opacity = '1';
            },
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="validations"
      ref={containerRef}
      className="w-full min-h-screen bg-background relative py-20 border-b border-white/10"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16">
          <span className="text-xs text-gray-500 uppercase tracking-widest block mb-4">
            04 / Validations
          </span>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            Certificates <br /> & Achievements
          </h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {GALLERY_IMAGES.map((image) => (
            <div
              key={image.id}
              className="gallery-item group relative overflow-hidden rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300 break-inside-avoid mb-4"
              style={{
                aspectRatio:
                  image.aspectRatio === 'landscape'
                    ? '16/9'
                    : image.aspectRatio === 'portrait'
                      ? '9/16'
                      : '1/1',
                transform: 'scale(0.8)',
                opacity: 0,
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-mono">{image.alt}</p>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
