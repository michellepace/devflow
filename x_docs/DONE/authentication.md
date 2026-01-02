# Authentication with Clerk

Last updated: 2026-02-02

This document describes how authentication is implemented in DevFlow using Clerk.

---

## Overview

Clerk provides authentication via a hosted UI approach. The application wraps Clerk's pre-built components (`<SignIn>`, `<SignUp>`) with custom wrapper components for branding, whilst Clerk handles all authentication logic, session management, and OAuth flows.

---

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

The `NEXT_PUBLIC_CLERK_*_URL` variables tell Clerk where to redirect users. The fallback URLs determine where users land after authentication.

---

## Architecture

### Provider Hierarchy

The provider setup in `app/layout.tsx`:

```
ClerkProvider (authentication context)
  └── html
        └── body
              └── ThemeProvider (next-themes)
                    └── {children}
```

`ClerkProvider` must wrap the entire app (including `<html>`) because Clerk needs to inject authentication context before any rendering occurs. The custom wrapper at `components/providers/clerk-provider.tsx` applies global theming and localisation defaults.

### Proxy (Route Protection)

`proxy.ts` (renamed from middleware.ts in Next.js 16) runs Clerk's middleware on every request:

```ts
import { clerkMiddleware } from "@clerk/nextjs/server";
export default clerkMiddleware();
```

The matcher config excludes static files and includes API routes. By default, `clerkMiddleware()` makes authentication available on all routes without blocking unauthenticated users. To protect specific routes, you would add route matchers or use `auth().protect()` in route handlers.

### Auth Routes

Clerk uses catch-all routes to handle its multi-step authentication flows:

- `app/(auth)/sign-in/[[...sign-in]]/page.tsx`
- `app/(auth)/sign-up/[[...sign-up]]/page.tsx`

The `[[...slug]]` pattern captures all sub-paths (e.g., `/sign-in/factor-one`, `/sign-in/sso-callback`), allowing Clerk to manage its internal routing.

Both pages render custom wrapper components (`ClerkSignIn`, `ClerkSignUp`) that wrap Clerk's `<SignIn>` and `<SignUp>` components with appearance customisations.

### Auth Layout

`app/(auth)/layout.tsx` provides a centred, full-screen background for auth pages using theme-aware CSS variables (`--auth-bg`).

---

## Custom Wrapper Components

### Sign In (`components/auth/clerk-signin.tsx`)

A **client component** that uses `useTheme()` from next-themes to detect the current theme and pass the appropriate logo URL to Clerk. This is necessary because Clerk's `logoImageUrl` prop requires a static URL string and cannot use CSS variables.

The component also customises header alignment (left-aligned rather than centred).

### Sign Up (`components/auth/clerk-signup.tsx`)

A **server component** with a static logo. Theme detection isn't needed here because the icon-only logo (`site-logo.svg`) works on both light and dark backgrounds.

---

## UI Customisation

Clerk's appearance is customised at two levels:

### Global (ClerkProvider)

`components/providers/clerk-provider.tsx` applies defaults to all Clerk components:

- **Theme**: Uses `@clerk/themes/shadcn` for shadcn/ui visual consistency
- **CSS Layer**: `cssLayerName: "clerk"` ensures Tailwind utilities override Clerk styles
- **Font**: References the app's Inter font via CSS variable
- **Button styling**: Primary buttons use the brand gradient (`--gradient-primary`)
- **Localisation**: Custom text for sign-in/sign-up titles, subtitles, and OAuth button labels

### Per-Component

Individual wrapper components can override globals via the `appearance` prop. For example, `ClerkSignIn` sets a theme-aware logo and left-aligned header.

### CSS Layer Integration

To ensure Tailwind utilities can override Clerk's styles without `!important`:

1. **Declare layer order** at the top of `globals.css`:

   ```css
   @layer theme, base, clerk, components, utilities;
   ```

2. **Import Clerk's styles** after the layer declaration:

   ```css
   @import "@clerk/themes/shadcn.css";
   ```

3. **Set `cssLayerName`** in ClerkProvider to place Clerk styles in the `clerk` layer.

This ordering ensures utilities (highest priority) can override Clerk styles cleanly.

### Theme-Aware Assets

CSS variables in `globals.css` provide theme-aware URLs:

```css
:root {
  --logo-full-themed: url("/images/logo-light.svg");
  --auth-bg: url("/images/auth-bg-light.webp");
}
.dark {
  --logo-full-themed: url("/images/logo-dark.svg");
  --auth-bg: url("/images/auth-bg-dark.webp");
}
```

These variables are used directly in Tailwind classes via arbitrary value syntax: `bg-(image:--auth-bg)`.

For Clerk components specifically, JavaScript theme detection (`useTheme()`) is required because Clerk's API accepts only static URL strings.

---

## Key Files

| File | Purpose |
|------|---------|
| `proxy.ts` | Route protection via `clerkMiddleware()` |
| `app/layout.tsx` | ClerkProvider wrapping the app |
| `components/providers/clerk-provider.tsx` | Global Clerk theming and localisation |
| `app/(auth)/layout.tsx` | Auth page layout with background |
| `app/(auth)/sign-in/[[...sign-in]]/page.tsx` | Sign-in route |
| `app/(auth)/sign-up/[[...sign-up]]/page.tsx` | Sign-up route |
| `components/auth/clerk-signin.tsx` | Custom sign-in wrapper (theme-aware logo) |
| `components/auth/clerk-signup.tsx` | Custom sign-up wrapper (static logo) |
| `app/globals.css` | CSS layer order and theme-aware asset variables |

---

## Notes

- The `await connection()` call in auth pages forces dynamic rendering at request time. This may be unnecessary since Clerk components are client-side, but it ensures no caching issues with authentication state.
- Clerk's localisation API allows customising any text string. The `{{provider|titleize}}` template formats OAuth provider names (e.g., "GitHub" instead of "Continue with GitHub").
