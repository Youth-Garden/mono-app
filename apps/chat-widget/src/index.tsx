import { cleanupWidget, eventBus, mountEmbedded, mountFloating } from './lib';
import { setConfig, setOpen } from './store';
import { SpectreAPI, SpectreConfig } from './types';

const spectreAPI: SpectreAPI = {
  open: () => setOpen(true),
  close: () => setOpen(false),
  toggle: () => eventBus.emit('chat:toggle'),
  toggleTheme: () => eventBus.emit('chat:toggleTheme'),

  onOpen: (cb: () => void) => eventBus.on('chat:open', cb),
  onClose: (cb: () => void) => eventBus.on('chat:close', cb),
  onMessageSent: (cb: (data: any) => void) => eventBus.on('message:sent', cb),

  init: (config: SpectreConfig) => {
    cleanupWidget();

    setConfig(config);

    if (config.mode === 'embedded' && config.container) {
      mountEmbedded(config.container);
    } else {
      mountFloating(config.container);
    }
  },
};

window.spectre = spectreAPI;

/**
 * Auto-init from script attributes or URL query params
 */
function autoInit() {
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
        // Ignore URL parse errors
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

autoInit();
