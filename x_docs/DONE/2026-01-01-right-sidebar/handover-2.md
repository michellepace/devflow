# Devicon Integration Handover

## Goal

Add technology icons to tag badges using the [Devicon](https://devicon.dev/) font library. Icons should render automatically for tags when a matching devicon exists, with a fallback for unknown tags.

## Usage Context

Users can create arbitrary tags when asking questions — the system doesn't know ahead of time what technologies users will tag. Icons should appear automatically for any technology that exists in the devicon registry (600+ icons).

## Visual Reference

Target design: [tags.jpg](tags.jpg)

Shows tags with devicon icons displayed inline before the tag name in:

- Right sidebar "Popular Tags" section (with `showIcon colored`)

Question cards on the home page use text-only badges (defaults) for a cleaner, less cluttered appearance.

## References

- [Devicon README](devicon-readme.md) — includes CDN installation and usage examples
- [Icon registry JSON](devicon.json) — downloaded from <https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.json>

## Technical Context

Devicon is a **font-based** icon library. Icons render using `<i>` elements with class names:

```html
<i class="devicon-react-original colored"></i>
```

**Important:** Not all icons support all styles. The `devicon.json` registry defines which styles are available per icon via `versions.font`:

| Icon | `versions.font` |
|------|-----------------|
| javascript | `["plain"]` |
| react | `["original", "original-wordmark"]` |
| nextjs | `["plain", "line", "original-wordmark", "line-wordmark"]` |
| tailwindcss | `["original", "plain-wordmark"]` |
| threejs | `["original", "original-wordmark"]` |

A naive convention like `devicon-{name}-plain` will break for react, tailwindcss, and threejs.

Style preference order: `plain` → `original` → `line` → first available

The registry includes an `altnames` array for common variations, enabling automatic alias resolution without manual mapping:

| Icon | `altnames` | Lookup examples |
|------|------------|-----------------|
| javascript | `["js", "ecmascript"]` | `js` or `ecmascript` → javascript |
| typescript | `["ts"]` | `ts` → typescript |
| react | `["reactjs"]` | `reactjs` → react |
| nextjs | `[]` | (no aliases) |
| android | `[]` | (no aliases) |

## Current Implementation

| File | Purpose |
|------|---------|
| `components/tag-link.tsx` | Shared TagLink component — wraps Badge in Link |
| `app/(root)/page.tsx` | Uses `<TagLink name={tag} />` (defaults: no icon, monotone) |
| `components/right-sidebar/right-sidebar.tsx` | Uses `<TagLink name={tag.name} questionCount={tag.questions} showIcon colored />` |
| `lib/data/tags.ts` | `Tag` type + `getPopularTags(limit)` |
| `app/globals.css` | CSS custom properties `--tag-bg`, `--tag-text` |

## Approach

Use **JSON Registry Lookup** — commit `devicon.json` locally and use it to auto-validate icons and select correct styles.

- Supports 600+ icons with correct style selection
- Handles aliases automatically (js → javascript)
- No manual maintenance when users create new tags

*A manual mapping table was considered but rejected as unsustainable for user-generated tags.*

## Implementation Architecture

| File | Purpose |
|------|---------|
| `lib/devicon.ts` | `getDeviconClassName(name, colored): string \| null` — normalises tag name, looks up registry, selects correct style, returns class string or null |
| `components/tag-link.tsx` | Props: `name`, `questionCount?`, `showIcon?`, `colored?`. Renders `<i className={iconClass} />` inline when `showIcon` is true and icon exists; falls back to Lucide `<Tag />` for unknown tags |

A separate `<TagIcon />` component was considered but rejected — the rendering logic is trivial (one `<i>` element) and TagLink is currently the only consumer. Can be extracted later if icons appear elsewhere.

## Fallback Strategy

When `showIcon` is enabled, tags without a matching devicon fall back to Lucide React's `<Tag />` icon. This maintains visual rhythm across all badges while clearly indicating "this is a tag" without pretending to be a technology-specific icon.

## Registry Management

Commit `devicon.json` to the repository and update it periodically (monthly). This provides version control, predictable test behaviour, and no build-time external dependencies.

## Test Strategy

Unit tests for `getDeviconClassName()` in `lib/devicon.test.ts`:

- Known icons return correct class (e.g., `react` → `devicon-react-original colored`)
- Aliases resolve correctly (e.g., `js` → `devicon-javascript-plain colored`)
- Style fallback works (prefer `plain` → fall back to `original`)
- Unknown tags return `null`

No E2E tests — visual verification is manual against `tags.jpg`. The resolution logic is pure and fully testable at the unit level.

## Success Criteria

- [x] Devicon CSS loaded via CDN
- [x] Icons render for: nextjs, react, javascript, tailwindcss
- [x] Alias resolution works: js → javascript, ts → typescript
- [x] Unknown tags show Lucide `<Tag />` icon as fallback
- [x] Unit tests pass for `getDeviconClassName()` (known icons, aliases, fallback, unknown)
- [x] Visual alignment matches `tags.jpg`

## Enhancements

Beyond the original specification:

- [x] **Configurable `colored` parameter** — `getDeviconClassName(name, colored)` accepts a second boolean parameter (default: `true`) to toggle between brand colours and monotone icons that inherit `currentColor`
- [x] **`colored` prop on TagLink** — Allows per-usage control: `<TagLink name="react" colored />` for brand colours, omit for monotone
- [x] **`showIcon` prop on TagLink** — Allows per-usage control: `<TagLink name="react" showIcon />` for icons, omit for text-only badges
- [x] **Simplest defaults** — TagLink defaults to no icon (`showIcon = false`) and monotone (`colored = false`) for clean, uncluttered tags; opt-in to `showIcon colored` where visual richness is desired
- [x] **Extended test coverage** — 20 unit tests including colored option tests (default, explicit true, explicit false) and additional alias test (`pugjs` → `pug`)
