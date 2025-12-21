export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
