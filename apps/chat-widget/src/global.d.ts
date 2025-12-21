import { SpectreAPI } from './types';

declare global {
  interface Window {
    spectre: SpectreAPI;
  }
}

export {};
