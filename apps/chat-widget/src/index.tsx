import { render } from 'preact';
import { App } from './App';
import { eventBus } from './lib';
import { setConfig, setOpen } from './store';
import styles from './styles/style.css?inline';
import { SpectreAPI, SpectreConfig } from './types';

const WIDGET_ID = 'spectre-chat-host';

const spectreAPI: SpectreAPI = {
  open: () => setOpen(true),
  close: () => setOpen(false),
  toggle: () => eventBus.emit('chat:toggle'),
  toggleTheme: () => eventBus.emit('chat:toggleTheme'),

  onOpen: (cb: () => void) => eventBus.on('chat:open', cb),
  onClose: (cb: () => void) => eventBus.on('chat:close', cb),
  onMessageSent: (cb: (data: any) => void) => eventBus.on('message:sent', cb),

  init: (config: SpectreConfig) => {
    // Set widget configuration
    setConfig(config);

    // Mount widget based on mode
    if (config.mode === 'embedded' && config.container) {
      mountEmbedded(config.container);
    } else {
      mountFloating();
    }
  },
};

window.spectre = spectreAPI;

/**
 * Mount widget in floating mode (fixed position)
 */
function mountFloating() {
  if (document.getElementById(WIDGET_ID)) return;

  const container = document.createElement('div');
  container.id = WIDGET_ID;
  container.style.cssText = 'position:fixed;z-index:9999;bottom:0;right:0;';
  document.body.appendChild(container);

  const shadow = container.attachShadow({ mode: 'open' });
  injectStylesAndRender(shadow);
}

/**
 * Mount widget in embedded mode (into existing container)
 */
function mountEmbedded(selector: string) {
  const targetEl = document.querySelector(selector);
  if (!targetEl) {
    console.error(`[Spectre] Container "${selector}" not found.`);
    return;
  }

  // Create a shadow root inside the target element
  const shadow = targetEl.attachShadow({ mode: 'open' });
  injectStylesAndRender(shadow);

  // In embedded mode, auto-open the chat
  setOpen(true);
}

/**
 * Inject styles and render the app into shadow root
 */
function injectStylesAndRender(shadow: ShadowRoot) {
  const styleTag = document.createElement('style');
  styleTag.textContent = styles;
  shadow.appendChild(styleTag);

  render(<App />, shadow);
}

/**
 * Auto-init from script attributes or URL query params
 * Supports:
 * - data-* attributes: <script data-project-id="xxx">
 * - URL query params: <script src="widget.js?projectId=xxx">
 */
function autoInit() {
  const script =
    document.currentScript || document.querySelector('script[data-project-id]');

  if (script instanceof HTMLScriptElement) {
    // Try data attributes first
    let projectId = script.getAttribute('data-project-id');
    let apiUrl = script.getAttribute('data-api-url');
    let mode = script.getAttribute('data-mode') as
      | 'floating'
      | 'embedded'
      | null;
    let container = script.getAttribute('data-container');

    // Fallback to URL query params if no data attributes
    if (!projectId && script.src) {
      const url = new URL(script.src);
      projectId = url.searchParams.get('projectId');
      apiUrl = url.searchParams.get('apiUrl') || apiUrl;
      mode = (url.searchParams.get('mode') as 'floating' | 'embedded') || mode;
      container = url.searchParams.get('container') || container;
    }

    if (projectId) {
      console.info('[Spectre] Found embed configuration. Initializing...');
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
