# CLAUDE.md

**DevFlow** — A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. (Similar to Stack Overflow)

The project uses British English - strictly.

## Tech Stack

- **Framework**: Next.js 16 (React 19, App Router, React Compiler, TypeScript 6)
- **Styling**: Tailwind CSS 4
- **Auth**: Clerk 7 (`@clerk/nextjs`, `@clerk/ui` shadcn theme)
- **Testing**: Vitest 4 + Testing Library (unit), Playwright 1.58 (E2E)
- **Quality**: Biome 2.4 (lint + format, replaces ESLint/Prettier)
- **Git Hooks**: Lefthook 2.1 (pre-commit: lint, typecheck, unit; pre-push: E2E)
- **Deployment**: Vercel (Preview on PR, Production on merge)

## Key Commands

```bash
npm run check       # Lint (Biome, auto-fixes) + typecheck
npm run lint:md     # Lint markdown files

npm run test:unit   # Vitest
npm run test:e2e    # Playwright
npm run test        # All tests (Vitest + Playwright)

npm run analyse     # Bundle analyser UI (why is X bundled? bloat? splits?)

fuser -k 3000/tcp 2>/dev/null; rm -f .next/dev/lock  # Kill dev server

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
npx shadcn@latest diff                    # Check for upstream registry updates
npx shadcn@latest --help                  # CLI help
```

## Coding Practices

- Only add `"use client"` when interactivity is needed
- Avoid manual `useMemo`/`useCallback` unless profiling shows need
- Always use `@/` import aliases, even for siblings (`@/app/fonts` not `./fonts`)

## Breaking Changes

- Tailwind v4 uses `@import "tailwindcss"` syntax (not `@tailwind` directives)
- Next.js 16 Dynamic route `params` is a Promise - must await: `{ params }: { params: Promise<{ id: string }> }`
- Next.js 16 Middleware renamed to Proxy - `middleware.ts` → `proxy.ts` (but still uses `clerkMiddleware()` function)
- `cacheComponents` enabled - uncached async data must be in `<Suspense>` or marked `"use cache"`
- `cacheComponents` enabled - route segment configs deprecated (`dynamic`, `revalidate`, `fetchCache`)
- `cacheComponents` enabled - Edge Runtime not supported

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
