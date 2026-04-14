# CLAUDE.md

**DevFlow** — A community-driven platform for asking and answering programming questions (Similar to Stack Overflow).

The project uses British English - strictly.

## Tech Stack

- **Framework**: Next.js 16.2 (React 19, App Router, React Compiler, TypeScript 6)
- **Styling**: Tailwind CSS 4.2 — centralised theme in `app/globals.css`
- **Auth**: Clerk 7 (`@clerk/nextjs`, `@clerk/ui` shadcn theme)
- **Testing**: Vitest 4.1 + Testing Library (unit), Playwright 1.59 (E2E)
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
- Follow Tailwind conventions:
  - centralised theming: style with tokens (`app/globals.css`), avoid hardcoding
  - mobile-first responsive design (e.g. `flex-col md:flex-row`)
  - utility-first composition over inline `style` or custom CSS
- Compose UI from `components/ui/` primitives; split a component when props proliferate

## Breaking Changes

**Tailwind v4**
- Uses `@import "tailwindcss"` syntax (not `@tailwind` directives)

**Next.js 16**
- Dynamic route `params` is a Promise — must await: `{ params }: { params: Promise<{ id: string }> }`
- Middleware renamed to Proxy — `middleware.ts` → `proxy.ts` (still uses `clerkMiddleware()`)

**Next.js 16 `cacheComponents` (enabled)**
- Uncached async data must be in `<Suspense>` or marked `"use cache"`
- Route segment configs deprecated (`dynamic`, `revalidate`, `fetchCache`)
- Edge Runtime not supported

## Authentication (Clerk)

- ClerkProvider: `components/providers/clerk-provider.tsx` (applies shadcn theme)
- Auth routes: `app/(auth)/sign-in/[[...sign-in]]`, `app/(auth)/sign-up/[[...sign-up]]`
- Sign In: `components/auth/clerk-signin.tsx`
- Sign Up: `components/auth/clerk-signup.tsx`
- Proxy: `proxy.ts` with `clerkMiddleware()` (not middleware.ts)
