# Navigation Architecture: Mobile & Sidebar

Last updated: 2026-02-02

This document explains how the navigation system works across breakpoints, component structure, and the distinction between navigation and content discovery.

---

## Overview

The app has **two navigation contexts** that share the same nav items but render differently:

| Context | Breakpoint | Container | Implementation |
|---------|------------|-----------|----------------|
| Mobile Nav | `<sm` (<640px) | Sheet overlay | `MobileNavLink` components |
| Left Sidebar | `≥sm` (640px+) | Persistent `<aside>` | shadcn/ui Sidebar with `collapsible="icon"` |

The Left Sidebar can collapse to icon-only mode, persisted via cookie.

---

## Visual Breakdown

```text
┌─────────────────────────────────────────────────────────┐
│  MOBILE (<640px)                                        │
├─────────────────────────────────────────────────────────┤
│  MobileTopBar: [Logo]              [Theme] [Hamburger]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Hamburger → Sheet slides in from left (max 320px)      │
│  ┌──────────────────┐                                   │
│  │ [Logo]           │                                   │
│  │ Home             │                                   │
│  │ Community        │                                   │
│  │ Collections      │                                   │
│  │ Find Jobs        │                                   │
│  │ Tags             │                                   │
│  │ Ask a question   │                                   │
│  │                  │                                   │
│  │ [Auth buttons]   │ ← SignedOut: Sign in + Sign up    │
│  │ [UserButton]     │ ← SignedIn: avatar                │
│  └──────────────────┘                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  DESKTOP (≥640px)                                       │
├─────────────────────────────────────────────────────────┤
│  DesktopTopBar: [Search placeholder]    [Theme] [Auth]  │
├────────┬────────────────────────────────────────────────┤
│Sidebar │                                                │
│ 13rem  │              Main Content                      │
│        │                                                │
│ Home   │  ← Expanded: icon + label                      │
│ Comm.  │  ← Collapsed: icon only (3rem width)           │
│ Coll.  │                                                │
│ Jobs   │                                                │
│ Tags   │                                                │
│ Ask    │                                                │
│        │                                                │
│[User]  │  ← UserButton (SignedIn only)                  │
│[Toggle]│  ← Collapse/expand toggle                      │
└────────┴────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  XL DESKTOP (≥1280px)                                   │
├─────────────────────────────────────────────────────────┤
│  DesktopTopBar                                          │
├────────┬──────────────────────────────┬─────────────────┤
│Sidebar │       Main Content           │  RightSidebar   │
│        │                              │  (22rem)        │
│        │                              │                 │
│        │                              │  Top Questions  │
│        │                              │  Popular Tags   │
│        │                              │                 │
└────────┴──────────────────────────────┴─────────────────┘
```

---

## Authentication UI

Auth controls appear in different locations based on screen size and auth state:

| Context | Unauthenticated | Authenticated |
|---------|-----------------|---------------|
| **DesktopTopBar** | Sign in + Sign up buttons | Nothing |
| **LeftSidebar** | Nothing | UserButton at bottom |
| **MobileNav** | Sign in + Sign up buttons | UserButton |

---

## Navigation vs Content Discovery

The application has two types of sidebars with different purposes:

| Sidebar | Purpose | Content | Visibility |
|---------|---------|---------|------------|
| **LeftSidebar** | Navigation | Route links (Home, Community, etc.) | `≥sm` (640px+) |
| **RightSidebar** | Content discovery | Top Questions, Popular Tags | `≥xl` (1280px+) |

The LeftSidebar and MobileNav are **navigation components** — they help users move between routes.

The RightSidebar is a **content discovery component** — it surfaces related content to encourage exploration but doesn't provide primary navigation.

---

## Component Architecture

### Key Insight

Navigation links are implemented differently for mobile and desktop, but share the same data source and styling utilities:

- **MobileNav**: Uses `MobileNavLink` component in a Sheet overlay
- **LeftSidebar**: Uses shadcn/ui `SidebarMenuButton` with collapsible behaviour

Both consume the `NAV_LINKS` constant and use shared utilities for active state detection.

```text
┌─────────────────────────────────────────────────────────┐
│  SAME data source, DIFFERENT rendering:                 │
│                                                         │
│  MobileNav (Sheet)              LeftSidebar (shadcn/ui) │
│  ┌─────────────────┐            ┌─────────────────┐     │
│  │ <Sheet>         │            │ <Sidebar        │     │
│  │   <MobileNav    │            │   collapsible=  │     │
│  │     Link />     │            │   "icon">       │     │
│  │   <MobileNav    │            │   <SidebarMenu  │     │
│  │     Link />     │            │     Button />   │     │
│  │ </Sheet>        │            │ </Sidebar>      │     │
│  └─────────────────┘            └─────────────────┘     │
│           ↓                              ↓              │
│           └──────────┬───────────────────┘              │
│                      ↓                                  │
│              NAV_LINKS constant                         │
│              Shared styling utilities                   │
└─────────────────────────────────────────────────────────┘
```

### Shared Utilities (`lib/utils.ts`)

```typescript
// Check if route is active (exact or nested)
isRouteActive(pathname: string, route: string): boolean

// Active state classes
NAV_LINK_ACTIVE_CLASSES = "bg-(image:--gradient-primary) font-bold text-primary-foreground"
NAV_LINK_INACTIVE_CLASSES = "font-medium"

// Icon inversion for theme compatibility
getNavIconInvertClasses(isActive: boolean): string
```

---

## File Structure

```text
components/navigation/
├── nav-links.constants.ts    ← NAV_LINKS array (shared data)
├── desktop-topbar.tsx        ← Desktop top bar (≥sm)
├── mobile-topbar.tsx         ← Mobile top bar (<sm)
├── mobile-nav.tsx            ← Sheet drawer for mobile
├── mobile-navlink.tsx        ← Mobile navigation link component
├── left-sidebar.tsx          ← Persistent sidebar (≥sm)
├── left-sidebar-toggle.tsx   ← Sidebar collapse toggle button
├── themed-full-logo.tsx      ← Theme-aware full logo
└── theme-toggle.tsx          ← Dark/light mode toggle

components/ui/
└── sidebar.tsx               ← shadcn/ui Sidebar system

components/right-sidebar/
└── right-sidebar.tsx         ← Content discovery sidebar (≥xl)
```

---

## Implementation Details

### Left Sidebar (`left-sidebar.tsx`)

Uses shadcn/ui Sidebar component with:

- **Collapsible mode**: `collapsible="icon"` — collapses to icon-only (3rem/48px)
- **Expanded width**: `13rem` (208px)
- **State persistence**: Cookie-based (`sidebar_state`, 7-day expiry)
- **Keyboard shortcut**: `Ctrl/Cmd + B` to toggle
- **Sticky positioning**: Below the top bar

Structure:

```
SidebarHeader (logo)
SidebarContent (nav links via SidebarMenu)
SidebarFooter (UserButton + toggle button)
SidebarRail (clickable edge for toggle)
```

### Mobile Nav (`mobile-nav.tsx`)

Sheet-based navigation for mobile:

- **Trigger**: Hamburger icon in MobileTopBar
- **Max width**: 320px
- **Position**: Left side
- **Modal**: `false` (allows Clerk popups to work)
- **Animation**: Fade-in overlay

### Top Bars

Two separate components handle the top bar at different breakpoints:

| Component | Visibility | Contains |
|-----------|------------|----------|
| `MobileTopBar` | `sm:hidden` | Logo icon, ThemeToggle, MobileNav trigger |
| `DesktopTopBar` | `hidden sm:flex` | Search placeholder, ThemeToggle, Auth buttons |

---

## CSS Variables

Key custom properties used:

```css
--top-bar-height: 4rem;        /* 64px */
--sidebar-width: 16rem;        /* Default from shadcn/ui */
--sidebar-width-icon: 3rem;    /* 48px collapsed */
--sidebar-width-mobile: 18rem; /* Mobile sheet width */
--gradient-primary: ...;       /* Active state gradient */
--logo-full-themed: ...;       /* Theme-aware logo image */
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| `<sm` | <640px | Mobile: MobileTopBar + Sheet navigation |
| `≥sm` | 640px+ | Desktop: DesktopTopBar + LeftSidebar |
| `≥xl` | 1280px+ | XL: RightSidebar becomes visible |

---

## Summary

| Component | Type | Visibility | Purpose |
|-----------|------|------------|---------|
| **MobileTopBar** | Header | `<sm` | Minimal header with menu trigger |
| **DesktopTopBar** | Header | `≥sm` | Search, theme, auth buttons |
| **MobileNav** | Navigation | `<sm` | Sheet with nav links + auth |
| **LeftSidebar** | Navigation | `≥sm` | Collapsible sidebar with nav links |
| **RightSidebar** | Discovery | `≥xl` | Top Questions, Popular Tags |

### Key Concepts

| Concept | Explanation |
|---------|-------------|
| **NAV_LINKS** | Single source of truth for navigation items |
| **Collapsible sidebar** | shadcn/ui Sidebar with `collapsible="icon"` mode |
| **Cookie persistence** | Sidebar state saved for 7 days |
| **Shared styling** | Active/inactive classes in `lib/utils.ts` |
| **Auth flow** | DesktopTopBar (SignedOut), Sidebar/Mobile (SignedIn) |
