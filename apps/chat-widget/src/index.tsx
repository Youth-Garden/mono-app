import { render } from 'preact';
import { App } from './App';
import { appConfig } from './configs/app-config';
import eventBus from './configs/event-bus';
import styles from './style.css?inline';
import { SpectreAPI } from './types';

const WIDGET_ID = 'spectre-chat-host';

const spectreAPI: SpectreAPI = {
  open: () => eventBus.emit('chat:open'),
  close: () => eventBus.emit('chat:close'),
  toggle: () => eventBus.emit('chat:toggle'),
  toggleTheme: () => eventBus.emit('chat:toggleTheme'),

  onOpen: (cb: () => void) => eventBus.on('chat:open', cb),
  onClose: (cb: () => void) => eventBus.on('chat:close', cb),
  onMessageSent: (cb: (data: any) => void) => eventBus.on('message:sent', cb),

  init: (config: any) => {
    appConfig.init({
      projectId: config.projectId,
      apiUrl: config.apiUrl,
    });
    eventBus.emit('config:updated', config);
    mountWidget();
  },
};

window.spectre = spectreAPI;

function mountWidget() {
  if (document.getElementById(WIDGET_ID)) return;
  const container = document.createElement('div');
  container.id = WIDGET_ID;
  container.style.position = 'fixed';
  container.style.zIndex = '9999';
  container.style.bottom = '0';
  container.style.right = '0';
  document.body.appendChild(container);

  const shadow = container.attachShadow({ mode: 'open' });
  const styleTag = document.createElement('style');
  styleTag.textContent = styles;
  shadow.appendChild(styleTag);

  render(<App />, shadow);
}

function autoInit() {
  const script =
    document.currentScript || document.querySelector('script[data-project-id]');

  if (script instanceof HTMLElement) {
    const projectId = script.getAttribute('data-project-id');
    const apiUrl = script.getAttribute('data-api-url');

    if (projectId) {
      console.info('[Spectre] Found embed configuration. Initializing...');
      spectreAPI.init({
        projectId,
        apiUrl: apiUrl || undefined,
      });
    }
  }
}

autoInit();
