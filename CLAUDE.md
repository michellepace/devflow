# CLAUDE.md

**DevFlow** — A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. (Similar to Stack Overflow)

The project uses British English - strictly.

## Tech Stack

- **Next.js 16** with App Router (not Pages Router)
- **React 19.2.0** (latest with new features like Actions, `use` hook)
- **React Compiler** enabled for automatic optimisations
- **TypeScript 5** with strict mode
- **Tailwind CSS v4** with PostCSS
- **CI/CD** Vitest, Playwright, GitHub Actions, Vercel
- **Biome** for linting/formatting (replaces ESLint + Prettier)
- **Lefthook** for Git hooks (pre-commit: lint, typecheck, unit tests; pre-push: E2E tests)
- **Clerk** for authentication (installed via shadcn/ui CLI with `@clerk/themes`)

## Key Commands

```bash
npm run check       # Lint (Biome, auto-fixes) + typecheck
npm run lint:md     # Lint markdown files

npm run test:unit   # Vitest
npm run test:e2e    # Playwright
npm run test        # All tests (Vitest + Playwright)

vercel list         # Recent deployments and status
vercel env ls       # Check env vars are configured
vercel whoami       # Verify CLI is authenticated
```

## shadcn/ui CLI

```bash
npx shadcn@latest list @shadcn            # List all available components
npx shadcn@latest search @shadcn -q "nav" # Search components by query
npx shadcn@latest view button card        # Preview code before installing
npx shadcn@latest add <component>         # Add component to project
npx shadcn@latest add button --overwrite  # Overwrite existing component
npx shadcn@latest add @v0/<block>         # Add from v0.dev registry
```

## Coding Practices

- Only add `"use client"` when interactivity is needed
- Avoid manual `useMemo`/`useCallback` unless profiling shows need
- Always use `@/` import aliases, even for siblings (`@/app/fonts` not `./fonts`)

## Breaking Changes

- Tailwind v4 uses `@import "tailwindcss"` syntax (not `@tailwind` directives)
- Next.js 16 Dynamic route `params` is a Promise - must await: `{ params }: { params: Promise<{ id: string }> }`
- Next.js 16 Middleware renamed to Proxy - `middleware.ts` → `proxy.ts` (but still uses `clerkMiddleware()` function)

## Authentication (Clerk)

- ClerkProvider: `components/clerk-provider.tsx` (applies shadcn theme + Inter font)
- Auth routes: `app/(auth)/sign-in/[[...sign-in]]`, `app/(auth)/sign-up/[[...sign-up]]`
- Sign In: `components/auth/clerk-signin.tsx` — client component with theme-aware logo
- Sign Up: `components/auth/clerk-signup.tsx` — static logo
- Proxy: `proxy.ts` with `clerkMiddleware()` (not middleware.ts)

## Common Additions for New Projects

When starting a new project from this template, you'll typically add:

- State management (Zustand, Jotai, or React Context)
- Data fetching (React Query, SWR, or native fetch with Server Components)
- Forms (React Hook Form, Zod for validation)
- UI components (shadcn/ui, Radix, Tailwind UI kit, or Headless UI)
- Authentication (NextAuth.js, Clerk, or Supabase Auth)
- Database/ORM (Neon or Supabase with Prisma or Drizzle. Or try Convex!)
