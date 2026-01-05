import { spectreAPI } from './lib';

function boot() {
  if (typeof window === 'undefined') return;

  // Prevent multiple initializations if already booted
  if (window.spectre) return;

  window.spectre = spectreAPI;

  const script =
    document.currentScript || document.querySelector('script[data-project-id]');

  if (script instanceof HTMLScriptElement) {
    let projectId = script.getAttribute('data-project-id');
    let apiUrl = script.getAttribute('data-api-url');
    let mode = script.getAttribute('data-mode') as
      | 'floating'
      | 'embedded'
      | null;
    let container = script.getAttribute('data-container');

    // Fallback to URL query params if no data attributes
    if (!projectId && script.src) {
      try {
        const url = new URL(script.src);
        projectId = url.searchParams.get('projectId');
        apiUrl = url.searchParams.get('apiUrl') || apiUrl;
        mode =
          (url.searchParams.get('mode') as 'floating' | 'embedded') || mode;
        container = url.searchParams.get('container') || container;
      } catch (e) {
        console.warn('[Spectre] Failed to parse script URL params:', e);
      }
    }

    if (projectId) {
      spectreAPI.init({
        projectId,
        apiUrl: apiUrl || undefined,
        mode: mode || 'floating',
        container: container || undefined,
      });
    }
  }
}

boot();
