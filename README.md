# Scroll Trigger Mono

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat-square&logo=turborepo&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![Preact](https://img.shields.io/badge/Preact-673AB8?style=flat-square&logo=preact&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

A comprehensive monorepo featuring a portfolio site, code playground, real-time chat system, and shared packages. Built with modern web technologies and managed with Turborepo for optimal build caching and task orchestration.

## Project Structure

```
scroll-trigger-mono/
├── apps/
│   ├── portfolio/      # Personal portfolio website
│   ├── playground/     # Online code editor
│   ├── chat-server/    # Backend API for chat
│   ├── chat-widget/    # Embeddable chat widget
│   └── docs/           # Documentation site
└── packages/
    ├── core/           # Shared API client
    ├── ui/             # UI component library
    ├── hooks/          # React hooks
    ├── utils/          # Utility functions
    ├── eslint-config/  # ESLint configs
    └── typescript-config/
```

## Apps

### Portfolio (`apps/portfolio`)

Personal portfolio website with scroll-triggered animations. Features smooth transitions, horizontal scrolling sections, and interactive 3D elements powered by GSAP ScrollTrigger.

### Playground (`apps/playground`)

Online code editor with multi-language support. Execute code in 50+ programming languages directly in the browser using the Piston API. Features Monaco Editor, syntax highlighting, and real-time output.

### Chat Server (`apps/chat-server`)

NestJS backend API for the chat system. Handles user authentication, project management, conversations, and message storage. Uses Prisma ORM with PostgreSQL.

### Chat Widget (`apps/chat-widget`)

Lightweight, embeddable customer support chat widget. Built with Preact for minimal bundle size (~15KB gzipped). Easy to integrate into any website with a simple script tag.

### Docs (`apps/docs`)

Project documentation site built with Fumadocs. Contains API references, component documentation, and usage guides.

## Packages

| Package                   | Description                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| `@repo/core`              | API client with plugin-based interceptor system for auth, logging, etc. |
| `@repo/ui`                | Shared UI components with Storybook for visual testing                  |
| `@repo/hooks`             | Reusable React hooks (useMediaQuery, useDebounce, etc.)                 |
| `@repo/utils`             | Common utility functions                                                |
| `@repo/eslint-config`     | Shared ESLint configurations                                            |
| `@repo/typescript-config` | Base TypeScript configurations                                          |

## Getting Started

### Prerequisites

- Node.js v18+
- pnpm v9+

### Installation

```bash
pnpm install
```

### Development

```bash
# Start all apps
pnpm dev

# Start specific app
pnpm dev --filter=portfolio
pnpm dev --filter=playground
pnpm dev --filter=chat-server

# Build all
pnpm build

# Lint
pnpm lint
```

### Environment Variables

Each app has its own `.env.example` file. Copy and configure:

```bash
cp apps/chat-server/.env.example apps/chat-server/.env
cp apps/playground/.env.example apps/playground/.env
```

## License

MIT
