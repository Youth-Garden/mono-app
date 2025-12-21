'use client';

import * as React from 'react';
import { DialogProvider } from './dialog-provider';

export function UIProvider({ children }: { children: React.ReactNode }) {
  return <DialogProvider>{children}</DialogProvider>;
}
