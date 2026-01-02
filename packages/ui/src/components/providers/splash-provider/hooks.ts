'use client';

import {
  useOptionalContext,
  useValidateContext,
  type OptionalContextResult,
} from '@repo/hooks';
import { SplashContext } from './provider';
import type { SplashContextValue } from './types';

export function useSplash(): SplashContextValue {
  return useValidateContext(SplashContext, 'SplashProvider', 'useSplash');
}

export function useSplashOptional(): OptionalContextResult<SplashContextValue> {
  return useOptionalContext(SplashContext);
}
