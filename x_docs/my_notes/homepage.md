# Layout Architecture: DevFlow

## Executive Summary

This report documents the layout and structure of the DevFlow project. The analysis covers root layouts, route group layouts, homepage content, responsive breakpoints, and mobile-first practices.

**Key findings:**

- CSS architecture uses variables, mobile-first approach, and sticky positioning
- QuestionCard (preliminary) and data layer implemented with mock data — redesign needed
- Homepage still missing: Ask Question button, local search input, filter chips
- Global search placeholder added to desktop top bar

---

## Key Files

- `app/layout.tsx`
- `app/(app)/layout.tsx`
- `app/(app)/page.tsx`
- `components/navigation/left-sidebar.tsx`
- `components/navigation/mobile-topbar.tsx`
- `components/navigation/desktop-topbar.tsx`
- `components/navigation/theme-toggle.tsx`
- `components/right-sidebar/right-sidebar.tsx`
- `components/question-card.tsx`
- `components/search/global-search.tsx`
- `lib/data/questions.ts`
- `lib/data/tags.ts`

---

## 1. Root Layout Impact

Root layouts serve as structural shells with minimal homepage impact:

| Aspect | Implementation |
|--------|----------------|
| Body classes | `flex min-h-full flex-col antialiased` |
| HTML class | `h-full` |
| Auth | Clerk Provider |

**Verdict**: The root layout's `flex min-h-full flex-col` enables proper full-height behaviour. Homepage structure is defined in route group layouts.

---

## 2. Route Group Layout  `(app)/layout.tsx`

```text
<SidebarProvider>
┌─────────────────────────────────────────────────────────────────────────┐
│                          flex (row, implicit)                           │
│  ┌──────────┐  ┌────────────────────────────────────────────────────┐  │
│  │LEFT      │  │ flex-1 flex-col min-h-screen                       │  │
│  │SIDEBAR   │  │  ┌──────────────────────────────────────────────┐  │  │
│  │(shadcn)  │  │  │ MOBILE TOP BAR (sticky, sm:hidden)           │  │  │
│  │collaps-  │  │  │ Logo + ThemeToggle + MobileNav               │  │  │
│  │ible      │  │  ├──────────────────────────────────────────────┤  │  │
│  │width:    │  │  │ DESKTOP TOP BAR (sticky, hidden sm:flex)     │  │  │
│  │13rem     │  │  │ GlobalSearch (lg) + Auth buttons             │  │  │
│  │hidden    │  │  └──────────────────────────────────────────────┘  │  │
│  │<sm       │  │                                                    │  │
│  │          │  │  ┌─────────────────────────────────────────────┐   │  │
│  │Footer:   │  │  │               flex-1 flex (row)             │   │  │
│  │ThemeTgl  │  │  │  ┌───────────────────────┐ ┌─────────────┐  │   │  │
│  │UserBtn   │  │  │  │ MAIN (flex-1)         │ │ RIGHT       │  │   │  │
│  │SidebarTg │  │  │  │ px-10 lg:px-14        │ │ SIDEBAR     │  │   │  │
│  │          │  │  │  │ pt-6 pb-10            │ │ width:22rem │  │   │  │
│  │          │  │  │  │ max-w-5xl mx-auto     │ │ Top Qs      │  │   │  │
│  │          │  │  │  │                       │ │ Pop Tags    │  │   │  │
│  │          │  │  │  └───────────────────────┘ └─────────────┘  │   │  │
│  │          │  │  └─────────────────────────────────────────────┘   │  │
│  └──────────┘  └────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Layout Features

| Aspect | Implementation |
|--------|--------------|
| Navbar | Sticky, separate mobile/desktop |
| Content offset | `pt-6` (24px) natural flow |
| Left sidebar | shadcn/ui, collapsible, `13rem` |
| Left sidebar footer | ThemeToggle, UserButton, SidebarToggle |
| Right sidebar | `22rem`, Top Questions + Popular Tags |
| Desktop top bar | GlobalSearch (lg), auth buttons |
| Mobile top bar | Logo, ThemeToggle, MobileNav |
| CSS variables | `--top-bar-height`, `--right-sidebar-width` |

---

## 3. Homepage Content: `(app)/page.tsx`

```text
<h1> "All Questions"

<div> mt-8 space-y-6 ────────────────────────────────────────────────────────────
│  QuestionCard (preliminary implementation with stats, tags, author, date)      │
│  QuestionCard                                                                  │
│  ... (7 mock questions from data layer)                                        │
└────────────────────────────────────────────────────────────────────────────────

IMPLEMENTED:
✓ QuestionCard component (preliminary — redesign needed)
✓ Data layer with getAllQuestions(), getTopQuestions(), getPopularTags()
✓ TagLink component for tag display
✓ Right sidebar with Top Questions and Popular Tags

STILL MISSING:
- "Ask a Question" button
- Filter chips (Newest, Recommended, Frequent, Unanswered)

Note: GlobalSearch placeholder exists in desktop top bar
```

---

## 4. Responsive Breakpoints

| Breakpoint | Behaviour |
|------------|-----------|
| **< 640px (mobile)** | Left sidebar hidden, MobileTopBar shows |
| **640px+ (sm)** | DesktopTopBar shows, LeftSidebar shows |
| **768px (md)** | - |
| **1024px (lg)** | `px-14` main padding |
| **1280px+ (xl)** | Right sidebar shows (`22rem`) |

---

## 5. Mobile-First CSS Patterns

| Aspect | Implementation |
|--------|----------------|
| Sidebar hiding | `sm:hidden` (mobile-first) |
| Padding | `px-10 lg:px-14` (comfortable, progressive) |
| Top bar | Separate mobile/desktop components |
| Layout flow | Sticky, natural document flow |
| Theme toggle | Left sidebar footer (desktop) + mobile top bar |

---

## 6. Mobile Proportions

The layout is well-proportioned for mobile:

```
┌──────────────────────────────┐
│ MobileTopBar (64px)          │
│ Logo   [ThemeToggle] [Menu]  │
└──────────────────────────────┘
┌──────────────────────────────┐
│                              │
│        MAIN CONTENT          │
│        px-10 (40px sides)    │
│        pt-6 pb-10            │
│                              │
│   "All Questions"            │
│                              │
│   ┌──────────────────────┐   │
│   │   QuestionCard       │   │
│   │   (author, date,     │   │
│   │    title, body,      │   │
│   │    tags, stats)      │   │
│   └──────────────────────┘   │
│                              │
└──────────────────────────────┘
```

- `--top-bar-height: 4rem` (64px) - touch-friendly
- `px-10` (40px) - comfortable mobile padding
- No sidebars on mobile
- Sticky top bar allows natural scroll
- Theme toggle accessible in mobile top bar

---

## 7. Project Strengths

| Aspect | Implementation |
|--------|----------------|
| Homepage | QuestionCard (preliminary) |
| Right sidebar | Top Questions + Popular Tags |
| Collapsible sidebar | shadcn/ui with icon mode |
| CSS architecture | CSS variables for dimensions |
| Mobile-first | Proper breakpoint progression |
| Layout flow | Sticky positioning, natural document flow |
| Auth integration | Clerk in top bars |
| Code organisation | Separate mobile/desktop bars |
| Data layer | Full mock data layer (`questions.ts`, `tags.ts`) |
| Theme toggle | Left sidebar footer + mobile top bar |

---

## 8. Remaining Implementation

### Completed

- ✓ QuestionCard component (preliminary — redesign needed)
- ✓ Data layer with mock questions and tags
- ✓ Right sidebar with Top Questions and Popular Tags
- ✓ Theme toggle relocated to left sidebar footer and mobile top bar
- ✓ GlobalSearch placeholder in desktop top bar

### Still Needed

Before implementing remaining homepage elements, consider:

1. **LocalSearch behaviour**: URL params with server-side filtering, or client-side only?
2. **Filter persistence**: Update URL (shareable) or local component state?
3. **"Ask a Question" button on mobile**:
   - Below title (`flex-col-reverse` like course)?
   - Floating action button?
   - In mobile header?
4. **Filter chips responsiveness**:
   - Wrap to multiple rows?
   - Horizontal scroll?
   - Collapse to dropdown?

---

## Recommendations

1. ✓ **Keep your layout architecture** - done, it's cleaner and more maintainable
2. **Add missing homepage elements** - Ask button, LocalSearch, filters
3. **Use URL params for search/filter state** - enables sharing and back button
4. **Consider horizontal scroll for filters on mobile** - common pattern, preserves visibility
5. **Place Ask button top-right on desktop, below title on mobile** - matches wireframe while being mobile-friendly
6. **Implement GlobalSearch** - replace placeholder with actual search functionality

---

## Appendix: To Start New Conversation

Provide context:

> Implementing remaining homepage elements (Ask Question button, LocalSearch input, filter chips) based on analysis in report.md. QuestionCards and data layer already complete.
