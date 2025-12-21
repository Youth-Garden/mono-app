'use client';

import { keyBy } from 'lodash';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogPortal } from '../../components/ui/dialog';
import { cn } from '../../lib/utils';

export interface ImperativeModalProps<T = any> {
  isOpen: boolean;
  onDismiss: () => void;
  data: T;
}

export const toggleHtmlScrollable = (scrollable: boolean) => {
  if (typeof window === 'undefined') return;

  if (!scrollable) {
    const scrollTop = window.document.documentElement.scrollTop;
    window.document.body.setAttribute('data-scroll-locked', '1');
    window.document.body.style.pointerEvents = 'none';
    window.document.body.scrollTop = scrollTop;
  } else {
    const scrollTop = window.document.body.scrollTop;
    window.document.body.style.pointerEvents = 'revert';
    window.document.body.removeAttribute('data-scroll-locked');
    window.document.body.scrollTop = scrollTop;
  }
};

interface ContentRef {
  id: string;
  content: React.ReactElement<{
    isOpen: boolean;
  }>;
  disableCloseByBackdrop?: boolean;
}
interface IdRef {
  id: string;
  isOpen: boolean;
}

interface IDialogContext {
  onPresent: (
    id: string,
    Component: React.FC<any>,
    data?: any,
    disableCloseByBackdrop?: boolean
  ) => void;
  onDismiss: (id?: string) => void;
  closeModal: () => void;
  contentsRef: React.MutableRefObject<ContentRef[]>;
  contentId: string | undefined;
}

export const DialogContext = React.createContext<IDialogContext>({
  onPresent: () => {},
  onDismiss: () => {},
  closeModal: () => {},
  contentsRef: {
    current: [],
  },
  contentId: undefined,
});

const filterId = <T extends { id: string }>(arr: T[], id?: string): T[] => {
  return id
    ? arr.filter((item) => item.id !== id)
    : arr.slice(0, arr.length - 1);
};

const animationDuration = 100;

const OpenEffect: React.FC<
  React.PropsWithChildren<{ isOpen: boolean; onClose: () => void }>
> = ({ children, isOpen, onClose }) => {
  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        onClose();
      }, animationDuration);
    }
  }, [isOpen, onClose]);

  return children;
};

export const DialogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const contentsRef = React.useRef<ContentRef[]>([]);
  const idOpensRef = React.useRef<IdRef[]>([]);
  const isClosingRef = React.useRef(false);
  const [contentId, setContentId] = React.useState<string>();
  const [reload, setReload] = React.useState(false);

  const triggerReload = React.useCallback(() => setReload((prev) => !prev), []);

  const handleUpdateContent = React.useCallback(
    ({ contents, ids }: { contents: ContentRef[]; ids: IdRef[] }) => {
      idOpensRef.current = ids;
      contentsRef.current = contents;
      setContentId(contents?.[contents.length - 1]?.id || undefined);
      triggerReload();
    },
    [triggerReload]
  );

  const handleCloseAllModal = React.useCallback(() => {
    isClosingRef.current = true;
    handleUpdateContent({
      contents: [],
      ids: [],
    });
    isClosingRef.current = false;
  }, [handleUpdateContent]);

  const handleClearModal = React.useCallback(
    (id: string) => {
      const contents = filterId(contentsRef.current, id);
      if (contents.length === 0) {
        handleCloseAllModal();
        return;
      }

      handleUpdateContent({
        contents,
        ids: idOpensRef.current,
      });
    },
    [handleCloseAllModal, handleUpdateContent]
  );

  const handleDismiss = React.useCallback(
    (id?: string) => {
      const ids = filterId(idOpensRef.current, id);

      handleUpdateContent({
        contents: contentsRef.current,
        ids,
      });
    },
    [handleUpdateContent]
  );

  const handlePresent = React.useCallback(
    (
      id: string,
      Component: any,
      data?: any,
      disableCloseByBackdrop = false
    ) => {
      const present = () => {
        idOpensRef.current.push({
          id,
          isOpen: true,
        });

        contentsRef.current.push({
          id,
          disableCloseByBackdrop,
          content: React.isValidElement(Component) ? (
            React.cloneElement(Component, {
              // @ts-ignore
              data,
              key: id,
              isOpen: true,
              onDismiss: () => {
                handleDismiss(id);
              },
            } satisfies ImperativeModalProps & {
              key: string;
              data?: any;
              onDismiss: () => void;
              isOpen: boolean;
            })
          ) : (
            <Component
              data={data}
              key={id}
              isOpen={true}
              onDismiss={() => {
                handleDismiss(id);
              }}
            />
          ),
        });

        setContentId(id);
      };

      if (!isClosingRef.current) {
        present();
      } else {
        setTimeout(present, animationDuration + 1000);
      }
    },
    [handleDismiss, setContentId]
  );

  const value = React.useMemo(
    () => ({
      onPresent: handlePresent,
      onDismiss: handleDismiss,
      closeModal: handleCloseAllModal,
      contentsRef,
      contentId,
    }),

    [handlePresent, handleDismiss, handleCloseAllModal, contentId]
  );

  React.useEffect(() => {
    toggleHtmlScrollable(contentsRef.current.length === 0);
  }, [contentId, reload]);

  return (
    <DialogContext.Provider value={value}>
      {children}

      <Dialog open={contentsRef.current.length > 0}>
        <DialogPortal>
          {contentId === 'menu-drawer' && (
            <div
              className="fixed top-0 h-topbar w-full z-49"
              onClick={() => {
                handleDismiss();
              }}
            />
          )}

          <div
            id="dialog-backdrop"
            className={cn(
              'fixed w-screen h-(--screen-height) max-w-[100vw]! top-0 inset-0 z-49 bg-[rgba(0,0,0,.4)] backdrop-blur-sm',
              idOpensRef.current.length > 0
                ? 'animate-[enter_200ms] fade-in-0'
                : 'animate-[exit_100ms] hidden fade-out-0',
              contentId === 'menu-drawer' ? 'top-[62px]' : ''
            )}
            onClick={() => {
              handleDismiss();
            }}
          />
        </DialogPortal>
      </Dialog>

      {contentsRef.current.map((item) => {
        const refIds = keyBy(idOpensRef.current, 'id');
        const isOpen = !!refIds[item.id]?.isOpen;

        return (
          <OpenEffect
            key={`context-modal-${item.id}`}
            isOpen={isOpen}
            onClose={() => handleClearModal(item.id)}
          >
            {React.cloneElement(item.content, {
              isOpen,
            })}
          </OpenEffect>
        );
      })}
    </DialogContext.Provider>
  );
};

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
