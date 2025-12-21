import { useCallback, useSyncExternalStore } from 'react';

import { BREAKPOINTS } from '../constants/breakpoints';

/**
 * Custom hook for media queries
 * @param query - CSS media query string
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener('change', callback);
      return () => {
        matchMedia.removeEventListener('change', callback);
      };
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    return false;
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Hook to check if viewport is desktop (≥1024px)
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.tablet}px)`);
}

/**
 * Hook to check if viewport is tablet (640px - 1023px)
 */
export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${
      BREAKPOINTS.tablet - 1
    }px)`
  );
}

/**
 * Hook to check if viewport is mobile (<640px)
 */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.mobile - 1}px)`);
}

/**
 * Hook to get current breakpoint name
 */
export function useBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();

  if (isDesktop) return 'desktop';
  if (isTablet) return 'tablet';
  return 'mobile';
}
