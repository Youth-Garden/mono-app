# Portfolio Web App

The main visual showcase application for the Scroll Trigger project. This application serves as the primary landing page and portfolio, featuring high-performance animations and a modern design system.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Animations**: [GSAP](https://gsap.com/) (GreenSock Animation Platform)
  - `ScrollTrigger`: For scroll-based animation sequencing.
  - `Flip`: For seamless layout transitions.
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) (Premium interaction feel)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Shared UI**: Consumes components from the internal `@repo/ui` package.

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

To start the development server for the portfolio application:

```bash
pnpm dev --filter=web
```

The application will be available at `http://localhost:3000`.

### Build

To build the application for production:

```bash
pnpm build --filter=web
```

## Features

### Scroll-Triggered Animations

We utilize GSAP ScrollTrigger to orchestrate complex animations as the user scrolls. These are encapsulated in custom hooks or components to ensure performance and clean code separation.

### Smooth Scrolling

Lenis is implemented to normalize scrolling behavior across different devices and input methods, providing a consistent "app-like" feel.

### Optimized Assets

Next.js Image component and optimized font loading are used to ensure low Cumulative Layout Shift (CLS) and fast First Contentful Paint (FCP).
