import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import clsx from 'clsx'; // Assuming clsx is used and needs to be imported
import { isOpen } from '../store';
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

  return (
    <OpenEffect
      className={clsx(
        'chat-absolute chat-bottom-full chat-right-0 chat-mb-4 chat-z-[60]',
        'chat-origin-bottom-right'
      )}
    >
      <Picker
        data={data}
        onEmojiSelect={onEmojiSelect}
        onClickOutside={onClickOutside}
        theme="auto"
        previewPosition="none"
        skinTonePosition="none"
      />
    </OpenEffect>
  );
}
