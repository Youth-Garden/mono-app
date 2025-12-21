import { useSignal } from '@preact/signals';
import { clsx } from 'clsx';
import { Loader2, Send, X } from 'lucide-preact';
import { useEffect, useRef } from 'preact/hooks';
import { closeChat, isTyping, messages, sendMessage } from '../store';

export function ChatWindow() {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputValue = useSignal('');

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.value, isTyping.value]);

  const handleSend = () => {
    sendMessage(inputValue.value);
    inputValue.value = ''; // Clear input
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-fixed chat-bottom-24 chat-right-6 chat-w-[380px] chat-h-[500px] chat-flex chat-flex-col chat-border chat-border-widget-border chat-bg-widget-bg chat-shadow-2xl chat-glass-effect chat-overflow-hidden chat-animate-in chat-slide-in-from-bottom-10 chat-fade-in chat-duration-300 chat-origin-bottom-right chat-z-50">
      {/* Header */}
      <div className="chat-flex chat-items-center chat-justify-between chat-p-4 chat-border-b chat-border-widget-border chat-bg-widget-card/50">
        <div>
          <h3 className="chat-font-bold chat-text-widget-text chat-tracking-tight">
            Support Assistant
          </h3>
          <span className="chat-text-xs chat-text-green-500 chat-flex chat-items-center chat-gap-1">
            <span className="chat-w-1.5 chat-h-1.5 chat-bg-green-500 chat-rounded-full chat-animate-pulse"></span>{' '}
            Online
          </span>
        </div>
        <button
          onClick={closeChat}
          className="chat-text-widget-muted hover:chat-text-widget-text chat-transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="chat-flex-1 chat-overflow-y-auto chat-p-4 chat-space-y-4 chat-scrollbar-thin chat-scrollbar-thumb-widget-border chat-scrollbar-track-transparent">
        {messages.value.map((msg) => (
          <div
            key={msg.id}
            className={clsx(
              'chat-flex chat-w-full chat-animate-in chat-slide-in-from-bottom-2 chat-fade-in chat-duration-300',
              msg.sender === 'user' ? 'chat-justify-end' : 'chat-justify-start'
            )}
          >
            <div
              className={clsx(
                'chat-max-w-[80%] chat-p-3 chat-border chat-text-sm',
                msg.sender === 'user'
                  ? 'chat-bg-widget-primary chat-text-black chat-border-widget-primary' // User style (Sharp white block)
                  : 'chat-bg-widget-card chat-text-widget-text chat-border-widget-border' // Bot style (Dark block)
              )}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {/* Typing Indicator */}
        {isTyping.value && (
          <div className="chat-flex chat-justify-start chat-animate-in chat-fade-in">
            <div className="chat-bg-widget-card chat-border chat-border-widget-border chat-p-3 chat-flex chat-items-center chat-gap-2 chat-text-widget-muted chat-text-sm">
              <Loader2 className="chat-animate-spin" size={14} /> AI is
              typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-p-4 chat-border-t chat-border-widget-border chat-bg-widget-card/50 chat-flex chat-gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue.value}
          onInput={(e) => (inputValue.value = e.currentTarget.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="chat-flex-1 chat-bg-widget-bg chat-border chat-border-widget-border chat-p-2 chat-text-sm chat-text-widget-text focus:chat-outline-none focus:chat-border-widget-primary chat-transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.value.trim()}
          className="chat-bg-widget-primary chat-text-black chat-p-2 hover:chat-bg-white/90 chat-transition-colors disabled:chat-opacity-50 disabled:chat-cursor-not-allowed"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
