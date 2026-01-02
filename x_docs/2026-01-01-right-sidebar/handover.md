# Right Sidebar Handover - STALE DOCUMENTATION - FOR HISTORICAL PURPOSES ONLY

Target audience: Claude Code

## What's Been Implemented  — ✅ Done

The right sidebar displays **Top Questions** and **Popular Tags** sections with clickable links to placeholder pages.

### Components Created

| File | Purpose |
|------|---------|
| `components/right-sidebar/right-sidebar.tsx` | Async Server Component container |
| `components/right-sidebar/question-link.tsx` | Clickable question title + ChevronRight icon |
| `components/right-sidebar/tag-link.tsx` | Tag link + optional question count |
| `components/ui/badge.tsx` | shadcn Badge with custom `toptag` variant |
| `app/(root)/question/[id]/page.tsx` | Placeholder page — `/question/123` |
| `app/(root)/tags/[slug]/page.tsx` | Placeholder page — `/tags/nextjs` |

> **URL strategy:** Questions use numeric IDs (database keys); tags use name slugs for SEO-friendly URLs.

### Data Layer

| File | Purpose |
|------|---------|
| `lib/data/questions.ts` | `Question` type + `getTopQuestions(limit)` |
| `lib/data/tags.ts` | `Tag` type + `getPopularTags(limit)` |

Mock data with async functions ready for MongoDB migration. `RightSidebar` fetches via `Promise.all()`.

### Design Reference

Target design: `pic1-target.jpg` (dark mode Figma mockup in repo root)

### Verifications

- ✅ `npm run check` passes
- ✅ `npm run test` passes
- ✅ Dev server runs on port 3000

- ✅ E2E test: `e2e/right-sidebar.desktop.spec.ts`
- ✅ Unit tests: `lib/data/questions.test.ts`, `lib/data/tags.test.ts`

---

## Align Tag Styling to `pic1-target.jpg` — ✅ Done

### Goal

Align visual appearance of `components/right-sidebar/tag-link.tsx` to the target design. Use recommended best pragmatic practice of centralised theming (CSS custom properties in `app/globals.css`)

### Context & Visual Analysis

Current approach: Both `QuestionLink` and `TagLink` are server components using Next.js `Link` with hover states (`hover:bg-accent/50`). The `TagLink` renders a Badge for the tag name and a separate span for the count, with the entire row wrapped in a Link for clickability.

Visual comparison:

| Screenshot | File |
|------------|------|
| Target design | `pic1-target.jpg` |
| Current implementation | `pic2-current.jpg` |

Current: `TagLink` uses `Badge variant="toptag"` (`components/ui/badge.tsx`).

Reference: `h_tagstyle.md` contains extracted styling from the course project (older conventions — Next.js 15, Tailwind config). Examine centralised theming in `app/globals.css` and evaluate fit before adopting. Specifically: are there existing semantic colour variables that closely match? Report findings before defining new variables.

---

## Restyle QuestionLink Microinteractions — ✅ Done

Component: `components/right-sidebar/question-link.tsx`
Screenshot (current): `current.jpg`
Reference: `x_docs/mine/micro-interactions.md`

### Goal

Replace the dated `hover:bg-accent/50` overlay with Linear-style microinteractions using Tailwind only.

### Requirements

- Remove background hover overlay
- Add subtle hover feedback (choose 1-2):
- Chevron: translate right ~2px then return
- Text: underline or subtle colour shift
- Other: suggest if better suited

### Constraints

- Tailwind CSS only (no Motion library)
- Must work in both light and dark modes

---

## Now: Devicon Integration

### Goal

Add technology icons to tag badges using the [Devicon](https://devicon.dev/) font library. Icons should render automatically for user-created tags (normalised) when a matching devicon exists. If no match, render the devicon's generic icon or a lucide react icon (to be confirmed).

These are preliminary draft details in `<draft>` tags, will be formalised later:

<draft>

### Approach (to be determined)

Both approaches use the [Devicon font](https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/README.md). The difference is how class names are resolved:

1. **Convention-based** — dynamically build class name from tag name using pattern `devicon-{name}-plain colored`, validate against a `Set` of known icon names, with alias map for variations

2. **Mapping table** — lookup full class string from a large object (`techMap`) as implemented in `~/projects/nextjs/jsmasterypro_devflow`

Investigate both approaches and recommend the simplest, most maintainable solution.

### Success Criteria

Functional:

- [ ] Devicon font installed and loading
- [ ] Utility function `getDeviconClassName(tagName: string)` created in `lib/utils.ts`
- [ ] Tag name normalization works (lowercase, remove dots/spaces)
- [ ] Tag badges display correct icons for known technologies
- [ ] Unknown tags display fallback icon (not blank)

Verified:

- [ ] Icons render correctly for: nextjs, react, javascript, postgres
- [ ] Alias resolution works: js → javascript, ts → typescript
- [ ] Fallback renders for unknown tag name (e.g., "madeuptag")
- [ ] UI aligns with `pic1-target.jpg`

</draft>
