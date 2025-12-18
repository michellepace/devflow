# Page Spacing: Complete Reference Guide

This document explains the spacing approach used in this project, the difference between padding and margin, and how to implement consistent page spacing across all routes.

---

## The Problem

Your navbar uses `px-6` (24px horizontal padding), but your page content has zero padding. This causes misalignment:

```text
Navbar:     |  [Logo]              [Buttons]  |   <- px-6 insets content
Page:       |Welcome to the world...          |   <- content at edge
            ^                                  ^
            Edge                               Edge
```

**Goal**: Define spacing in "one place" so all pages align with the navbar and have consistent gutters.

---

## Padding vs Margin Explained

Both create space, but they work differently:

```text
PADDING vs MARGIN - ASCII Diagram
=================================

┌─────────────────────────────────────────────────────────────┐
│                         MARGIN                              │
│   (space OUTSIDE the element, pushes other elements away)   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                      BORDER                         │   │
│   │   ┌─────────────────────────────────────────────┐   │   │
│   │   │                 PADDING                     │   │   │
│   │   │   (space INSIDE the element,                │   │   │
│   │   │    between border and content)              │   │   │
│   │   │                                             │   │   │
│   │   │   ┌────────────────────────────────────┐    │   │   │
│   │   │   │           CONTENT                  │    │   │   │
│   │   │   │     (your text, images, etc.)      │    │   │   │
│   │   │   └────────────────────────────────────┘    │   │   │
│   │   │                                             │   │   │
│   │   └─────────────────────────────────────────────┘   │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Key Difference

- **PADDING**: Creates space INSIDE an element (background colour fills this space)
- **MARGIN**: Creates space OUTSIDE an element (transparent, pushes siblings away)

### When to Use Each

| Use **Padding** when... | Use **Margin** when... |
|------------------------|------------------------|
| You want background colour to extend | You want space between sibling elements |
| Creating consistent page gutters | Separating cards or sections vertically |
| The container "owns" the space | Collapsing space between elements is OK |

**For page gutters (your case): Use PADDING.**

Why? If you later add a background colour to your main content area, you want it to extend to the edges while keeping content inset. Padding also has more predictable behaviour with flexbox/grid and is easier to maintain consistently.

---

## The Solution: Layout-Level Padding

### The Problem (Before)

```text
┌──────────────────────────────────────────────────────────────┐
│ Navbar              │ px-6 │            │ px-6 │    Navbar   │
├──────────────────────────────────────────────────────────────┤
│Content touches edge │      │            │      │ Content     │
│<h1>Welcome</h1>     │      │            │      │ touches edge│
└──────────────────────────────────────────────────────────────┘
  ↑                                                          ↑
  No padding - content misaligned with navbar
```

### The Solution (After)

```text
┌──────────────────────────────────────────────────────────────┐
│ Navbar              │ px-6 │            │ px-6 │    Navbar   │
├──────────────────────────────────────────────────────────────┤
│ │ px-6 │ Content now│      │            │      │ px-6 │      │
│ │      │ aligned    │      │            │      │      │      │
│ │      │<h1>Welcome │      │            │      │      │      │
└──────────────────────────────────────────────────────────────┘
    ↑                                                ↑
    Padding from <main> wrapper aligns with navbar
```

### With Max-Width Container (Recommended)

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ │ px-6 │ Navbar content          max-w-7xl (1280px)           │ px-6 │   │
├──────────────────────────────────────────────────────────────────────────┤
│ │      │   ┌─────────────────────────────────────────────┐    │      │   │
│ │ auto │   │  Page content centred within max-width      │    │ auto │   │
│ │margin│   │  Readable line lengths on large screens     │    │margin│   │
│ │      │   └─────────────────────────────────────────────┘    │      │   │
└──────────────────────────────────────────────────────────────────────────┘
              ↑                                          ↑
              mx-auto centres the container on wide screens
```

### Visual Proof (Mobile)

```text
400px Mobile - Before:
+---------------------------+
| [Logo]    [icons] [menu]  |  <- navbar px-6
|TOP OF PAGE: words words...|  <- NO padding, text at edge
+---------------------------+

400px Mobile - After:
+---------------------------+
| [Logo]    [icons] [menu]  |  <- navbar px-6
|  TOP OF PAGE: words...    |  <- px-6 matches navbar
+---------------------------+
     ^-- Content now aligns with logo
```

---

## Tailwind Classes Reference

| Class | CSS Equivalent | Purpose |
|-------|----------------|---------|
| `px-6` | `padding-left: 1.5rem; padding-right: 1.5rem` | 24px horizontal padding |
| `py-6` | `padding-top: 1.5rem; padding-bottom: 1.5rem` | 24px vertical padding |
| `max-w-7xl` | `max-width: 80rem` | Caps width at 1280px for readability |
| `mx-auto` | `margin-left: auto; margin-right: auto` | Centres element horizontally |
| `flex-1` | `flex-grow: 1` | Takes available space in flex container |
| `w-full` | `width: 100%` | Spans full width of parent |

---

## Implementation

### Recommended: The Layout File

The consistent page spacing is defined in **one place**:

**File**: `app/(root)/layout.tsx`

```tsx
// BEFORE (current)
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

// AFTER (with consistent spacing)
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-6">
        {children}
      </main>
    </>
  );
};
```

**Why this works**:

- `mx-auto` — centres the container horizontally on wide screens
- `w-full` — takes full available width up to max-width
- `max-w-7xl` — caps width at 1280px for readability
- `flex-1` — expands to fill available vertical space (works with body's `flex min-h-full flex-col`)
- `px-6` — matches navbar's horizontal padding (24px)
- `py-6` — adds vertical breathing room below navbar (24px)

### Why layout.tsx?

1. **Single source of truth** — change once, applies everywhere
2. **Semantic HTML** — `<main>` wraps page content properly
3. **Matches navbar** — both use `px-6`, content aligns perfectly

### Alternative: A Custom Wrapper Component

If you need more flexibility (some pages full-width, others not):

```tsx
// components/page-container.tsx
export function PageContainer({ children, className }) {
  return (
    <main className={cn("px-6", className)}>
      {children}
    </main>
  );
}
```

But for most apps, layout.tsx is simpler and sufficient.

---

## Refactoring Plan

### Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/(root)/layout.tsx` | Modify | Add `<main>` wrapper with spacing classes |
| `components/ui/empty.tsx` | Replace | Use original shadcn/ui version via CLI |
| `app/(root)/jobs/page.tsx` | Clean up | Remove debug content added for visualisation |
| `spacing-explained.md` | Create | Documentation (this file) |

### Step 1: Update the Layout

Edit `app/(root)/layout.tsx` to add the `<main>` wrapper as shown above.

### Step 2: Reset Empty Component

Run shadcn/ui CLI to get the original component:

```bash
npx shadcn@latest add empty --overwrite
```

This ensures the Empty component matches the official shadcn/ui version.

### Step 3: Clean Up Jobs Page Debug Content

Remove the debug `<div>` elements and `{"words ".repeat(100)}` content that were added for visualisation testing. Keep only the `<Empty>` component with appropriate content.

### Step 4: Verify Alignment

Take new screenshots at 400px and 1000px to confirm content aligns with navbar.

### Step 5: Consider Responsive Adjustments (Optional)

When ready for larger screens, you can increase padding:

```tsx
<main className="px-6 md:px-8 lg:px-12">
```

But start with mobile-first `px-6` to match your navbar.

---

## Expected Results

After implementation:

- All page content has consistent 24px horizontal padding (matching navbar)
- Content is centred with max-width 1280px on large screens
- 24px vertical gap between navbar and page content
- Pages using Empty will have additional internal padding (Empty's own `p-6`), which is appropriate for empty states
- All pages automatically inherit this spacing without needing individual configuration

---

## Summary

Add `px-6` to a `<main>` wrapper in your `layout.tsx`. Done.
