# Search Design Specification - STALE DOCUMENTATION / HISTORICAL RECORD ONLY

Target: Stack Overflow-inspired search pattern adapted for DevFlow. Breakpoint: `md` (768px).

**Reference screenshots:** `z-mobile.jpg`, `z-desktop.jpg`

> **Scope:** This specification covers ONLY the search input and hints panel. Reference screenshots show Stack Overflow's full UI — ignore all elements except the search components (topbar search icon/input and hints dropdown).

---

## Functional Requirements

| Requirement | Details |
|-------------|---------|
| **Focus behaviour** | Dropdown opens on input focus, closes on blur/Escape |
| **Close behaviour** | Click outside OR Escape key closes search completely (2-state model) |
| **Form submission** | Enter key submits to `/search?q={query}` |
| **Operator insertion** | None — hints are display-only guidance |

---

## Current Topbar Structure

**Mobile (`< md`) — `mobile-topbar.tsx`:**

```
Logo | [SEARCH ICON - to add] | Hamburger (MobileNav)
```

**Desktop (`>= md`) — `desktop-topbar.tsx`:**

```
Searchbox (placeholder) | Sign in / Sign up
```

**Existing:** `components/search/searchbox.tsx` — placeholder component, already imported in desktop topbar.

---

## Mobile Search

**Topbar modification:** Add search icon button between Logo and Hamburger menu.

**Behaviour (2-state model):**

1. **Idle state:** Search icon only visible in topbar (between logo and hamburger)
2. **Active state (on click):**
   - Search input appears **below topbar** at full width
   - Search icon in topbar gets subtle highlight
   - Topbar remains intact (logo, search icon, hamburger visible)
   - After 0.5s delay: Static hints panel appears below input
   - **Close:** Click outside OR Escape → returns to idle state

**Hints Panel:**

- Single column layout
- **Overlays page content** (positioned absolutely, does not push content down)
- Non-interactive guidance (not selectable)
- Footer: "Ask a question" button (primary style) → `/questions/ask`

---

## Desktop Search (>= md)

**Topbar:** Searchbox (always visible) | Sign in / Sign up

**Behaviour (2-state model):**

1. **Idle state:** Search input always visible inline in topbar (current `Searchbox` location)
2. **Active state (on focus):**
   - Hints dropdown appears immediately below input (no delay)
   - Input gets focus ring/highlight
   - Topbar remains intact
   - **Close:** Click outside OR Escape → hints close

**Hints Dropdown:**

- **Two-column layout** (left column: tag/user/phrase, right column: filters)
- **Overlays page content** (positioned absolutely, does not push content down)
- Non-interactive guidance (not selectable)
- Footer: "Ask a question" button (primary style) → `/questions/ask`
- **Excluded:** "Search help" link (visible in reference screenshot, not implementing)

---

## Shared Hints Content

| Syntax | Description |
|--------|-------------|
| `[tag]` | search within a tag |
| `user:1234` | search by author |
| `"words here"` | exact phrase |
| `answers:0` | unanswered questions |
| `score:3` | posts with a 3+ score |
| `is:question` | type of post |

---

## Divergences from Stack Overflow

**Excluded hints (not applicable to DevFlow):**

- `collective:"Name"` — collective content (SO-specific feature)
- `isaccepted:yes` — search within status (not implemented)

**Excluded UI elements:**

- "Search help" link — not required

**Behaviour changes:**

- **Mobile close:** SO uses 3-state model (idle → input+hints → input-only). DevFlow uses simpler 2-state model (idle ↔ active) — click outside closes completely

---

## Key Differences

| Aspect | Mobile | Desktop |
|--------|--------|---------|
| Search visibility | Icon only (hidden input) | Always visible input |
| Input position | Below topbar (overlay) | Inline in topbar |
| Hints layout | Single column | Two columns |

---

## Implementation Notes

- **Component type:** Expandable search input with static hints popover
- **Not a combobox:** Hints are guidance text, not selectable options
- **Hints panel positioning:** Absolutely positioned overlay (not in document flow), requires appropriate z-index
- Search input and hints panel are a single-level component (not modal/nested)
- Topbar remains visible when search is active (mobile)
- Mobile requires adding search icon to `mobile-topbar.tsx`
- Desktop uses existing `Searchbox` component location

**Styling:**

- Use `font-mono` for operator syntax display
- Use `text-muted-foreground` for descriptions
