# 💬 Spectre Chat Widget

Embeddable chat widget for websites. Lightweight, customizable, and easy to integrate.

## Features

- 🎨 Modern UI with smooth animations
- ⚡ Lightweight (~50KB gzipped)
- 🔧 Runtime configuration via data attributes
- 📱 Mobile responsive
- 🌙 Dark mode ready

## Quick Start

### 1. Embed in your website

```html
<script
  src="https://your-cdn.com/spectre-widget.js"
  data-project-id="YOUR_PROJECT_ID"
  data-api-url="https://your-api.com/api/v1"
></script>
```

### 2. Or initialize programmatically

```html
<script src="https://your-cdn.com/spectre-widget.js"></script>
<script>
  SpectreChat.init({
    projectId: 'YOUR_PROJECT_ID',
    apiUrl: 'https://your-api.com/api/v1',
  });
</script>
```

## Configuration Options

| Attribute         | Type   | Required | Description                        |
| ----------------- | ------ | -------- | ---------------------------------- |
| `data-project-id` | string | ✅       | Your project ID from dashboard     |
| `data-api-url`    | string | ❌       | API base URL (default: production) |

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## Tech Stack

- **Framework**: Preact (lightweight React alternative)
- **Styling**: Tailwind CSS
- **State**: Preact Signals
- **Build**: Rsbuild

## Project Structure

```
src/
├── components/       # UI components
│   ├── ChatWidget.tsx
│   ├── ChatWindow.tsx
│   └── MessageBubble.tsx
├── configs/          # Configuration
│   ├── app-config.ts # Runtime config singleton
│   └── event-bus.ts  # Event emitter
├── store.ts          # State management
└── index.tsx         # Entry point + auto-init
```

## Build Output

Single-file UMD bundle for CDN deployment:

- `dist/spectre-widget.js` - Main bundle
- `dist/spectre-widget.css` - Styles (inlined)

## API Integration

Widget communicates with chat-server via REST:

```
POST /api/v1/messages
Headers: { "x-project-id": "YOUR_PROJECT_ID" }
Body: { "content": "Hello!", "visitorId": "abc123" }
```

## License

MIT
