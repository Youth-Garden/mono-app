import { clsx } from 'clsx';
import { X } from 'lucide-preact';
import { chatService } from '../../api';
import { isEmbedded, isOpen } from '../../store';
import { MessageBubbleFilledIcon } from '../icons';

export function ChatBubble() {
  if (isEmbedded.value) return null;

  return (
    <button
      onClick={() => chatService.toggleChat()}
      className={clsx(
        'chat-fixed chat-bottom-6 chat-right-6 chat-w-20 chat-h-20 chat-flex chat-items-center chat-justify-center chat-rounded-full chat-shadow-xl chat-shadow-blue-500/30 chat-z-50 chat-transition-all chat-duration-300 hover:chat-scale-105 active:chat-scale-95',
        'chat-bg-widget-primary chat-text-white'
      )}
    >
      {/* Animated icon transition */}
      <div className="chat-relative chat-w-10 chat-h-10 chat-flex chat-items-center chat-justify-center">
        <MessageBubbleFilledIcon
          className={clsx(
            'chat-absolute chat-inset-0 chat-transition-all chat-duration-300',
            isOpen.value
              ? 'chat-opacity-0 chat-rotate-90 chat-scale-50'
              : 'chat-opacity-100 chat-rotate-0 chat-scale-100'
          )}
          size={40}
        />

        <X
          className={clsx(
            'chat-absolute chat-inset-0 chat-transition-all chat-duration-300',
            isOpen.value
              ? 'chat-opacity-100 chat-rotate-0 chat-scale-100'
              : 'chat-opacity-0 -chat-rotate-90 chat-scale-50'
          )}
          size={40}
          strokeWidth={2.5}
        />
      </div>
    </button>
  );
}
