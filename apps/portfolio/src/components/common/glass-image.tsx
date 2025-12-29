'use client';

import Image from 'next/image';

interface GlassImageProps {
  src: any;
  ratio: 'square' | 'video' | 'portrait';
  onClick: () => void;
}

export function GlassImage({ src, ratio, onClick }: GlassImageProps) {
  const aspect = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  }[ratio];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative ${aspect} w-full overflow-hidden border border-white/10 bg-white/10 group cursor-zoom-in pointer-events-[inherit] transition-transform duration-300 hover:scale-[1.02] active:scale-95 focus:outline-none will-change-transform`}
    >
      <Image
        src={src}
        alt="Gallery Image"
        fill
        sizes="(max-width: 768px) 50vw, 35vw"
        priority
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
    </button>
  );
}
