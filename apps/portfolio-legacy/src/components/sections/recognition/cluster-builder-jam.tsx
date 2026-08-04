'use client';

import { GlassImage } from '@/components/common/glass-image';
import { GalleryImage } from '@/constants/gallery';
import { forwardRef, memo } from 'react';

interface ClusterBuilderJamProps {
  images: GalleryImage[];
  onImageClick: (src: string) => void;
}

export const ClusterBuilderJam = memo(
  forwardRef<HTMLDivElement, ClusterBuilderJamProps>(
    ({ images, onImageClick }, ref) => {
      return (
        <div
          ref={ref}
          className="absolute top-1/2 left-[15%] md:left-[20%] -translate-x-1/2 -translate-y-1/2 w-[40vw] md:w-[35vw] flex gap-4 pointer-events-none will-change-transform [&_button]:pointer-events-[inherit]"
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
            {images[0] && (
              <GlassImage
                src={images[0]!.src}
                ratio="video"
                onClick={() => onImageClick(images[0]!.src)}
              />
            )}
            {images[2] && (
              <GlassImage
                src={images[2]!.src}
                ratio="square"
                onClick={() => onImageClick(images[2]!.src)}
              />
            )}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 w-1/2">
            {images[1] && (
              <GlassImage
                src={images[1]!.src}
                ratio="square"
                onClick={() => onImageClick(images[1]!.src)}
              />
            )}
            {images[3] && (
              <GlassImage
                src={images[3]!.src}
                ratio="video"
                onClick={() => onImageClick(images[3]!.src)}
              />
            )}
            {images[4] && (
              <GlassImage
                src={images[4]!.src}
                ratio="video"
                onClick={() => onImageClick(images[4]!.src)}
              />
            )}
          </div>
        </div>
      );
    }
  )
);

ClusterBuilderJam.displayName = 'ClusterBuilderJam';
