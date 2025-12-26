'use client';

import { ImperativeModalProps } from '@/components/providers/dialog-provider';
import Image from 'next/image';
import { Modal } from './modal';

export function ImageModal({
  data,
  isOpen,
  onDismiss,
}: ImperativeModalProps<{ src: any }>) {
  if (!data?.src) return null;

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <div className="relative w-[90vw] h-[90vh] md:w-[80vw] md:h-[80vh]">
        <Image
          src={data.src}
          alt="Full Screen"
          fill
          className="object-contain"
          priority
          quality={100}
        />
      </div>
    </Modal>
  );
}
