import { useSignal } from '@preact/signals';
import { clsx } from 'clsx';
import { Moon, Paperclip, Send, Smile, Sun, X } from 'lucide-preact';
import { useEffect, useRef } from 'preact/hooks';
import { chatService } from '../service';
import { isTyping, messages, theme, toggleTheme } from '../store';
import { Message } from '../types';
import { EmojiPicker } from './emoji-picker';
import { OpenEffect } from './open-effect';

export function ChatWindow() {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputValue = useSignal('');
  const showEmojiPicker = useSignal(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.value, isTyping.value]);

  const handleSend = () => {
    if (!inputValue.value.trim()) return;
    chatService.sendMessage(inputValue.value);
    inputValue.value = ''; // Clear input
    inputRef.current?.focus();
    showEmojiPicker.value = false; // Close picker on send
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const onEmojiSelect = (emojiData: any) => {
    inputValue.value += emojiData.native;
    // Optional: Keep picker open or close it
  };

  return (
    <OpenEffect className="chat-fixed chat-bottom-28 chat-right-6 chat-w-[480px] chat-h-[750px] chat-flex chat-flex-col chat-rounded-[16px] chat-shadow-2xl chat-bg-widget-bg chat-overflow-hidden chat-origin-bottom-right chat-z-50 chat-border chat-border-widget-border">
      {/* Header - Solid Brand Color */}
      <div className="chat-bg-widget-primary chat-p-6 chat-flex chat-items-center chat-justify-between chat-shadow-md">
        <div className="chat-flex chat-items-center chat-gap-3">
          {/* Avatar Area */}
          <div className="chat-relative">
            <div className="chat-w-12 chat-h-12 chat-bg-white chat-rounded-full chat-flex chat-items-center chat-justify-center chat-text-widget-primary chat-shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="chat-w-7 chat-h-7"
              >
                <path
                  fillRule="evenodd"
                  d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.678 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="chat-absolute chat-bottom-0 chat-right-0 chat-w-3.5 chat-h-3.5 chat-bg-emerald-500 chat-border-2 chat-border-widget-primary chat-rounded-full"></span>
          </div>

          <div>
            <h3 className="chat-font-bold chat-text-white chat-text-xl chat-leading-tight chat-tracking-tight">
              Chat with us!
            </h3>
            <span className="chat-text-indigo-100 chat-text-sm chat-font-medium">
              We reply immediately
            </span>
          </div>
        </div>

        <div className="chat-flex chat-items-center chat-gap-1">
          <button
            onClick={toggleTheme}
            className="chat-text-indigo-100 hover:chat-text-white chat-transition-colors chat-p-2 hover:chat-bg-white/10 chat-rounded-lg"
            title="Toggle theme"
          >
            {theme.value === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
          <button
            onClick={() => chatService.toggleChat(true)}
            className="chat-text-indigo-100 hover:chat-text-white chat-transition-colors chat-p-2 hover:chat-bg-white/10 chat-rounded-lg"
          >
            <X size={28} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="chat-flex-1 chat-overflow-y-auto chat-p-6 chat-space-y-6 chat-bg-widget-bg chat-custom-scrollbar">
        {/* Intro Message */}
        <div className="chat-flex chat-justify-center chat-mb-6">
          <span className="chat-text-xs chat-font-medium chat-text-widget-muted chat-bg-widget-card chat-px-3 chat-py-1 chat-rounded-full chat-border chat-border-widget-border">
            Today
          </span>
        </div>

        {messages.value.map((msg: Message) => (
          <div
            key={msg.id}
            className={clsx(
              'chat-flex chat-w-full chat-animate-fade-in',
              msg.sender === 'user' ? 'chat-justify-end' : 'chat-justify-start'
            )}
          >
            <div
              className={clsx(
                'chat-p-3.5 chat-text-base chat-font-normal chat-shadow-sm chat-max-w-[85%] chat-leading-relaxed',
                msg.sender === 'user'
                  ? 'chat-bg-widget-primary chat-text-white chat-rounded-[20px]'
                  : 'chat-bg-widget-card chat-text-widget-text chat-border chat-border-widget-border chat-rounded-[20px]'
              )}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {/* Typing Indicator */}
        {isTyping.value && (
          <div className="chat-flex chat-justify-start chat-animate-fade-in">
            <div className="chat-bg-widget-card chat-border chat-border-widget-border chat-rounded-[20px] chat-p-4 chat-flex chat-items-center chat-gap-1.5 chat-shadow-sm">
              <span className="chat-w-1.5 chat-h-1.5 chat-bg-widget-primary chat-rounded-full chat-animate-bounce [animation-delay:-0.3s]"></span>
              <span className="chat-w-1.5 chat-h-1.5 chat-bg-widget-primary chat-rounded-full chat-animate-bounce [animation-delay:-0.15s]"></span>
              <span className="chat-w-1.5 chat-h-1.5 chat-bg-widget-primary chat-rounded-full chat-animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-p-4 chat-bg-widget-card chat-border-t chat-border-widget-border">
        <div className="chat-flex chat-gap-2 chat-items-end">
          {/* Attachment Button */}
          <button className="chat-p-2 chat-text-widget-muted hover:chat-text-widget-primary chat-transition-colors chat-mb-1">
            <Paperclip size={20} />
          </button>

          <div className="chat-relative chat-flex-1 chat-bg-widget-bg chat-rounded-[20px] chat-p-1 chat-pl-4 chat-flex chat-items-center chat-gap-2 chat-border chat-border-transparent focus-within:chat-border-widget-primary/50 focus-within:chat-ring-2 focus-within:chat-ring-widget-primary/20 chat-transition-all">
            {showEmojiPicker.value && (
              <div className="chat-absolute chat-bottom-full chat-right-0 chat-mb-2 chat-shadow-2xl chat-rounded-xl chat-z-[60]">
                <EmojiPicker
                  onEmojiSelect={onEmojiSelect}
                  onClickOutside={() => (showEmojiPicker.value = false)}
                />
              </div>
            )}
            <input
              ref={inputRef}
              type="text"
              value={inputValue.value}
              onInput={(e) => (inputValue.value = e.currentTarget.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="chat-flex-1 chat-bg-transparent chat-text-base chat-font-medium chat-text-widget-text focus:chat-outline-none chat-py-2 placeholder:chat-text-widget-muted"
            />
            {/* Emoji Button inside Input */}
            <button
              onClick={() => (showEmojiPicker.value = !showEmojiPicker.value)}
              className="chat-p-2 chat-text-widget-muted hover:chat-text-yellow-500 chat-transition-colors"
            >
              <Smile size={20} />
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={!inputValue.value.trim()}
            className="chat-bg-widget-primary chat-text-white chat-p-3 chat-rounded-[16px] hover:chat-opacity-90 chat-transition-all disabled:chat-opacity-50 disabled:chat-cursor-not-allowed chat-shadow-lg chat-shadow-blue-500/20 chat-mb-0.5"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="chat-text-center chat-mt-3">
          <span className="chat-text-xs chat-font-semibold chat-text-widget-muted hover:chat-text-widget-primary chat-transition-colors">
            Powered by Spectre
          </span>
        </div>
      </div>
    </OpenEffect>
  );
}
