# Scroll Trigger Mono

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat-square&logo=turborepo&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

A comprehensive monorepo for the Scroll Trigger project, featuring a high-performance portfolio site, an embeddable chat widget, and centralized documentation. Built with modern web technologies and managed with Turborepo.

## Technology Stack

- **Monorepo Management:** [Turborepo](https://turbo.build/repo)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Core Frameworks:**
  - [Next.js 16](https://nextjs.org/) (Web Application)
  - [Preact](https://preactjs.com/) (Chat Widget)
  - [GSAP](https://gsap.com/) (Animations)
  - [Tailwind CSS](https://tailwindcss.com/) (Styling)

## Project Structure

### Apps

- **`apps/portfolio`**: The main web application showcasing the portfolio. Built with Next.js 16 and heavily utilizes GSAP for scroll-triggered animations.
- **`apps/chat-widget`**: A lightweight, embeddable chat widget built with Preact and Vite. Designed to be performant and easy to integrate into other sites.
- **`apps/docs`**: The central documentation site for the project.

### Packages

- **`packages/ui`**: Shared UI component library to ensure design consistency across apps.
- **`packages/eslint-config`**: Shared ESLint configurations (includes `eslint-config-next` and `eslint-config-prettier`).
- **`packages/typescript-config`**: Shared `tsconfig.json` bases used throughout the monorepo.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

```bash
pnpm install
```

### Development

To start the development server for all apps:

```bash
pnpm dev
# or
turbo dev
```

To develop a specific app (e.g., portfolio):

```bash
pnpm dev --filter=web
```

### Build

To build all apps and packages:

```bash
pnpm build
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) (coming soon) and read our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License.
