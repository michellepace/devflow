# Navigation Architecture: Mobile, Sidebar & Rail

This document explains how the navigation system works across breakpoints, and how components are structured for reusability.

---

## Overview

The app has **three navigation contexts** that share the same nav items but render differently:

| Context | Breakpoint | Container | NavLink Variant |
|---------|------------|-----------|-----------------|
| Mobile Nav | `<sm` (<640px) | Sheet overlay | `full` (default) |
| Left Rail | `sm` to `lg` (640-1023px) | Persistent `<aside>` | `icon-only` |
| Left Sidebar | `≥lg` (1024px+) | Persistent `<aside>` | `full` (default) |

---

## Visual Breakdown

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  MOBILE (<640px)                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ Navbar: [Logo]                    [Theme] [Hamburger]           │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  │                                                                 │    │
│  │  When hamburger tapped → Sheet slides in from left              │    │
│  │                                                                 │    │
│  │  ┌──────────────────┐                                           │    │
│  │  │ Sheet (overlay)  │                                           │    │
│  │  │ ┌──────────────┐ │                                           │    │
│  │  │ │ 🏠 Home      │ │  ← NavLink (full)                        │    │
│  │  │ │ 👥 Community │ │  ← NavLink (full)                        │    │
│  │  │ │ ⭐ Collections│ │  ← NavLink (full)                        │    │
│  │  │ │ 💼 Find Jobs │ │  ← NavLink (full)                         │    │
│  │  │ │ 🏷️ Tags      │ │  ← NavLink (full)                         │    │
│  │  │ │ ❓ Ask       │ │  ← NavLink (full)                         │    │
│  │  │ └──────────────┘ │                                           │    │
│  │  │ [Sign in]        │                                           │    │
│  │  │ [Sign up]        │                                           │    │
│  │  └──────────────────┘                                           │    │
│  │                                                                 │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  TABLET (640px - 1023px) - Icon-only Rail                               │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ Navbar: [Logo]         [Search]           [Theme] [Auth]        │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  ┌────────┬────────────────────────────────────────────────────────┐    │
│  │ Rail   │                                                        │    │
│  │ ~64px  │              Main Content                              │    │
│  │        │                                                        │    │
│  │  🏠    │  ← NavLink (icon-only)                                 │    │
│  │  👥    │  ← NavLink (icon-only)                                 │    │
│  │  ⭐    │  ← NavLink (icon-only)                                 │    │
│  │  💼    │  ← NavLink (icon-only)                                 │    │
│  │  🏷️    │  ← NavLink (icon-only)                                 │    │
│  │  ❓    │  ← NavLink (icon-only)                                 │    │
│  │        │                                                        │    │
│  └────────┴────────────────────────────────────────────────────────┘    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  DESKTOP (1024px - 1279px) - Full Sidebar                               │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ Navbar: [Logo]         [Search]           [Theme] [Auth]        │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  ┌────────────────┬────────────────────────────────────────────────┐    │
│  │ Sidebar ~220px │                                                │    │
│  │                │              Main Content                      │    │
│  │ 🏠 Home        │                                                │    │
│  │ 👥 Community   │  ← NavLink (full) - SAME as mobile sheet       │    │
│  │ ⭐ Collections │                                                │    │
│  │ 💼 Find Jobs   │                                                │    │
│  │ 🏷️ Tags        │                                                │    │
│  │ ❓ Ask         │                                                │    │
│  │                │                                                │    │
│  └────────────────┴────────────────────────────────────────────────┘    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  WIDE DESKTOP (≥1280px) - Full Sidebar + Right Sidebar                  │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ Navbar: [Logo]         [Search]           [Theme] [Auth]        │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  ┌────────────────┬──────────────────────────────┬─────────────────┐    │
│  │ Sidebar ~220px │                              │ Right ~300px    │    │
│  │                │        Main Content          │                 │    │
│  │ 🏠 Home        │                              │ Top Questions   │    │
│  │ 👥 Community   │                              │ Popular Tags    │    │
│  │ ⭐ Collections │                              │                 │    │
│  │ 💼 Find Jobs   │                              │                 │    │
│  │ 🏷️ Tags        │                              │                 │    │
│  │ ❓ Ask         │                              │                 │    │
│  │                │                              │                 │    │
│  └────────────────┴──────────────────────────────┴─────────────────┘    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Key Insights — CRITICAL: this section must be evaluated for consistency against rest of doc

### Containers & Components

NavLink doesn't know what container it's in. It just renders itself.

```text
  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │  THREE different CONTAINERS, using NavLink inside:              │
  │                                                                 │
  │  1. MobileNav (Sheet)         ← Container is <Sheet>            │
  │     └── <NavLink />           ← Same NavLink component          │
  │                                                                 │
  │  2. LeftSidebar (icon rail)   ← Container is persistent <aside> │
  │     └── <NavLink variant="icon-only" />                         │
  │                                                                 │
  │  3. LeftSidebar (full)        ← Container is persistent <aside> │
  │     └── <NavLink />           ← Same NavLink component          │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘
```

 The components:

| Component   | Container Type     | When Visible      | NavLink Variant                 |
|-------------|--------------------|-------------------|---------------------------------|
| MobileNav   | Sheet (overlay)    | <sm (mobile only) | full (default)                  |
| LeftSidebar | Persistent <aside> | ≥sm (tablet+)     | icon-only at sm-lg, full at lg+ |

So you'll have TWO sibling components:

```tsx
  // In your (root)/layout.tsx eventually:
  <Navbar />
  <div className="flex">
    <LeftSidebar />   {/* Persistent, hidden on mobile, visible sm+ */}
    <main>{children}</main>
  </div>
```

And MobileNav stays inside Navbar as it is now - it's the Sheet that appears when you tap the hamburger on mobile.

### Variants

Your mobile sheet and full sidebar look identical (both show icon + label). They use the same variant.

```text
  ┌────────────────────────────────────────────────────────────────┐
  │                                                                │
  │  SAME NavLink variant="full" (default), DIFFERENT container:   │
  │                                                                │
  │  Mobile (<sm)              Desktop (≥lg)                       │
  │  ┌─────────────────┐       ┌─────────────────┐                 │
  │  │ Sheet overlay   │       │ Persistent      │                 │
  │  │ ┌──────────────┐│       │ LeftSidebar     │                 │
  │  │ │ 🏠 Home     │ │       │ ┌─────────────┐ │                │
  │  │ │ 👥 Community│ │       │ │ 🏠 Home     │ │                │
  │  │ │ ⭐ Collect. │ │       │ │ 👥 Community│ │                │
  │  │ └──────────────┘│       │ │ ⭐ Collect. │ │                │
  │  └─────────────────┘       │ └─────────────┘ │                 │
  │                            └─────────────────┘                 │
  │                                                                │
  │  Icon-only rail (sm to lg)                                     │
  │  ┌──────┐                                                      │
  │  │ 🏠   │  ← NavLink variant="icon-only"                       │
  │  │ 👥   │                                                      │
  │  │ ⭐   │                                                      │
  │  └──────┘                                                      │
  │                                                                │
  └────────────────────────────────────────────────────────────────┘
```

So TWO variants total, not three.

```text
  NavLink variants:
  ├── "full" (default)  ← icon + label
  └── "icon-only"       ← icon only
```

```text
  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │   NavLink variants:                                              │
  │                                                                  │
  │   1. "full" (default)     2. "icon-only"                         │
  │   ┌──────────────────┐    ┌─────────┐                            │
  │   │ 🏠  Home         │    │   🏠    │  ← maybe tooltip on hover │
  │   └──────────────────┘    └─────────┘                            │
  │                                                                  │
  │   Used in:                Used in:                               │
  │   • Mobile sheet          • Left rail (sm to lg)                 │
  │   • Full sidebar (lg+)                                           │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### The Key Insight

**NavLink doesn't know what container it's in.** It just renders itself with either:

- `full` variant: icon + label
- `icon-only` variant: icon only

The **parent component** determines the context (Sheet vs persistent sidebar).

```text
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  SAME NavLink component, DIFFERENT containers:                  │
│                                                                 │
│  MobileNav (Sheet)         LeftSidebar (persistent)             │
│  ┌─────────────────┐       ┌─────────────────┐                  │
│  │ <Sheet>         │       │ <aside>         │                  │
│  │   <NavLink />   │       │   <NavLink />   │  ← Same!         │
│  │   <NavLink />   │       │   <NavLink />   │                  │
│  │   <NavLink />   │       │   <NavLink />   │                  │
│  │ </Sheet>        │       │ </aside>        │                  │
│  └─────────────────┘       └─────────────────┘                  │
│                                                                 │
│  Icon Rail (persistent)                                         │
│  ┌─────────────────┐                                            │
│  │ <aside>         │                                            │
│  │   <NavLink variant="icon-only" />  ← Different variant       │
│  │   <NavLink variant="icon-only" />                            │
│  │   <NavLink variant="icon-only" />                            │
│  │ </aside>        │                                            │
│  └─────────────────┘                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### NavLink Variants

Only **TWO variants** needed:

```tsx
// components/navigation/nav-link.tsx

type NavLinkProps = NavLinkType & {
  onClick?: () => void;
  variant?: "full" | "icon-only";  // Add this
};

export function NavLink({
  imgURL,
  route,
  label,
  onClick,
  variant = "full"  // Default to full (icon + label)
}: NavLinkProps) {
  // ... active state logic stays the same ...

  return (
    <Link href={route} onClick={onClick} className={...}>
      <Image src={imgURL} alt={label} ... />
      {variant === "full" && <span>{label}</span>}  {/* Conditionally show label */}
    </Link>
  );
}
```

### Usage in Different Contexts

```tsx
// MobileNav - uses default "full" variant
<NavLink imgURL="..." route="/" label="Home" />

// LeftSidebar at lg+ - uses default "full" variant
<NavLink imgURL="..." route="/" label="Home" />

// LeftSidebar at sm-lg - uses "icon-only" variant
<NavLink variant="icon-only" imgURL="..." route="/" label="Home" />
```

---

## File Structure

### Current Structure

```text
components/navigation/
├── constants.ts        ← NAV_LINKS array (shared data)
├── navbar.tsx          ← Top bar with logo, search, auth
├── mobile-nav.tsx      ← Sheet drawer for mobile
├── nav-link.tsx        ← Reusable nav link component
├── full-logo.tsx       ← Theme-aware logo
└── theme-toggle.tsx    ← Dark/light mode toggle
```

### After Adding LeftSidebar

```text
components/navigation/
├── constants.ts        ← NAV_LINKS array (shared data)
├── navbar.tsx          ← Top bar
├── mobile-nav.tsx      ← Sheet drawer for mobile (<sm)
├── left-sidebar.tsx    ← NEW: Persistent sidebar (≥sm)
├── nav-link.tsx        ← Reusable (with variant prop)
├── full-logo.tsx       ← Theme-aware logo
└── theme-toggle.tsx    ← Dark/light mode toggle
```

---

## Why constants.ts is Separate

The `NAV_LINKS` array is in its own file because:

1. **Single source of truth** - Update nav items once, all components update
2. **Multiple consumers** - Used by MobileNav, will be used by LeftSidebar
3. **No "use client"** - Pure data, can be imported by server components
4. **No circular imports** - Avoids issues if LeftSidebar imports from NavLink

```tsx
// constants.ts - Pure data, no React
export const NAV_LINKS = [
  { imgURL: "/icons/home.svg", route: "/", label: "Home" },
  { imgURL: "/icons/users.svg", route: "/community", label: "Community" },
  // ...
] as const satisfies readonly NavLink[];

// mobile-nav.tsx - Consumes the data
import { NAV_LINKS } from "@/components/navigation/constants";

// left-sidebar.tsx - Also consumes the same data
import { NAV_LINKS } from "@/components/navigation/constants";
```

---

## Layout Integration

### Current Layout

```tsx
// app/(root)/layout.tsx
<>
  <Navbar />      {/* Contains MobileNav hamburger */}
  {children}
</>
```

### Future Layout (with LeftSidebar)

```tsx
// app/(root)/layout.tsx
<>
  <Navbar />
  <div className="flex flex-1">
    <LeftSidebar className="hidden sm:flex" />  {/* Hidden on mobile */}
    {children}
  </div>
</>
```

The LeftSidebar handles its own responsive behaviour internally:

- `sm` to `lg`: Shows icon-only rail
- `≥lg`: Shows full sidebar with labels

```tsx
// Simplified LeftSidebar concept
export function LeftSidebar() {
  return (
    <aside className="hidden sm:flex flex-col ...">
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.route}
          {...link}
          variant="icon-only"           // Default for rail
          className="lg:variant-full"   // Override at lg+ (conceptual)
        />
      ))}
    </aside>
  );
}
```

> **Note**: The exact responsive variant switching can be done via:
>
> - CSS classes that show/hide label
> - A hook that detects breakpoint
> - Render both and use CSS to toggle visibility

---

## Implementation Order

Recommended sequence:

1. ✅ **MobileNav** - Already working
2. 🔲 **Polish MobileNav styling** - Perfect the look
3. 🔲 **Add `variant` prop to NavLink** - Small change (~15 lines)
4. 🔲 **Create LeftSidebar** - Uses same NavLink, same constants
5. 🔲 **Wire up in layout** - Add to `(root)/layout.tsx`

**Why this order?** The styling you perfect in MobileNav transfers directly to LeftSidebar (full mode) since they use the same NavLink component.

---

## Summary

| Concept | Explanation |
|---------|-------------|
| **NavLink** | Reusable component with `full` and `icon-only` variants |
| **constants.ts** | Single source of truth for nav items |
| **MobileNav** | Sheet overlay, uses NavLink (full) |
| **LeftSidebar** | Persistent aside, uses NavLink (icon-only at sm-lg, full at lg+) |
| **Container agnostic** | NavLink doesn't know if it's in a Sheet or sidebar |
