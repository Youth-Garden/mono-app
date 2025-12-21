# Chat Widget

An embeddable, lightweight chat widget built with Preact and Vite. Designed for high performance and easy integration into any website.

## Tech Stack

- **Framework**: [Preact](https://preactjs.com/) (Chosen for its 3kb size alternative to React)
- **Bundler**: [Vite](https://vitejs.dev/) (Fast HMR and optimized builds)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Configured with a custom prefix to prevent style conflicts when embedded)
- **Icons**: [Lucide Preact](https://lucide.dev/guide/packages/lucide-preact)
- **State Management**: [@preact/signals](https://preactjs.com/guide/v10/signals/) (Fine-grained reactivity)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager

### Installation

Navigate to the project root and install dependencies:

```bash
pnpm install
```

### Development

To start the development server specifically for the chat widget:

```bash
pnpm dev --filter=chat-widget
```

This will start the Vite dev server, typically at `http://localhost:5173`.

### Build

To build the widget for production distribution:

```bash
pnpm build --filter=chat-widget
```

The output will be in the `dist` folder.

## Integration

To embed this widget in another application, include the generated script file from the build output. The widget is designed to mount itself to a specific root element or append directly to the body depending on configuration.
