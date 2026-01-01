# 🚀 Spectre Chat Server

NestJS backend API for Spectre Chat Widget - a real-time customer support chat solution.

## Tech Stack

- **Framework**: NestJS 11 + Fastify
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma 6
- **Auth**: JWT (Access + Refresh tokens)
- **Docs**: Swagger/OpenAPI

## Quick Start

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env
# Edit .env with your Supabase DATABASE_URL

# Generate Prisma client
pnpm prisma generate

# Push schema to database
pnpm prisma db push

# Start development server
pnpm dev
```

Server runs at `http://localhost:3001`  
Swagger docs at `http://localhost:3001/docs`

## Project Structure

```
src/
├── config/           # App configuration
│   └── app/          # Config factory + types
├── exceptions/       # Custom exceptions + error codes
├── filters/          # Exception filters (App, Prisma)
├── interceptors/     # Response interceptor
├── lib/              # Shared utilities
│   ├── constants/    # App constants, regex
│   ├── enums/        # StatusCodes, enums
│   └── utils/        # Env helpers
└── modules/
    ├── common/       # PrismaService, DTOs
    ├── messages/     # Chat messaging API
    └── projects/     # Project management
```

## API Endpoints

### Widget API (Public)

| Method | Endpoint                             | Description              |
| ------ | ------------------------------------ | ------------------------ |
| `POST` | `/api/v1/messages`                   | Send message from widget |
| `GET`  | `/api/v1/messages/conversations/:id` | Get conversation history |

### Admin API (Protected)

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| `POST` | `/api/v1/projects` | Create project    |
| `GET`  | `/api/v1/projects` | List all projects |

## Database Schema

```
User → Team → Project → Conversation → Message
         ↓
    TeamMember
```

- **User**: Dashboard users with auth
- **Team**: Organization that owns projects
- **Project**: Widget instance with API key
- **Conversation**: Chat session from visitor
- **Message**: Individual chat messages

## Environment Variables

```env
# Required
DATABASE_URL="postgresql://..."

# Optional (with defaults)
PORT=3001
NODE_ENV=development
JWT_SECRET="..."
JWT_EXPIRES_IN="15m"
```

See `.env.example` for full list.

## Scripts

```bash
pnpm dev          # Start with watch mode
pnpm build        # Build for production
pnpm start:prod   # Run production build
pnpm prisma:studio  # Open Prisma Studio
```

## License

MIT
