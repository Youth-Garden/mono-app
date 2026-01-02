'use client';

import { useContext, type Context } from 'react';

export function useValidateContext<T>(
  context: Context<T | null>,
  providerName: string,
  hookName?: string
): T {
  const value = useContext(context);

  if (value === null || value === undefined) {
    const hook = hookName ?? `use${providerName.replace('Provider', '')}`;
    throw new Error(`${hook} must be used within a ${providerName}.`);
  }

  return value;
}

export interface OptionalContextResult<T> {
  value: T | null;
  hasContext: boolean;
}

export function useOptionalContext<T>(
  context: Context<T | null>
): OptionalContextResult<T> {
  const value = useContext(context);
  return {
    value,
    hasContext: value !== null && value !== undefined,
  };
}
