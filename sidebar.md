# Desktop navigation: Persistent Left Sidebar Navigation (>= `sm`)

## Figma Visual Reference

PLEASE ANALYSE VISUALLY: `x_docs/figma/nav-over-breakpoints.jpg`

Sidebar visual details:

<sidebar_visual_details>

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

</sidebar_visual_details>

Breakpoint analysis:

<breakpoint_analysis>

```markdown
| # | Breakpoint | Range | Layout |
|:--|:-----------|:------|:-------|
| 1 | `< sm` | 0–639px | Mobile, nav closed |
| 2 | `< sm` | 0–639px | Mobile, nav open (sheet) |
| 3 | `sm` to `lg` | 640–1023px | Icon-only sidebar |
| 4 | `lg` to `xl` | 1024–1279px | Full sidebar |
| 5 | `≥ xl` | 1280px+ | Full sidebar + right sidebar |
```

</breakpoint_analysis>

## Important Implementation Notes

<important_implementation_notes>

This sidebar is the desktop version of `components/mobile-nav`:

- Applies to all pages
- The links used must mirror what is already implemented
- The buttons must be the same too - "Sign in", "Sign up", "Sign out"
- Links are positioned at the top, whilst buttons are aligned at the bottom. Essentially, two groups placed in different positions.
  - ❓🔥 Does `mobile-nav.tsx` need to be refactored?
- Active state of route - mirror `mobile-nav.tsx`
- Styling - centralised theming like `mobile-nav.tsx` EXCEPT use `background` shadcn/ui semantic colour.
- Mobile-first approach: Tailwind uses mobile-first breakpoints. Unprefixed utilities apply to all screens; prefixed utilities (e.g., `sm:`, `md:`, `lg:` etc.) apply at that breakpoint *and above*.
</important_implementation_notes>

Current Route Structure:

```text
app/(root)
├── (with-right-sidebar)
│   ├── layout.tsx        ← includes Future RightSidebar
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

## Flex Properties

Various flex properties that could be helpful

<flex_properties>

| Property | Docs | Description | Applicable? |
|:---------|:-----|:------------|:------------|
| [Flex Direction](https://tailwindcss.com/docs/flex-direction) | `flex-col` | Sets item direction in container (row, column, row-reverse, column-reverse) | ✅ Core — use `flex-col` to stack nav groups vertically |
| [Justify Content](https://tailwindcss.com/docs/justify-content) | `justify-between` | Positions items along main axis; spreads items to container edges | ✅ Critical — use `justify-between` to push top 6 links up, bottom 2 down |
| [Align Items](https://tailwindcss.com/docs/align-items) | `items-center` | Aligns items along cross-axis (perpendicular to main) | ✅ Useful — centre-align icons/labels horizontally within sidebar width |
| [Flex Grow](https://tailwindcss.com/docs/flex-grow) | `grow` | Defines how items grow to fill available space proportionally | ⚠️ Optional — useful for spacer elements if you need more than two groups |
| [Flex Shrink](https://tailwindcss.com/docs/flex-shrink) | `shrink-0` | Prevents items from shrinking when space is limited | ⚠️ Optional — use `shrink-0` on nav links to maintain consistent dimensions |
| [Flex Basis](https://tailwindcss.com/docs/flex-basis) | `basis-16` | Sets initial size of item before growing/shrinking | ⚠️ Optional — could set sidebar width at breakpoints (e.g., icon-only rail) |
| [Flex](https://tailwindcss.com/docs/flex) | `flex-1` | Shorthand for grow + shrink + basis together | ⚠️ Optional — `flex-1` on spacer if using spacer approach (prefer `justify-between`) |
| [Align Self](https://tailwindcss.com/docs/align-self) | `self-end` | Overrides container alignment for a specific item | ⚠️ Low — only if individual items need different cross-axis alignment |

</flex_properties>

Remember, analyse `mobile-nav.tsx` - does it use `flex` already, and if not, should we refactor?
