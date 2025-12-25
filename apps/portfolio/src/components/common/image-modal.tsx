'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ImageModalProps {
  src: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({ src, isOpen, onClose }: ImageModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300"
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
