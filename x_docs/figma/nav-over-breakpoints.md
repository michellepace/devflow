# Target: Ho Nav (and layout) Should Work At Different Breakpoints

The image [nav-over-breakpoints.jpg](x_docs/figma/nav-over-breakpoints.jpg) contains 5 screenshots of the target UI for navigation. The content of this document describes what the image shows visually. This content is concerned with layout more than UI details like text, link names etc. The five screenshots in the image are taken on the ask-questions page of the implemented course project follow along. It is my goal to pragmatically align to this following elegant and best practices.

---

## Breakpoint Analysis

| # | Breakpoint | Range | Layout |
|:--|:-----------|:------|:-------|
| 1 | `< sm` | 0–639px | Mobile, nav closed |
| 2 | `< sm` | 0–639px | Mobile, nav open (sheet) |
| 3 | `sm` to `lg` | 640–1023px | Icon-only sidebar |
| 4 | `lg` to `xl` | 1024–1279px | Full sidebar |
| 5 | `≥ xl` | 1280px+ | Full sidebar + right sidebar |

---

## Navigation Description (Design Terminology)

### Screenshot 1: Mobile Closed (< 640px)

- **Top bar** with logo, CTA button ("Ask a Question"), and **hamburger icon**
- **Off-canvas navigation** is hidden
- Single-column content layout

### Schreenshot 2: Mobile Open (< 640px)

- **Sheet/drawer** slides in from left (overlay pattern)
- **Vertical navigation list** with icons + labels
- **Primary nav items**: Home, Community, Collections, Find Jobs, Tags, Ask a question
- **Auth actions** pinned to bottom: Log in, Sign up
- Dark scrim behind sheet

### Screenshot 3: Icon-Only Sidebar (640–1023px)

- **Persistent rail navigation** (narrow vertical bar)
- Icons only, no labels visible
- **Interaction**: When user clicks an icon in the rail (screenshot 3), it navigates directly, no tooltip/popover
- **Top bar** now shows full logo ("DevOverflow") + search field
- Two-column layout: rail + main content

### Screenshot 4: Full Sidebar (1024–1279px)

- **Persistent sidebar** with icons + labels
- Fixed width (appears ~220px / `w-56`)
- Same nav items as mobile sheet
- Two-column layout: sidebar + main content

### Screenshot 5: Three-Column (≥ 1280px)

- Full left sidebar (unchanged)
- Main content (centre)
- **Right sidebar** with contextual widgets e.g. "Top Questions" in screenshot (5)
- Three-column layout
- Pages requiring right sidebar: root, ask-question, collections.

## Right Sidebar: how to structure now for later

Three pages require a right sidebar (root, ask-question, collections). I am wondering if perhaps it is I know best practice to organise routes to support this three-column layout.

The current route structure is:

```bash
~/projects/nextjs/devflow/app/(root) git:(mobile-nav) ✗ 
$ tree .
.
├── ask-question
│   └── page.tsx
├── collections
│   └── page.tsx
├── community
│   └── page.tsx
├── jobs
│   └── page.tsx
├── layout.tsx
├── page.tsx
├── profile
│   └── page.tsx
└── tags
    └── page.tsx

7 directories, 8 files
```

This is **an idea only from a beginner who is unfamiliar with best practice:**

<idea>

## Structure

```text
app/(root)
├── (with-right-sidebar)
│   ├── layout.tsx        ← includes RightSidebar
│   ├── page.tsx          ← home
│   ├── ask-question
│   │   └── page.tsx
│   └── collections
│       └── page.tsx
├── (without-right-sidebar)
│   ├── community
│   │   └── page.tsx
│   ├── jobs
│   │   └── page.tsx
│   ├── profile
│   │   └── page.tsx
│   └── tags
│       └── page.tsx
└── layout.tsx            ← shared: Navbar + LeftSidebar
```

---

## How It Works

**Root layout** (all pages):

```tsx
// app/(root)/layout.tsx
<Navbar />
<div className="flex">
  <LeftSidebar />
  <main className="flex-1">{children}</main>
</div>
```

**With-right-sidebar layout** (3 pages):

```tsx
// app/(root)/(with-right-sidebar)/layout.tsx
<div className="flex">
  {children}
  <RightSidebar className="hidden xl:block" />
</div>
```

The nested layout wraps only those three routes.

</idea>
