import { clsx } from 'clsx';
import { MessageCircle, X } from 'lucide-preact';
import { chatService } from '../service';
import { isOpen } from '../store';

export function ChatBubble() {
  return (
    <button
      onClick={() => chatService.toggleChat(isOpen.value)}
      className={clsx(
        'chat-fixed chat-bottom-6 chat-right-6 chat-w-20 chat-h-20 chat-flex chat-items-center chat-justify-center chat-rounded-full chat-shadow-xl chat-shadow-blue-500/30 chat-z-50 chat-transition-all chat-duration-300 hover:chat-scale-105',
        'chat-bg-widget-primary chat-text-white'
      )}
    >
      {/* Subtle transition between open/close icons */}
      <div className="chat-relative chat-w-8 chat-h-8 chat-flex chat-items-center chat-justify-center">
        <MessageCircle
          className={clsx(
            'chat-absolute chat-inset-0 chat-transition-all chat-duration-300',
            isOpen.value
              ? 'chat-opacity-0 chat-rotate-90 chat-scale-50'
              : 'chat-opacity-100 chat-rotate-0 chat-scale-100'
          )}
          size={32}
          strokeWidth={2.5}
        />

        <X
          className={clsx(
            'chat-absolute chat-inset-0 chat-transition-all chat-duration-300',
            isOpen.value
              ? 'chat-opacity-100 chat-rotate-0 chat-scale-100'
              : 'chat-opacity-0 -chat-rotate-90 chat-scale-50'
          )}
          size={32}
          strokeWidth={2.5}
        />
      </div>
    </button>
  );
}
