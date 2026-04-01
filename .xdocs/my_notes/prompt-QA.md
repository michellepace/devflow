# Code Quality Evaluation

Evaluate all **staged files** (`git diff --cached --name-only`) for code quality, architecture, and best practices.

## Current Baseline Status

All checks pass as of evaluation start - no need to run these yourself:

- **Lint & Typecheck** (`npm run check`): ✅ Passing
- **Unit Tests** (`npm run test:unit`): ✅ 44 tests passing
- **E2E Tests** (`npm run test:e2e`): ✅ 17 tests passing

## Tech Stack Context

- Next.js 16 (App Router, async params)
- React 19 (React Compiler enabled)
- Tailwind CSS v4 (new @import syntax, @theme inline)
- shadcn/ui (New York style, CSS variables)
- TypeScript strict mode
- British English

## Baseline Context

Always read `globals.css` first to understand the project's theming tokens and CSS architecture.

## Evaluation Criteria

Analyse staged files against these principles, grouped by category:

### 1. Architecture

- Component responsibility and separation of concerns
- Custom hooks extracting reusable logic
- Appropriate file/folder structure

Note:

- For current desktop search architecture, see inbetween tags `<current_desktop_search_architecture>` in appendix
- (do not limit architecture consideration to this only, its provided as an aid)

### 2. shadcn/ui Approach

- Use shadcn MCP tools to compare components against upstream registry
- Find best-practice usage examples via `get_item_examples_from_registries`
- Use the `/shadcn-ui:shadcn-ui` skill for guidance
- Check for proper composition patterns (Slot, asChild, variants via CVA)

### 3. Tailwind Best Practices

- Utility-first (avoid unnecessary custom CSS)
- Mobile-first responsive design (base styles for mobile, md:/lg: for larger)
- Consistent use of design tokens (bg-card not arbitrary colours)

### 4. Centralised Theming

- CSS variables for colours, spacing, radii
- No hardcoded colours or magic numbers
- Theme-aware styling (proper dark: variants)
- Consistent token usage across components

### 5. Code Quality

- **DRY**: Extract repeated patterns (but not prematurely)
- **YAGNI**: No speculative abstractions
- **Elegance**: Code that's easy to read and understand
- **Pragmatism**: When principles conflict, favour clarity and practicality

## Process

1. Read `globals.css` for theming context
2. Get staged files: `git diff --cached --name-only`
3. Read all staged files thoroughly
4. Launch explorer agents to understand surrounding context
5. Use shadcn MCP tools to check registry patterns and find examples
6. Analyse against all criteria above
7. Write findings to `report.md`

## Output Format

Write a `report.md` file with this structure:

```md
# Code Quality Report

**Files evaluated**: [list of staged files]
**Date**: [timestamp]

## Summary

[1-2 sentence overall assessment]

## Architecture

[Issues or "No issues found"]

## shadcn/ui Approach

[Issues or "No issues found"]

## Tailwind Best Practices

[Issues or "No issues found"]

## Centralised Theming

[Issues or "No issues found"]

## Code Quality (DRY, YAGNI, Elegance)

[Issues or "No issues found"]
```

### Issue Format

Each issue should follow this format:

```md
### 🔴 [Short issue title]

**File**: `path/to/file.tsx:42`
**Problem**: [Clear description of what's wrong]
**Why it matters**: [Why this is bad practice / the consequence of not fixing]
```

### Severity Indicators

- 🔴 **High**: Significant impact on maintainability, consistency, or correctness
- 🟡 **Medium**: Suboptimal but functional; worth addressing
- 🟢 **Low**: Minor improvement; nice-to-have

## Guiding Principle

**Elegant pragmatism**: Favour code that is easy to understand and practically maintainable. When principles conflict (e.g., DRY suggests extraction but YAGNI suggests it's premature), choose the option that results in clearer, more readable code. Flag genuine tradeoffs for user decision.

## Important

- Do NOT include code snippets or proposed fixes
- Focus on explaining WHY something is a problem
- User will investigate each issue separately to brainstorm solutions

## Appendix: Current Desktop Search Architecture

<current_desktop_search_architecture>

## Design

The desktop search bar is intentionally narrower than the main content area (`max-w-2xl` = 672px vs content's `max-w-5xl` = 1024px). This provides visual distinction so the popover doesn't blend into the page content.

## Component Hierarchy

```
desktop-topbar.tsx (server)
└── DesktopSearch (client) ─── desktop-search.tsx
    ├── useSearch hook ─────── hooks/use-search.ts
    ├── SearchInput ────────── search-input.tsx (shared with mobile)
    ├── SearchPopoverContent ─ search-popover-content.tsx (shared)
    └── SearchHints ────────── search-hints.tsx (shared, variant="desktop")
```

## Width Control Points

**1. Container in `desktop-topbar.tsx:9-12`:**

```tsx
<div className="flex flex-1 items-center md:px-8 lg:px-10 xl:px-14">
  <div className="mx-auto w-full max-w-2xl">  {/* ← Controls search bar max width (672px) */}
    <DesktopSearch />
  </div>
</div>
```

**2. Popover in `search-popover-content.tsx:17`:**

```tsx
className="w-(--radix-popover-trigger-width) ..."  {/* ← Matches input width exactly */}
```

The `--radix-popover-trigger-width` CSS variable is auto-set by Radix to match the PopoverAnchor element (the `<form>` in DesktopSearch).

## Breakpoints

| Breakpoint | Viewport | Behaviour |
|------------|----------|-----------|
| md | 768px+ | Desktop topbar appears |
| lg | 1024px+ | Padding increases (`lg:px-10`) |
| xl | 1280px+ | Right sidebar appears, padding increases (`xl:px-14`) |

## Key Files

- `components/navigation/desktop-topbar.tsx` — container width constraints
- `components/search/search-popover-content.tsx` — popover width
- `components/search/desktop-search.tsx` — form/anchor wrapper

## Shared Components

`SearchInput`, `SearchPopoverContent`, `SearchHints`, and `useSearch` are shared with `mobile-search.tsx`. Mobile uses full-width overlay, completely independent layout.

</current_desktop_search_architecture>
