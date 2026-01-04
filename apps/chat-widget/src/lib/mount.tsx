import { render } from 'preact';
import { App } from '../App';
import styles from '../styles/style.css?inline';
import { setOpen } from '../store';

const WIDGET_ID = 'spectre-chat-host';

// Internal tracking
let activeEmbeddedHost: HTMLElement | null = null;

/**
 * Cleanup existing widget instance
 */
export function cleanupWidget() {
  // Clean Embedded Host Tracking
  if (activeEmbeddedHost) {
    if (activeEmbeddedHost.shadowRoot) {
      render(null, activeEmbeddedHost.shadowRoot);
      activeEmbeddedHost.shadowRoot.innerHTML = '';
    }
    activeEmbeddedHost = null;
  }

  // Aggressively remove any element with the widget ID (handle duplicates/ghosts)
  let existing;
  while ((existing = document.getElementById(WIDGET_ID))) {
    if (existing.shadowRoot) {
      render(null, existing.shadowRoot);
    }
    existing.remove();
  }
}

/**
 * Mount widget in floating mode
 */
export function mountFloating(containerSelector?: string | null) {
  let parent: HTMLElement = document.body;
  let isCustomContainer = false;

  if (containerSelector) {
    const el = document.querySelector(containerSelector) as HTMLElement;
    if (el) {
      parent = el;
      isCustomContainer = true;
      
      // Ensure parent has positioning context (User responsible, but we can verify)
      const computedStyle = getComputedStyle(parent);
      if (computedStyle.position === 'static') {
        // Warning removed for production polish, assuming user knows CSS
      }
    }
  }

  const container = document.createElement('div');
  container.id = WIDGET_ID;
  
  // Important: Absolute if inside relative container, Fixed if Global
  if (isCustomContainer) {
    container.style.cssText = 'position: absolute; z-index: 9999; bottom: 20px; right: 20px;';
  } else {
    container.style.cssText = 'position: fixed; z-index: 9999; bottom: 20px; right: 20px;';
  }
  
  parent.appendChild(container);

  const shadow = container.attachShadow({ mode: 'open' });
  injectStylesAndRender(shadow);
}

/**
 * Mount widget in embedded mode
 */
export function mountEmbedded(selector: string) {
  const targetEl = document.querySelector(selector) as HTMLElement;
  if (!targetEl) {
    console.error(`[Spectre] Container "${selector}" not found.`);
    return;
  }

  // Force host to be block and full size
  targetEl.style.display = 'block';
  targetEl.style.width = '100%';
  targetEl.style.height = '100%';

  let shadow = targetEl.shadowRoot;
  if (!shadow) {
    shadow = targetEl.attachShadow({ mode: 'open' });
  } else {
    // Reset for re-mount
    render(null, shadow);
    shadow.innerHTML = '';
  }

  activeEmbeddedHost = targetEl;
  injectStylesAndRender(shadow);

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
