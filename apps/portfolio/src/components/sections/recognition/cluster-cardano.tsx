'use client';

import { GlassImage } from '@/components/common/glass-image';
import { GalleryImage } from '@/constants/gallery';
import { forwardRef } from 'react';

interface ClusterCardanoProps {
  images: GalleryImage[];
  onImageClick: (src: string) => void;
  className?: string; // Added to support props.className
}

export const ClusterCardano = forwardRef<HTMLDivElement, ClusterCardanoProps>(
  ({ images, onImageClick, className }, ref) => {
    // Destructure className
    return (
      <div
        ref={ref}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8 w-[60vw] md:w-[40vw] pointer-events-none [&_button]:pointer-events-[inherit] will-change-transform ${className || ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Column 1 */}
        <div className="flex flex-col gap-4 w-1/2">
          {images[0] && (
            <GlassImage
              src={images[0]!.src}
              ratio="portrait"
              onClick={() => onImageClick(images[0]!.src)}
            />
          )}
          {images[2] && (
            <GlassImage
              src={images[2]!.src}
              ratio="video"
              onClick={() => onImageClick(images[2]!.src)}
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
          {images[1] && (
            <GlassImage
              src={images[1]!.src}
              ratio="video"
              onClick={() => onImageClick(images[1]!.src)}
            />
          )}
          {images[3] && (
            <GlassImage
              src={images[3]!.src}
              ratio="square"
              onClick={() => onImageClick(images[3]!.src)}
            />
          )}
        </div>
      </div>
    );
  }
);

ClusterCardano.displayName = 'ClusterCardano';
