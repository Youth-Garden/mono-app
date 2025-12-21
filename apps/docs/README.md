# Documentation Site

The central documentation hub for the Scroll Trigger Mono project. This site hosts all technical guides, API references, and architecture overviews.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Documentation**: [Fumadocs](https://fumadocs.vercel.app/)
  - `fumadocs-core`: Core logic for content generation.
  - `fumadocs-ui`: Pre-built UI components for documentation.
  - `fumadocs-mdx`: MDX compiler and processor.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: MDX (Markdown + JSX)

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

To start the documentation development server:

```bash
pnpm dev --filter=docs
```

The site will be available at `http://localhost:3000`.

### Build

To build the static documentation site for production:

```bash
pnpm build --filter=docs
```

## Writing Documentation

1.  **Location**: All documentation content is located in `content/docs`.
2.  **Format**: Files should be written in MDX (`.mdx`).
3.  **Frontmatter**: Use standard frontmatter to define title, description, and ordering.

Example:

```mdx
---
title: Getting Started
description: How to install the package
---

# Getting Started

...
```
