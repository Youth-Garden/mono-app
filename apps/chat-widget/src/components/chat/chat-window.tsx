import { useSignal } from '@preact/signals';
import { Moon, Paperclip, Send, Smile, Sun, X } from 'lucide-preact';
import { useEffect, useRef } from 'preact/hooks';
import { chatService } from '../../api';
import { cn } from '../../lib';
import {
  branding,
  isEmbedded,
  isOpen,
  isTyping,
  messages,
  theme,
  toggleTheme,
} from '../../store';
import { Message } from '../../types';
import { EmojiPicker } from '../emoji-picker';
import { ChatBubbleIcon } from '../icons';
import { ImageGallery } from '../image-gallery';
import { OpenEffect } from '../open-effect';
import { Button } from '../ui';

export function ChatWindow() {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputValue = useSignal('');
  const showEmojiPicker = useSignal(false);
  const attachments = useSignal<{ file: File; preview: string }[]>([]);

  // Determine if window should be visible
  const isVisible = isEmbedded.value || isOpen.value;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.value, isTyping.value]);

  const handleSend = () => {
    if (!inputValue.value.trim() && attachments.value.length === 0) return;
    chatService.sendMessage(inputValue.value, attachments.value);
    inputValue.value = '';
    attachments.value = [];
    inputRef.current?.focus();
    showEmojiPicker.value = false;
  };

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (!files) return;

    const newAttachments = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    attachments.value = [...attachments.value, ...newAttachments];
    target.value = '';
  };

  const removeAttachment = (index: number) => {
    const current = attachments.value;
    URL.revokeObjectURL(current[index].preview);
    attachments.value = current.filter((_, i) => i !== index);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const onEmojiSelect = (emojiData: any) => {
    inputValue.value += emojiData.native;
  };

  const Wrapper = isEmbedded.value ? 'div' : OpenEffect;
  const wrapperProps = isEmbedded.value
    ? {
        className:
          'chat-w-full chat-h-full chat-flex chat-flex-col chat-rounded-[16px] chat-shadow-2xl chat-bg-widget-bg chat-overflow-hidden chat-border chat-border-widget-border',
      }
    : {
        className:
          'chat-absolute chat-bottom-24 chat-right-0 chat-w-[480px] chat-h-[750px] chat-max-h-[calc(100vh-140px)] chat-flex chat-flex-col chat-rounded-[16px] chat-shadow-2xl chat-bg-widget-bg chat-overflow-hidden chat-z-50 chat-border chat-border-widget-border',
      };

  if (!isVisible) return null;

  return (
    <Wrapper {...wrapperProps}>
      {/* Header */}
      <div className="chat-bg-widget-primary chat-p-6 chat-flex chat-items-center chat-justify-between chat-shadow-md">
        <div className="chat-flex chat-items-center chat-gap-3">
          {/* Avatar / Logo */}
          <div className="chat-relative">
            {branding.value.logo ? (
              <img
                src={branding.value.logo}
                alt="Logo"
                className="chat-w-12 chat-h-12 chat-rounded-full chat-object-cover chat-shadow-sm"
              />
            ) : (
              <div className="chat-w-12 chat-h-12 chat-bg-white chat-rounded-full chat-flex chat-items-center chat-justify-center chat-text-widget-primary chat-shadow-sm">
                <ChatBubbleIcon className="chat-text-widget-primary" />
              </div>
            )}
            <span className="chat-absolute chat-bottom-0 chat-right-0 chat-w-3.5 chat-h-3.5 chat-bg-emerald-500 chat-border-2 chat-border-widget-primary chat-rounded-full" />
          </div>

          <div>
            <h3 className="chat-font-bold chat-text-white chat-text-xl chat-leading-tight chat-tracking-tight">
              {branding.value.title}
            </h3>
            <span className="chat-text-white/80 chat-text-sm chat-font-medium">
              {branding.value.subtitle}
            </span>
          </div>
        </div>

        <div className="chat-flex chat-items-center chat-gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title="Toggle theme"
            className="!chat-text-white hover:chat-bg-widget-muted/20"
          >
            {theme.value === 'dark' ? <Moon size={22} /> : <Sun size={22} />}
          </Button>
          {/* Only show close button in floating mode */}
          {!isEmbedded.value && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => chatService.toggleChat()}
              className="!chat-text-white hover:chat-bg-widget-muted/20"
            >
              <X size={24} />
            </Button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="chat-flex-1 chat-overflow-y-auto chat-p-6 chat-space-y-6 chat-bg-widget-bg chat-custom-scrollbar">
        <div className="chat-flex chat-justify-center chat-mb-6">
          <span className="chat-text-xs chat-font-medium chat-text-widget-muted chat-bg-widget-card chat-px-3 chat-py-1 chat-rounded-full chat-border chat-border-widget-border">
            Today
          </span>
        </div>

        {messages.value.map((msg: Message) => (
          <div
            key={msg.id}
            className={cn(
              'chat-flex chat-w-full chat-animate-fade-in',
              msg.sender === 'user' ? 'chat-justify-end' : 'chat-justify-start'
            )}
          >
            <div
              className={cn(
                'chat-p-3.5 chat-text-base chat-font-normal chat-shadow-sm chat-max-w-[85%] chat-leading-relaxed',
                msg.sender === 'user'
                  ? 'chat-bg-widget-primary chat-text-white chat-rounded-[20px]'
                  : 'chat-bg-widget-card chat-text-widget-text chat-border chat-border-widget-border chat-rounded-[20px]'
              )}
            >
              {msg.attachments && msg.attachments.length > 0 && (
                <ImageGallery
                  images={msg.attachments.map((a) => a.preview)}
                  maxVisible={6}
                  size="md"
                />
              )}
              {msg.text && <span>{msg.text}</span>}
            </div>
          </div>
        ))}

        {isTyping.value && (
          <div className="chat-flex chat-justify-start chat-animate-fade-in">
            <div className="chat-bg-widget-card chat-border chat-border-widget-border chat-rounded-[20px] chat-p-4 chat-flex chat-items-center chat-gap-1.5 chat-shadow-sm">
              <span className="chat-w-1.5 chat-h-1.5 chat-bg-widget-primary chat-rounded-full chat-animate-bounce [animation-delay:-0.3s]" />
              <span className="chat-w-1.5 chat-h-1.5 chat-bg-widget-primary chat-rounded-full chat-animate-bounce [animation-delay:-0.15s]" />
              <span className="chat-w-1.5 chat-h-1.5 chat-bg-widget-primary chat-rounded-full chat-animate-bounce" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-p-4 chat-bg-widget-card chat-border-t chat-border-widget-border">
        {/* Attachment Preview */}
        {attachments.value.length > 0 && (
          <ImageGallery
            images={attachments.value.map((a) => a.preview)}
            maxVisible={14}
            size="sm"
            layout="flex"
            showRemoveButton
            onRemove={removeAttachment}
          />
        )}

        <div className="chat-flex chat-gap-2 chat-items-center">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="chat-hidden"
            onChange={handleFileChange}
          />

          {/* Attachment Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip size={20} />
          </Button>

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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => (showEmojiPicker.value = !showEmojiPicker.value)}
              className="hover:chat-text-yellow-500"
            >
              <Smile size={20} />
            </Button>
          </div>

          <Button
            onClick={handleSend}
            disabled={
              !inputValue.value.trim() && attachments.value.length === 0
            }
            size="icon"
            className="!chat-rounded-full chat-w-11 chat-h-11"
          >
            <Send size={18} />
          </Button>
        </div>

        {branding.value.showPoweredBy && (
          <div className="chat-text-center chat-mt-3">
            <span className="chat-text-xs chat-font-semibold chat-text-widget-muted hover:chat-text-widget-primary chat-transition-colors chat-cursor-pointer">
              Powered by {branding.value.poweredBy}
            </span>
          </div>
        )}
      </div>
    </Wrapper>
  );
}
