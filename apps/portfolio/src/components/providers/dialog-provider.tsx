'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { createPortal } from 'react-dom';

// --- Types ---
export interface ImperativeModalProps<T = any> {
  isOpen: boolean;
  onDismiss: () => void;
  data: T;
}

interface ContentRef {
  id: string;
  content: React.ReactElement<{ isOpen: boolean }>;
  disableCloseByBackdrop?: boolean;
}

interface IdRef {
  id: string;
  isOpen: boolean;
}

interface IDialogContext {
  onPresent: (
    id: string,
    Component: React.ComponentType<any>,
    data?: any,
    disableCloseByBackdrop?: boolean
  ) => void;
  onDismiss: (id?: string) => void;
  closeModal: () => void;
  contentsRef: React.MutableRefObject<ContentRef[]>;
  contentId: string | undefined;
}

// --- Utils (Replacing lodash/uuid/etc) ---
const toggleHtmlScrollable = (scrollable: boolean) => {
  if (typeof window === 'undefined') return;
  if (!scrollable) {
    const scrollTop = window.document.documentElement.scrollTop;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px'; // Prevent layout shift from scrollbar
    document.body.setAttribute('data-scroll-locked', '1');
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.body.removeAttribute('data-scroll-locked');
  }
};

const filterId = <T extends { id: string }>(arr: T[], id?: string): T[] => {
  return id
    ? arr.filter((item) => item.id !== id)
    : arr.slice(0, arr.length - 1);
};

// --- Context ---
export const DialogContext = React.createContext<IDialogContext>({
  onPresent: () => {},
  onDismiss: () => {},
  closeModal: () => {},
  contentsRef: { current: [] },
  contentId: undefined,
});

// --- Components ---

// Wrapper to handle mounting/unmounting delay for animations
const OpenEffect: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ children, isOpen, onClose }) => {
  React.useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 500); // 0.5s to match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return <>{children}</>;
};

export const DialogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const contentsRef = React.useRef<ContentRef[]>([]);
  const idOpensRef = React.useRef<IdRef[]>([]);
  const isClosingRef = React.useRef(false);
  const [contentId, setContentId] = React.useState<string>();
  const [reload, setReload] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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
    handleUpdateContent({ contents: [], ids: [] });
    isClosingRef.current = false;
  }, [handleUpdateContent]);

  const handleClearModal = React.useCallback(
    (id: string) => {
      const contents = filterId(contentsRef.current, id);
      if (contents.length === 0) {
        handleCloseAllModal();
        return;
      }
      handleUpdateContent({ contents, ids: idOpensRef.current });
    },
    [handleCloseAllModal, handleUpdateContent]
  );

  const handleDismiss = React.useCallback(
    (id?: string) => {
      const ids = filterId(idOpensRef.current, id);
      handleUpdateContent({ contents: contentsRef.current, ids });
    },
    [handleUpdateContent]
  );

  const handlePresent = React.useCallback(
    (
      id: string,
      Component: React.ComponentType<any>,
      data?: any,
      disableCloseByBackdrop = false
    ) => {
      const present = () => {
        idOpensRef.current.push({ id, isOpen: true });
        contentsRef.current.push({
          id,
          disableCloseByBackdrop,
          content: (
            <Component
              data={data}
              key={id}
              isOpen={true} // Controlled by parent map below
              onDismiss={() => handleDismiss(id)}
            />
          ),
        });
        setContentId(id);
      };

      if (!isClosingRef.current) {
        present();
      } else {
        setTimeout(present, 200);
      }
    },
    [handleDismiss]
  );

  React.useEffect(() => {
    toggleHtmlScrollable(contentsRef.current.length === 0);
  }, [contentId, reload]);

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

  // --- Portal Rendering ---
  const portalContent =
    mounted && contentsRef.current.length > 0
      ? createPortal(
          <div className="fixed inset-0 z-100 flex items-center justify-center pointer-events-none">
            {/* Shared Backdrop */}
            {/* Using a separate state for backdrop logic could be complex, 
          so we let the LAST modal determine if backdrop is "active" or not visually?
          Actually, standard pattern is: if ANY modal is open, Backdrop is shown. 
      */}
            <div
              className={cn(
                'absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300 pointer-events-auto',
                // Check if ANY modal is effectively open (in idOpensRef)
                idOpensRef.current.length > 0 ? 'opacity-100' : 'opacity-0'
              )}
              onClick={() => {
                // Find top modal
                const topModal =
                  contentsRef.current[contentsRef.current.length - 1];
                if (topModal && !topModal.disableCloseByBackdrop) {
                  handleDismiss(topModal.id);
                }
              }}
            />

            {/* Render Modals */}
            {contentsRef.current.map((item) => {
              const refEntry = idOpensRef.current.find((r) => r.id === item.id);
              const isOpen = !!refEntry;

              return (
                <OpenEffect
                  key={`context-modal-${item.id}`}
                  isOpen={isOpen}
                  onClose={() => handleClearModal(item.id)}
                >
                  <div className="relative z-[20001] pointer-events-none [&>*]:pointer-events-auto flex items-center justify-center w-full h-full">
                    {React.cloneElement(item.content, { isOpen })}
                  </div>
                </OpenEffect>
              );
            })}
          </div>,
          document.body
        )
      : null;

  return (
    <DialogContext.Provider value={value}>
      {children}
      {portalContent}
    </DialogContext.Provider>
  );
};
