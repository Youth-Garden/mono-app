import { clsx } from 'clsx';
import { MessageCircle, X } from 'lucide-preact';
import { isOpen, toggleChat } from '../store';

export function ChatBubble() {
  return (
    <button
      onClick={toggleChat}
      className={clsx(
        'chat-fixed chat-bottom-6 chat-right-6 chat-w-14 chat-h-14 chat-flex chat-items-center chat-justify-center chat-rounded-full chat-shadow-lg chat-z-50 chat-transition-all chat-duration-300 hover:chat-scale-105 active:chat-scale-95',
        // Use sharp corners normally, but full rounded for the bubble itself
        'chat-bg-widget-primary chat-text-black !chat-rounded-full'
      )}
    >
      {/* Subtle transition between open/close icons */}
      <div className="chat-relative chat-w-6 chat-h-6">
        <MessageCircle
          className={clsx(
            'chat-absolute chat-inset-0 chat-transition-all chat-duration-300',
            isOpen.value
              ? 'chat-opacity-0 chat-rotate-90 chat-scale-50'
              : 'chat-opacity-100 chat-rotate-0 chat-scale-100'
          )}
          size={24}
          strokeWidth={2.5}
        />
        <X
          className={clsx(
            'chat-absolute chat-inset-0 chat-transition-all chat-duration-300',
            isOpen.value
              ? 'chat-opacity-100 chat-rotate-0 chat-scale-100'
              : 'chat-opacity-0 -chat-rotate-90 chat-scale-50'
          )}
          size={24}
          strokeWidth={2.5}
        />
      </div>

      {/* Unread indicator bounce animation (optional) */}
      {!isOpen.value && (
        <span className="chat-absolute chat-top-0 chat-right-0 chat-w-3 chat-h-3 chat-bg-red-500 chat-rounded-full chat-animate-ping"></span>
      )}
    </button>
  );
}
