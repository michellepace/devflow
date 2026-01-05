# Searchbox Component Feature Specification

Build a Stack Overflow-style search combobox using shadcn/ui components.

## Goal

Create a `Searchbox` component that displays search operator hints on focus, supporting both desktop (visible input) and mobile (icon trigger) layouts.

---

## Requirements

### Functional Requirements

| Requirement | Details |
|-------------|---------|
| **Focus behaviour** | Dropdown opens on input focus, closes on blur/Escape |
| **Form submission** | Enter key submits to `/search?q={query}` |
| **Operator hints** | Show 6 static search operators (not autocomplete) |
| **Footer link** | "Ask a question" links to `/questions/ask` |
| **Operator insertion** | Clicking an operator inserts it into the input |

### Search Operators (6 total)

| Operator | Description |
|----------|-------------|
| `[tag]` | search within a tag |
| `user:1234` | search by author |
| `"words here"` | exact phrase |
| `answers:0` | unanswered questions |
| `score:3` | posts with a 3+ score |
| `is:question` | type of post |

### Responsive Behaviour

| Breakpoint | Search Trigger | Dropdown Layout |
|------------|---------------|-----------------|
| < `sm` (640px) | Icon button in topbar | Single column |
| `sm` to `lg` | Visible input field | Single column |
| ≥ `lg` (1024px) | Visible input field | Two columns |

**Mobile-first approach**: Base styles target mobile. Use `sm:` for input visibility, `lg:` for two-column layout.

---

## Architecture Decision

### Component: `Popover` + `Command`

Use shadcn `popover` wrapping `command` (built on cmdk) with `shouldFilter={false}` for static hints.

**Rationale**:

- `Command` alone is always visible — `Popover` provides focus-triggered show/hide
- Built-in keyboard navigation (arrow keys, Escape)
- `shouldFilter={false}` disables search filtering (we want static hints)
- Established shadcn pattern (see `combobox-demo` examples)

**Install**: `npx shadcn@latest add command popover` (already installed)

### Component Structure

```
Searchbox ("use client")
├── Form (action → /search?q=...)
│   └── Popover (open state controlled by focus)
│       ├── PopoverTrigger (asChild)
│       │   └── div.relative
│       │       ├── Search icon (left)
│       │       └── Input (search field)
│       └── PopoverContent (align="start", sameWidthAsTrigger)
│           └── Command (shouldFilter={false})
│               ├── CommandList (grid layout at lg:)
│               │   └── 6 × CommandItem (operators)
│               ├── CommandSeparator
│               └── Footer: Link to /questions/ask
```

---

## Files to Modify

| File | Action |
|------|--------|
| `components/search/searchbox.tsx` | Replace placeholder with full implementation |
| `components/navigation/mobile-topbar.tsx` | Add search icon trigger + mobile search sheet |
| `app/(root)/search/page.tsx` | Create search results page (stub) |

### Existing Files (read-only context)

| File | Relevance |
|------|-----------|
| `components/navigation/desktop-topbar.tsx` | Already imports `<Searchbox />` |
| `app/globals.css` | Theme variables: `--top-bar-height`, colours, radii |
| `components.json` | shadcn config: `new-york` style, lucide icons |

---

## Implementation Details

### Searchbox Component

**Location**: `components/search/searchbox.tsx`

**Key implementation notes**:

1. **Client component** — requires `"use client"` for state and event handlers
2. **Controlled input** — track `query` state for form submission and operator insertion
3. **Focus management** — use `onFocus`/`onBlur` to control Popover `open` state
4. **Operator click handler** — append operator to query, refocus input
5. **Form submission** — use `router.push('/search?q=' + query)` or native form action

**Styling notes**:

- Use `font-mono` for operator syntax display
- Use `text-muted-foreground` for descriptions
- Use `bg-popover` for dropdown background
- Match `--radius-lg` for border radius
- PopoverContent width should match input width

### Mobile Search

**Location**: `components/navigation/mobile-topbar.tsx`

**Implementation options**:

1. **Sheet pattern (recommended)**: Search icon opens a sheet/overlay with full search UI
2. **Inline expansion**: Icon expands to full-width input in topbar

The sheet pattern is cleaner — keeps topbar simple, provides focused search experience.

**Mobile flow**:

1. Topbar shows: Logo | Search icon | Menu icon
2. Tap search icon → Sheet slides down with Searchbox
3. Searchbox opens with dropdown visible
4. Submit or tap outside to close

### Search Route

**Location**: `app/(root)/search/page.tsx`

**Stub implementation**:

```tsx
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  return <div>Search results for: {q}</div>
}
```

---

## Accessibility

| Element | ARIA Pattern |
|---------|--------------|
| Search container | `role="search"` landmark |
| Input | `role="combobox"` with `aria-expanded` |
| Dropdown | Managed by cmdk (listbox pattern) |
| Keyboard | Arrow keys navigate, Escape closes, Enter submits |

---

## Reference Screenshots

Located in `.playwright-mcp/`:

| File | Description |
|------|-------------|
| `stackoverflow-search-mobile-400px-open.png` | Mobile dropdown (single column) |
| `stackoverflow-search-tablet-700px-open.png` | Tablet dropdown (single column) |
| `stackoverflow-search-desktop-1024px-expanded.png` | Desktop dropdown (two columns) |

---

## Success Criteria

- [ ] Searchbox renders in desktop topbar with focus-triggered dropdown
- [ ] Mobile topbar has search icon that opens search sheet
- [ ] Dropdown shows 6 operators in single column (mobile) / two columns (desktop)
- [ ] Enter submits to `/search?q=...`
- [ ] Clicking operator inserts it into input
- [ ] "Ask a question" link navigates to `/questions/ask`
- [ ] Keyboard navigation works (arrows, Escape, Enter)
- [ ] Styling uses theme variables from `globals.css`
