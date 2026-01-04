import { X } from 'lucide-preact';
import { cn } from '../lib';
import { openImageModal } from './ui';

interface ImageGalleryProps {
  /** Array of image URLs to display */
  images: string[];
  /** Max number of images to show before collapsing */
  maxVisible?: number;
  /** Show remove button on each image */
  showRemoveButton?: boolean;
  /** Callback when remove button is clicked */
  onRemove?: (index: number) => void;
  /** Image size preset */
  size?: 'sm' | 'md' | 'lg';
  /** Layout mode: 'grid' (responsive) or 'flex' (fixed thumbnails) */
  layout?: 'grid' | 'flex';
}

const sizeClasses = {
  // sm: Fixed 56px square for flex, or grid height
  sm: {
    image: 'chat-h-14 chat-w-14',
    single: 'chat-h-32 chat-w-32',
    gridImage: 'chat-h-14',
  },
  // md: Flexible width for grid
  md: { image: 'chat-h-20', single: 'chat-h-48', gridImage: 'chat-h-24' },
  // lg: Large variant
  lg: { image: 'chat-h-32', single: 'chat-h-64', gridImage: 'chat-h-32' },
};

/**
 * Reusable image gallery component
 * - Collapsible with "+X more" overlay
 * - Optional remove button
 * - Click to open lightbox
 */
export function ImageGallery({
  images,
  maxVisible = 6,
  showRemoveButton = false,
  onRemove,
  size = 'md',
  layout = 'grid',
}: ImageGalleryProps) {
  if (images.length === 0) return null;

  const visibleImages = images.slice(0, maxVisible);
  const hiddenCount = images.length - maxVisible;
  const hasMore = hiddenCount > 0;

  const getContainerClass = () => {
    if (layout === 'flex') {
      return 'chat-flex chat-flex-wrap chat-gap-2 chat-mb-2';
    }

    // Grid layout
    const count = visibleImages.length;
    if (count === 1) return 'chat-grid chat-grid-cols-1 chat-gap-1 chat-mb-2';
    if (count === 2) return 'chat-grid chat-grid-cols-2 chat-gap-1 chat-mb-2';
    return 'chat-grid chat-grid-cols-3 chat-gap-1 chat-mb-2';
  };

  const getImageClass = () => {
    const count = visibleImages.length;
    const sizeConfig = sizeClasses[size];

    if (layout === 'flex') {
      // Fixed aspect square for thumbnails
      return cn(
        'chat-object-cover chat-rounded-lg',
        sizeConfig.image // Fixed w & h
      );
    }

    // Grid mode
    if (count === 1) {
      return `chat-w-full ${sizeConfig.single} chat-rounded-lg`;
    }
    return `chat-w-full ${sizeConfig.gridImage} chat-rounded-md`;
  };

  return (
    <div className={getContainerClass()}>
      {visibleImages.map((src, i) => {
        const isLast = i === visibleImages.length - 1 && hasMore;

        return (
          <div
            key={i}
            className="chat-relative chat-overflow-hidden chat-group"
          >
            <img
              src={src}
              alt={`Image ${i + 1}`}
              onClick={() => openImageModal(images, i)}
              className={cn(
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

            {/* Remove button */}
            {showRemoveButton && onRemove && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(i);
                }}
                className="chat-absolute -chat-top-1 -chat-right-1 chat-bg-widget-bg chat-text-widget-text chat-rounded-full chat-w-4 chat-h-4 chat-flex chat-items-center chat-justify-center chat-opacity-0 group-hover:chat-opacity-100 chat-transition-all chat-shadow-md hover:chat-opacity-80 chat-border chat-border-widget-border"
              >
                <X size={10} strokeWidth={3} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
