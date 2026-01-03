import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import clsx from 'clsx';
import { isOpen, theme } from '../store';
import { OpenEffect } from './open-effect';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: any) => void;
  onClickOutside?: () => void;
}

export function EmojiPicker({
  onEmojiSelect,
  onClickOutside,
}: EmojiPickerProps) {
  if (!isOpen.value) return null;

  // Stop propagation to prevent closing when clicking inside
  const handlePickerClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <OpenEffect
      className={clsx(
        'chat-absolute chat-bottom-full chat-right-0 chat-mb-4 chat-z-[60]'
      )}
    >
      <div onClick={handlePickerClick} onMouseDown={handlePickerClick}>
        <Picker
          data={data}
          onEmojiSelect={onEmojiSelect}
          onClickOutside={onClickOutside}
          theme={theme.value}
          previewPosition="none"
          skinTonePosition="none"
        />
      </div>
    </OpenEffect>
  );
}
