'use client';

import { UIProvider } from '@repo/ui';
import { PropsWithChildren } from 'react';
import { ReactQueryProvider } from './query-provider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <UIProvider>{children}</UIProvider>
    </ReactQueryProvider>
  );
}
