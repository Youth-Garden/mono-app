import { clsx } from 'clsx';
import { openImageModal } from './ui';

interface MessageImageGalleryProps {
  images: string[];
  maxVisible?: number;
}

/**
 * Smart image gallery for message attachments
 * - Shows max 6 images by default
 * - Last image shows "+X more" overlay when truncated
 * - Click any image to open lightbox
 */
export function MessageImageGallery({
  images,
  maxVisible = 6,
}: MessageImageGalleryProps) {
  if (images.length === 0) return null;

  const visibleImages = images.slice(0, maxVisible);
  const hiddenCount = images.length - maxVisible;
  const hasMore = hiddenCount > 0;

  const getGridClass = () => {
    const count = visibleImages.length;
    if (count === 1) return 'chat-grid-cols-1';
    if (count === 2) return 'chat-grid-cols-2';
    return 'chat-grid-cols-3';
  };

  const getImageClass = () => {
    const count = visibleImages.length;

    // Single image - larger
    if (count === 1) {
      return 'chat-w-full chat-h-48 chat-rounded-lg';
    }

    // 2 images - side by side
    if (count === 2) {
      return 'chat-w-full chat-h-28 chat-rounded-lg';
    }

    // 3+ images - grid
    return 'chat-w-full chat-h-20 chat-rounded-md';
  };

  return (
    <div className={clsx('chat-grid chat-gap-1 chat-mb-2', getGridClass())}>
      {visibleImages.map((src, i) => {
        const isLast = i === visibleImages.length - 1 && hasMore;

        return (
          <div key={i} className="chat-relative chat-overflow-hidden">
            <img
              src={src}
              alt={`Image ${i + 1}`}
              onClick={() => openImageModal(images, i)}
              className={clsx(
                'chat-object-cover chat-cursor-pointer hover:chat-opacity-90 chat-transition-opacity',
                getImageClass()
              )}
            />

            {/* "+X more" overlay */}
            {isLast && (
              <div
                onClick={() => openImageModal(images, i)}
                className="chat-absolute chat-inset-0 chat-bg-black/60 chat-flex chat-items-center chat-justify-center chat-cursor-pointer hover:chat-bg-black/70 chat-transition-colors chat-rounded-md"
              >
                <span className="chat-text-white chat-font-bold chat-text-lg">
                  +{hiddenCount}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
