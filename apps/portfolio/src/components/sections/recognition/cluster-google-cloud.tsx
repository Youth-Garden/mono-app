'use client';

import { GlassImage } from '@/components/common/glass-image';
import { GalleryImage } from '@/constants/gallery';
import { forwardRef } from 'react';

interface ClusterGoogleCloudProps {
  images: GalleryImage[];
  onImageClick: (src: string) => void;
}

export const ClusterGoogleCloud = forwardRef<
  HTMLDivElement,
  ClusterGoogleCloudProps
>(({ images, onImageClick }, ref) => {
  return (
    <div
      ref={ref}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-8 w-[50vw] md:w-[30vw] pointer-events-none [&_button]:pointer-events-[inherit] ${''}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="text-center mb-4">
        <span className="inline-block px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-xs font-mono mb-2 rounded">
          CERTIFICATION
        </span>
        <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
          Google Cloud
        </h3>
      </div>
      {images[0] && (
        <GlassImage
          src={images[0]!.src}
          ratio="video"
          onClick={() => onImageClick(images[0]!.src)}
        />
      )}
    </div>
  );
});

ClusterGoogleCloud.displayName = 'ClusterGoogleCloud';
