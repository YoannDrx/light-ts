# LightS

Modern Next.js boilerplate for building SaaS applications.

## Quick Start

### 1. Clone the boilerplate

```bash
git clone https://github.com/YoannDrx/lights.git my-new-saas
cd my-new-saas
pnpm install
```

### 2. Initialize your project

```bash
pnpm init-project
```

This interactive script will:
- Configure your project name and details
- Rename all template files
- Clean up example content
- Reinitialize Git with a fresh commit
- Create Stripe products (optional)
- Configure cloud services (DB, Redis, Vercel)

### 3. Start developing

```bash
pnpm dev
```

## What's Included

- **Authentication** - GitHub, Google, Magic Links (Better Auth)
- **Payments** - Stripe Subscriptions (Free, Pro, Ultra plans)
- **Database** - PostgreSQL with Prisma ORM
- **Emails** - Transactional emails with React Email + Resend
- **Admin Dashboard** - User management, feedback, stats
- **Internationalization** - EN/FR out of the box
- **Testing** - Vitest (unit) + Playwright (E2E)

## Commands

| Command | Description |
|---------|-------------|
| `pnpm init-project` | Initialize a new project (first time only) |
| `pnpm setup` | Configure cloud services |
| `pnpm dev` | Start development server |
| `pnpm doctor` | Check project health |
| `pnpm build` | Build for production |
| `pnpm test:ci` | Run unit tests |
| `pnpm test:e2e:ci` | Run E2E tests |
| `pnpm clean` | Lint + TypeCheck + Format |

## Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 with App Router |
| **Language** | TypeScript (strict mode) |
| **Styling** | TailwindCSS v4 + Shadcn/UI |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | Better Auth |
| **Payments** | Stripe |
| **Emails** | React Email + Resend |
| **Cache** | Upstash Redis |
| **Hosting** | Vercel |

## Project Structure

```
├── app/                 # Next.js App Router pages
├── src/
│   ├── components/      # UI components (Shadcn/UI + custom)
│   ├── features/        # Feature-specific components
│   ├── lib/             # Utilities and configurations
│   ├── hooks/           # React hooks
│   └── i18n/            # Internationalization
├── emails/              # React Email templates
├── prisma/              # Database schema and migrations
├── scripts/             # Setup and utility scripts
├── e2e/                 # Playwright E2E tests
└── __tests__/           # Vitest unit tests
```

## Documentation

See [CLAUDE.md](./CLAUDE.md) for detailed project documentation, conventions, and architecture guidelines.

## License

MIT
