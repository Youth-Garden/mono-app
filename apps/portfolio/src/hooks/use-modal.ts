'use client';

import {
  DialogContext,
  ImperativeModalProps,
} from '@/components/providers/dialog-provider';
import * as React from 'react';

// Simple UUID generator since we don't have 'uuid' package
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function useModal<S>(
  Component: React.ComponentType<ImperativeModalProps<S>>,
  key?: string
): [
  (
    data?: S,
    disableCloseByBackdrop?: boolean
  ) => {
    waitingClose: () => Promise<any> | any;
  },
  () => void,
  boolean,
] {
  const { onDismiss, onPresent, contentsRef } = React.useContext(DialogContext);
  const [id, setId] = React.useState(key);

  const handlePresent = React.useCallback(
    (data?: S, disableCloseByBackdrop = false) => {
      const modalId = key || uuidv4();
      const ids = contentsRef.current.map((content) => content.id) || [];

      if (ids.find((item) => item === modalId))
        return {
          waitingClose: () => false,
        };

      setId(modalId);
      onPresent(modalId, Component, data || {}, disableCloseByBackdrop);

      return {
        waitingClose: !key
          ? () => true
          : async () => {
              await new Promise((resolve) => setTimeout(resolve, 200));
              return new Promise((resolve) => {
                const timer = setInterval(() => {
                  const _ids =
                    contentsRef.current.map((content) => content.id) || [];

                  if (!_ids.find((item) => item === key)) {
                    resolve(true);
                    clearInterval(timer);
                  }
                }, 200);
              });
            },
      };
    },
    [key, contentsRef, onPresent, Component]
  );

  const handleOnDimiss = React.useCallback(() => {
    if (id) onDismiss(id);
  }, [onDismiss, id]);

  const isOpen = !!contentsRef.current.find((content) => content.id === id);

  return [handlePresent, handleOnDimiss, isOpen];
}

export function useCloseAllModal() {
  const { closeModal } = React.useContext(DialogContext);
  return closeModal;
}

export function useCloseById() {
  const { onDismiss } = React.useContext(DialogContext);
  return React.useCallback((id: string) => onDismiss(id), [onDismiss]);
}
