import { signal } from '@preact/signals';
import { ChevronLeft, ChevronRight, X } from 'lucide-preact';
import { useEffect } from 'preact/hooks';
import { cn } from '../../lib';

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
  // Local state for zoom and pan
  const scale = signal(1);
  const position = signal({ x: 0, y: 0 });
  const isDragging = signal(false);
  const dragStart = signal({ x: 0, y: 0 });

  // Reset zoom on open or image change
  useEffect(() => {
    if (state?.isOpen) {
      scale.value = 1;
      position.value = { x: 0, y: 0 };
    }
  }, [state?.isOpen, state?.currentIndex]);

  useEffect(() => {
    if (!state?.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeImageModal();
      // Only navigate if not zoomed in
      if (scale.value === 1) {
        if (e.key === 'ArrowLeft') navigatePrev();
        if (e.key === 'ArrowRight') navigateNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state?.isOpen, scale.value]);

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

  // Zoom handlers
  const handleWheel = (e: WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const delta = -e.deltaY * 0.001;
    const newScale = Math.min(Math.max(1, scale.value + delta), 4); // Min 1x, Max 4x

    scale.value = newScale;

    // Reset position if zoomed out to 1x
    if (newScale === 1) {
      position.value = { x: 0, y: 0 };
    }
  };

  // Pan handlers
  const handleMouseDown = (e: MouseEvent) => {
    if (scale.value > 1) {
      e.preventDefault();
      isDragging.value = true;
      dragStart.value = {
        x: e.clientX - position.value.x,
        y: e.clientY - position.value.y,
      };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.value && scale.value > 1) {
      e.preventDefault();
      position.value = {
        x: e.clientX - dragStart.value.x,
        y: e.clientY - dragStart.value.y,
      };
    }
  };

  const handleMouseUp = () => {
    isDragging.value = false;
  };

  return (
    <div
      className="chat-fixed chat-inset-0 chat-z-[100] chat-flex chat-items-center chat-justify-center chat-bg-black/90 chat-backdrop-blur-sm"
      onClick={closeImageModal}
      onWheel={handleWheel}
    >
      {/* Close button */}
      <button
        onClick={closeImageModal}
        className="chat-absolute chat-top-4 chat-right-4 chat-z-50 chat-p-2 chat-rounded-full chat-bg-white/10 hover:chat-bg-white/20 chat-text-white chat-transition-colors"
      >
        <X size={24} />
      </button>

      {/* Navigation - Previous */}
      {hasMultiple && scale.value === 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigatePrev();
          }}
          className="chat-absolute chat-left-4 chat-z-50 chat-p-3 chat-rounded-full chat-bg-white/10 hover:chat-bg-white/20 chat-text-white chat-transition-colors"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Image Container with Zoom/Pan */}
      <div
        className="chat-relative chat-overflow-hidden chat-flex chat-items-center chat-justify-center"
        style={{ width: '100vw', height: '100vh' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
      >
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className={cn(
            'chat-max-w-full chat-max-h-full chat-object-contain chat-transition-transform chat-duration-75',
            isDragging.value
              ? 'chat-cursor-grabbing'
              : scale.value > 1
                ? 'chat-cursor-grab'
                : 'chat-cursor-default'
          )}
          style={{
            transform: `scale(${scale.value}) translate(${position.value.x / scale.value}px, ${position.value.y / scale.value}px)`,
          }}
          draggable={false} // Prevent native drag
        />
      </div>

      {/* Navigation - Next */}
      {hasMultiple && scale.value === 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateNext();
          }}
          className="chat-absolute chat-right-4 chat-z-50 chat-p-3 chat-rounded-full chat-bg-white/10 hover:chat-bg-white/20 chat-text-white chat-transition-colors"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Indicators */}
      {hasMultiple && (
        <div className="chat-absolute chat-bottom-6 chat-z-50 chat-flex chat-gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                if (state) {
                  imageModalState.value = { ...state, currentIndex: idx };
                }
              }}
              className={cn(
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
        <div className="chat-absolute chat-top-4 chat-left-4 chat-z-50 chat-px-3 chat-py-1 chat-rounded-full chat-bg-black/50 chat-text-white chat-text-sm chat-font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
