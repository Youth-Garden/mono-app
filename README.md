# Mono App

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat-square&logo=turborepo&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=flat-square&logo=svelte&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![Preact](https://img.shields.io/badge/Preact-673AB8?style=flat-square&logo=preact&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

A comprehensive monorepo featuring a personal portfolio site, legacy portfolio archive, online code playground, real-time chat system, and shared workspace packages. Managed with Turborepo for optimal build caching and task orchestration.

## Project Structure

```
mono-app/
├── apps/
│   ├── portfolio/         # Main portfolio website (SvelteKit + Magic UI)
│   ├── portfolio-legacy/  # Legacy portfolio site (Next.js + GSAP)
│   ├── playground/        # Online code editor
│   ├── chat-server/       # Backend API for chat (NestJS + Prisma)
│   ├── chat-widget/       # Embeddable chat widget (Preact)
│   └── docs/              # Project documentation site (Fumadocs)
└── packages/
    ├── core/              # Shared API client
    ├── ui/                # UI component library
    ├── hooks/             # Reusable React hooks
    ├── utils/             # Shared utility functions
    ├── eslint-config/     # Shared ESLint configurations
    └── typescript-config/ # Base TypeScript configurations
```

## Apps

### Portfolio (`apps/portfolio`)

Main developer portfolio website. Built with SvelteKit, Vite, Tailwind CSS, and Magic UI components for high performance, smooth animations, and clean design.

### Legacy Portfolio (`apps/portfolio-legacy`)

Previous portfolio website featuring GSAP ScrollTrigger animations, 3D elements, and Next.js App Router.

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
- pnpm v10+

### Installation

```bash
pnpm install
```

### Development

```bash
# Start all apps
pnpm dev

# Start main portfolio (SvelteKit)
pnpm dev:portfolio

# Start legacy portfolio (Next.js)
pnpm dev:portfolio-legacy

# Start other apps
pnpm dev:docs
pnpm dev:chat
pnpm dev --filter=playground
pnpm dev --filter=chat-server

# Build all apps
pnpm build

# Typecheck all apps
pnpm check-types
```

## License

MIT
