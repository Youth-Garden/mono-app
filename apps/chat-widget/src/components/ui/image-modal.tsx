import { signal } from '@preact/signals';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight, X } from 'lucide-preact';
import { useEffect } from 'preact/hooks';

// Global state for modal
export const imageModalState = signal<{
  isOpen: boolean;
  images: string[];
  currentIndex: number;
} | null>(null);

export function openImageModal(images: string[], index = 0) {
  imageModalState.value = { isOpen: true, images, currentIndex: index };
}

export function closeImageModal() {
  imageModalState.value = null;
}

export function ImageModal() {
  const state = imageModalState.value;

  useEffect(() => {
    if (!state?.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeImageModal();
      if (e.key === 'ArrowLeft') navigatePrev();
      if (e.key === 'ArrowRight') navigateNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state?.isOpen]);

  if (!state?.isOpen) return null;

  const { images, currentIndex } = state;
  const hasMultiple = images.length > 1;

  const navigatePrev = () => {
    if (!state) return;
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    imageModalState.value = { ...state, currentIndex: newIndex };
  };

  const navigateNext = () => {
    if (!state) return;
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    imageModalState.value = { ...state, currentIndex: newIndex };
  };

  return (
    <div
      className="chat-fixed chat-inset-0 chat-z-[100] chat-flex chat-items-center chat-justify-center chat-bg-black/90 chat-backdrop-blur-sm"
      onClick={closeImageModal}
    >
      {/* Close button */}
      <button
        onClick={closeImageModal}
        className="chat-absolute chat-top-4 chat-right-4 chat-p-2 chat-rounded-full chat-bg-white/10 hover:chat-bg-white/20 chat-text-white chat-transition-colors"
      >
        <X size={24} />
      </button>

      {/* Navigation - Previous */}
      {hasMultiple && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigatePrev();
          }}
          className="chat-absolute chat-left-4 chat-p-3 chat-rounded-full chat-bg-white/10 hover:chat-bg-white/20 chat-text-white chat-transition-colors"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="chat-max-w-[90vw] chat-max-h-[85vh] chat-object-contain chat-rounded-lg chat-shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Navigation - Next */}
      {hasMultiple && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateNext();
          }}
          className="chat-absolute chat-right-4 chat-p-3 chat-rounded-full chat-bg-white/10 hover:chat-bg-white/20 chat-text-white chat-transition-colors"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Indicators */}
      {hasMultiple && (
        <div className="chat-absolute chat-bottom-6 chat-flex chat-gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                if (state) {
                  imageModalState.value = { ...state, currentIndex: idx };
                }
              }}
              className={clsx(
                'chat-w-2.5 chat-h-2.5 chat-rounded-full chat-transition-all',
                idx === currentIndex
                  ? 'chat-bg-white chat-scale-110'
                  : 'chat-bg-white/40 hover:chat-bg-white/60'
              )}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {hasMultiple && (
        <div className="chat-absolute chat-top-4 chat-left-4 chat-px-3 chat-py-1 chat-rounded-full chat-bg-black/50 chat-text-white chat-text-sm chat-font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
