'use client';

import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  DialogContext,
  ImperativeModalProps,
} from '../components/providers/dialog-provider';

export function useModal<S>(
  Component: React.FC<ImperativeModalProps<S>>,
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
      const id = key || uuidv4();
      const ids = contentsRef.current.map((content) => content.id) || [];

      if (ids.find((item) => item === id))
        return {
          waitingClose: () => false,
        };

      setId(id);
      onPresent(id, Component, data || {}, disableCloseByBackdrop);

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
    onDismiss(id);
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
