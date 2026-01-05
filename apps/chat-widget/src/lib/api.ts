import { setConfig, setOpen } from '../store';
import { SpectreAPI, SpectreConfig } from '../types';
import { cleanupWidget, eventBus, mountEmbedded, mountFloating } from './';

export const spectreAPI: SpectreAPI = {
  open: () => setOpen(true),
  close: () => setOpen(false),
  toggle: () => eventBus.emit('chat:toggle'),
  toggleTheme: () => eventBus.emit('chat:toggleTheme'),

  onOpen: (cb: () => void) => eventBus.on('chat:open', cb),
  onClose: (cb: () => void) => eventBus.on('chat:close', cb),
  onMessageSent: (cb: (data: import('../types').MessageEventData) => void) =>
    eventBus.on('message:sent', (data) => {
      if (data) cb(data);
    }),

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
