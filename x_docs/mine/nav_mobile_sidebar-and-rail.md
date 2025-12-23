# Navigation Architecture: Mobile, Sidebar & Rail

This document explains how the navigation system works across breakpoints, and how components are structured for reusability.

---

## Overview

The app has **three navigation contexts** that share the same nav items but render differently:

| Context | Breakpoint | Container | NavLink Variant |
| --------- | ------------ | ----------- | ----------------- |
| Mobile Nav | `<sm` (<640px) | Sheet overlay | `mobile` (default) |
| Left Rail | `sm` to `lg` (640-1023px) | Persistent `<aside>` | `rail` (icon-only) |
| Left Sidebar | `≥lg` (1024px+) | Persistent `<aside>` | `rail` (icon + label) |

---

## Visual Breakdown

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  MOBILE (<640px)                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ Navbar: [Logo]                         [Theme] [Hamburger]      │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  │                                                                 │    │
│  │  When hamburger tapped → Sheet slides in from left              │    │
│  │                                                                 │    │
│  │  ┌──────────────────┐                                           │    │
│  │  │ Sheet (overlay)  │                                           │    │
│  │  │ ┌──────────────┐ │                                           │    │
│  │  │ │ 🏠 Home      │ │  ← NavLink (mobile)                       │    │
│  │  │ │ 👥 Community │ │  ← NavLink (mobile)                       │    │
│  │  │ │ ⭐ Collections│ │  ← NavLink (mobile)                      │    │
│  │  │ │ 💼 Find Jobs │ │  ← NavLink (mobile)                       │    │
│  │  │ │ 🏷️ Tags      │ │  ← NavLink (mobile)                       │    │
│  │  │ │ ❓ Ask       │ │  ← NavLink (mobile)                       │    │
│  │  │ └──────────────┘ │                                           │    │
│  │  │                  │                                           │    │
│  │  │ ┌──────────────┐ │  ← SignedOut: auth buttons                │    │
│  │  │ │ [Sign in]    │ │  ← SignedIn: UserButton avatar            │    │
│  │  │ │ [Sign up]    │ │                                           │    │
│  │  │ └──────────────┘ │                                           │    │
│  │  └──────────────────┘                                           │    │
│  │                                                                 │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  TABLET (640px - 1023px) - Icon-only Rail                               │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ Navbar: [Logo]         [Search]      [Theme] [Auth] (SignedOut) │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  ┌────────┬────────────────────────────────────────────────────────┐    │
│  │ Rail   │                                                        │    │
│  │ ~64px  │              Main Content                              │    │
│  │        │                                                        │    │
│  │  🏠    │  ← NavLink (rail) icon-only                            │    │
│  │  👥    │                                                        │    │
│  │  ⭐    │                                                        │    │
│  │  💼    │                                                        │    │
│  │  🏷️    │                                                        │    │
│  │  ❓    │                                                        │    │
│  │        │                                                        │    │
│  │  👤    │  ← UserButton (SignedIn only)                          │    │
│  └────────┴────────────────────────────────────────────────────────┘    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  DESKTOP (≥1024px) - Full Sidebar                                       │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ Navbar: [Logo]         [Search]      [Theme] [Auth] (SignedOut) │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  ┌────────────────┬────────────────────────────────────────────────┐    │
│  │ Sidebar ~220px │                                                │    │
│  │                │              Main Content                      │    │
│  │ 🏠 Home        │                                                │    │
│  │ 👥 Community   │  ← NavLink (rail) with labels at lg+           │    │
│  │ ⭐ Collections │                                                │    │
│  │ 💼 Find Jobs   │                                                │    │
│  │ 🏷️ Tags        │                                                │    │
│  │ ❓ Ask         │                                                │    │
│  │                │                                                │    │
│  │ 👤 UserButton  │  ← UserButton (SignedIn only)                  │    │
│  └────────────────┴────────────────────────────────────────────────┘    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Authentication UI

Auth controls appear in different locations based on screen size and auth state:

| Context | Unauthenticated | Authenticated |
| --------- | ----------------- | --------------- |
| **Navbar** | Sign in + Sign up buttons (sm+ only) | Nothing (avatar in sidebar) |
| **LeftSidebar** | Nothing | UserButton avatar at bottom |
| **MobileNav** | Sign in + Sign up buttons | UserButton avatar |

```text
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│  Auth UI Flow:                                                     │
│                                                                    │
│  SignedOut (unauthenticated)        SignedIn (authenticated)       │
│  ┌────────────────────────┐         ┌────────────────────────┐     │
│  │ Navbar: [Sign in/up]   │         │ Navbar: [nothing]      │     │
│  │ Sidebar: [nothing]     │         │ Sidebar: [UserButton]  │     │
│  │ Mobile: [Sign in/up]   │         │ Mobile: [UserButton]   │     │
│  └────────────────────────┘         └────────────────────────┘     │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Key Insight

**NavLink doesn't know what container it's in.** It just renders itself with either:

- `mobile` variant (default): icon + label, generous padding for touch
- `rail` variant: responsive — icon-only at sm-lg, full at lg+

The **parent component** determines the context (Sheet vs persistent sidebar).

```text
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  SAME NavLink component, DIFFERENT containers & variants:       │
│                                                                 │
│  MobileNav (Sheet)              LeftSidebar (persistent)        │
│  ┌─────────────────┐            ┌─────────────────┐             │
│  │ <Sheet>         │            │ <aside>         │             │
│  │   <NavLink />   │ ← mobile   │   <NavLink      │ ← rail      │
│  │   <NavLink />   │   (default)│     variant=    │   (responsive)
│  │   <NavLink />   │            │     "rail" />   │             │
│  │ </Sheet>        │            │ </aside>        │             │
│  └─────────────────┘            └─────────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Containers & Components

| Component | Container Type | When Visible | NavLink Variant | Auth Section |
| :--------- | :-------------- | :------------ | :--------------- | :------------- |
| MobileNav | Sheet (overlay) | <sm only | `mobile` (default) | SignedIn/Out conditional |
| LeftSidebar | Persistent `<aside>` | ≥sm | `rail` (responsive) | SignedIn only (UserButton) |

### Variants

Two variants, but `"rail"` is **responsive** — it handles its own breakpoint transformation internally via Tailwind classes.

```text
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  NavLink variants:                                             │
│                                                                │
│  1. "mobile" (default)    2. "rail" (responsive)               │
│  ┌──────────────────┐     ┌─────────┐    ┌──────────────────┐  │
│  │ 🏠  Home        │     │   🏠    │ →  │ 🏠  Home         │  │
│  └──────────────────┘     └─────────┘    └──────────────────┘  │
│  Always icon + label      sm-lg: icon    lg+: icon + label     │
│  Generous padding (py-3)  Compact (40px) Tight padding (p-2)   │
│                                                                │
│  Used in:                 Used in:                             │
│  • Mobile sheet           • LeftSidebar (handles both states)  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## File Structure

```text
components/navigation/
├── nav-links.constants.ts  ← NAV_LINKS array (shared data)
├── navbar.tsx              ← Top bar with logo, search, auth
├── mobile-nav.tsx          ← Sheet drawer for mobile (<sm)
├── left-sidebar.tsx        ← Persistent sidebar (≥sm)
├── nav-link.tsx            ← Reusable nav link with variants
├── full-logo.tsx           ← Theme-aware logo
└── theme-toggle.tsx        ← Dark/light mode toggle
```

---

## Implementation Details

### NavLink (`nav-link.tsx`)

Reusable navigation link with two variants:

- **Active state detection** via `usePathname()` — highlights current route with gradient background
- **Icon filtering** — uses `invert-colors` class on inactive icons for theme compatibility
- **Accessibility** — `aria-label` provided for icon-only rail mode

### LeftSidebar (`left-sidebar.tsx`)

Persistent sidebar with sticky positioning:

- **Sticky** with calculated offset (72px) to sit below navbar
- **Full viewport height** minus navbar via `calc(100vh - 72px)`
- **Two-section layout** — nav links at top, UserButton at bottom (authenticated only)
- **Self-contained visibility** — `hidden sm:flex` handles its own responsive display

### Layout Integration (`app/(root)/layout.tsx`)

Simple flex layout:

```
┌─────────────────────────────────┐
│ Navbar (sticky top)             │
├──────────┬──────────────────────┤
│LeftSidebar│ {children}          │
│ (sticky) │                      │
└──────────┴──────────────────────┘
```

The LeftSidebar handles its own visibility — no props needed from layout.

---

## Why nav-links.constants.ts is Separate

The `NAV_LINKS` array is in its own file because:

1. **Single source of truth** — update nav items once, all components update
2. **Multiple consumers** — used by MobileNav and LeftSidebar
3. **No "use client"** — pure data, can be imported by server components
4. **No circular imports** — avoids issues if components import from each other

---

## Summary

| Concept | Explanation |
| --------- | ------------- |
| **NavLink** | Reusable component with `mobile` and `rail` variants |
| **nav-links.constants.ts** | Single source of truth for nav items |
| **MobileNav** | Sheet overlay, uses NavLink (`mobile` variant, default) |
| **LeftSidebar** | Persistent aside, uses NavLink (`rail` variant — responsive) |
| **Container agnostic** | NavLink doesn't know whether it's in a Sheet or sidebar |
| **Auth flow** | Navbar (SignedOut), Sidebar (SignedIn), Mobile (both) |
