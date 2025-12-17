# Mobile Navigation Implementation Guidance

## Overview

Build a mobile navigation menu for the DevFlow app using shadcn/ui Sheet component. The app uses a mobile-first Tailwind approach.

## Figma Reference

Review these designs before implementation:

- **Mobile nav closed:** `x_docs/figma/mobile/dark-nav_close.png`
- **Mobile nav open:** `x_docs/figma/mobile/dark-nav_open.png`

> **Figma Note:** Implementation diverges minimally from Figma designs
>
> 1. Figma shows "Login/Signup" but use "Sign in" and "Sign up" to match the existing navbar.
> 2. NAV_LINKS differ slightly in implementation - NAV_LINKS is the source of truth

## Responsive Behaviour

Using mobile-first Tailwind: the hamburger menu is the default, hidden at `sm:` and above.

| Screen Width | Navigation Style |
|--------------|------------------|
| Below `sm` (< 640px) | Hamburger icon → opens Sheet |
| `sm` and above (≥ 640px) | Desktop nav (no changes needed) |

---

## Implementation Requirements

### 1. Navigation Constants

**Create:** `components/navigation/constants.ts`

Centralised nav links used by both mobile nav (now) and desktop sidebar (future).

> **Figma Note:** This list diverges slightly from the Figma designs (e.g., includes Profile). This is the source of truth.

```ts
export const NAV_LINKS = [
  { imgURL: "/icons/home.svg", route: "/", label: "Home" },
  { imgURL: "/icons/users.svg", route: "/community", label: "Community" },
  { imgURL: "/icons/star.svg", route: "/collections", label: "Collections" },
  { imgURL: "/icons/suitcase.svg", route: "/jobs", label: "Find Jobs" },
  { imgURL: "/icons/tag.svg", route: "/tags", label: "Tags" },
  { imgURL: "/icons/question.svg", route: "/ask-question", label: "Ask a question" },
  { imgURL: "/icons/user.svg", route: "/profile", label: "Profile" }, // See Appendix
] as const;
```

Icons exist in `public/icons/`.

---

### 2. Navbar Modifications

**File:** `components/navigation/navbar.tsx`

**Below `sm` breakpoint:**

- Keep logo as-is (compact icon)
- Keep theme toggle as-is
- Add hamburger icon (`public/icons/hamburger.svg`) — visible only below `sm`
- Hide "Sign in" and "Sign up" buttons (they move into the Sheet)

**At `sm` and above:**

- No changes to current behaviour

---

### 3. New Mobile Nav Component

**Create:** `components/navigation/mobile-nav.tsx`

#### Sheet Configuration

- Use shadcn/ui Sheet, sliding from the left
- Width: default (no override)
- Height: `calc(100vh - 80px)` — intentional gap at bottom (design choice IF POSSIBLE_
- Reference docs:
  - `/home/mp/projects/python/docs-for-ai/shadcn/sheet-shadcnui.md`
  - `/home/mp/projects/python/docs-for-ai/shadcn/shadcn-sheet.md`

#### Sheet Behaviour

- Hamburger icon (`public/icons/hamburger.svg`) in navbar opens the Sheet
- When open, hamburger transforms to X icon (`public/icons/close.svg`) in the same position
- Clicking X closes the Sheet
- Clicking overlay closes the Sheet
- Clicking a nav link routes the user and auto-closes the Sheet

#### Sheet Content (top to bottom)

1. **Header:** Full logo (use `--logo-full-themed` CSS variable pattern from `globals.css`)
2. **Navigation links:**
   - Import from `constants.ts`
   - Use `<Link>` elements (not buttons)
   - Base styling: `text-lg text-foreground` with transparent background
   - Active route: `font-bold bg-[image:var(--gradient-primary)] text-white rounded-lg`
   - Non-active: `font-medium`
   - Determine active state by matching `pathname` to route
3. **Auth buttons (bottom):** See Section 4

---

### 4. Auth Buttons (Bottom of Sheet)

Only visible when user is **signed out**. Use Clerk's `SignedOut` wrapper.

| Button | Text | Styling |
|--------|------|---------|
| Sign in | "Sign in" | `variant="outline"` with `className="border-primary text-primary"` |
| Sign up | "Sign up" | `variant="gradient"` |

When **signed in**, hide this section entirely — users access account management via the `<UserButton />` in the header.

> **Note:** This differs from the main navbar styling intentionally to match Figma.

---

### 5. Placeholder Pages

Create placeholder pages in the `(app)` route group using the new shadcn/ui Empty component.

**Install:**

```bash
npx shadcn@latest add empty
```

**Routes to create:**

- `/community`
- `/collections`
- `/jobs`
- `/tags`
- `/ask-question`
- `/profile`

**Example usage:**

```tsx
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty"

export default function CommunityPage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Community</EmptyTitle>
        <EmptyDescription>Coming soon</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
```

---

## Existing Code Reference

| File | What to reference |
|------|-------------------|
| `components/navigation/navbar.tsx` | Current navbar structure, Clerk auth buttons |
| `components/navigation/constants.ts` | Nav links (create this first) |
| `components/navigation/theme-toggle.tsx` | Theme toggle pattern |
| `components/ui/button.tsx` | `variant="outline"` and `variant="gradient"` for auth buttons |
| `app/globals.css` | `--logo-full-themed`, `--gradient-primary` (also used in active link className) |
| `components/clerk-provider.tsx` | Clerk theming setup |

## Clerk Documentation

For additional guidance on styling Clerk components:

- Search Index for local official docs: `/home/mp/projects/python/docs-for-ai/clerk/INDEX.xml`

---

## Out of Scope

- Desktop left sidebar (future task)

## Appendix - Working with `clerk` UI

I installed clerk via `npx shadcn@latest add @clerk/nextjs-quickstart` which means I have pre-built UI components from Clerk. These are conversations I had with the clerk AI documentation assistant that will be useful:

### Styling Clerk Components

Here are some pointers from the Clerk Docs AI Assistant inbetween tags `<clerk_docs_conversation1>`

<clerk_docs_conversation1>

<my_question>can I use tailwind and variables that are in globals.css to style these pre-built components?</my_question>

<ai_assistant_answer> Yes, you can style Clerk's pre-built components using both Tailwind classes and CSS variables from your `globals.css`.

**For Tailwind CSS v4 specifically**, you need to set the `cssLayerName` property on your `<ClerkProvider>` to ensure Tailwind's utility styles are applied after Clerk's styles [(1)](~/projects/python/docs-for-ai/clerk/appearance-prop.md) :

```tsx
<ClerkProvider
  appearance={{
    cssLayerName: 'clerk',
  }}
>
  {/* ... */}
</ClerkProvider>
```

Then add this to your `globals.css` [(2)](~/projects/python/docs-for-ai/clerk/themes.md) :

```css
@import 'tailwindcss';
@import '@clerk/themes/shadcn.css';
```

**To use Tailwind classes**, pass them through the `elements` property [(1)](~/projects/python/docs-for-ai/clerk/appearance-prop.md) :

```tsx
<SignIn
  appearance={{
    elements: {
      formButtonPrimary: 'bg-slate-500 hover:bg-slate-400 text-sm',
    },
  }}
/>
```

**To use CSS variables from your `globals.css`**, pass them to the `variables` property [(3)](~/projects/python/docs-for-ai/clerk/variables-prop.md) :

```tsx
<ClerkProvider
  appearance={{
    variables: {
      colorPrimary: 'var(--your-primary-color)',
      colorForeground: 'var(--your-text-color)',
    },
  }}
>
```

Since you're using shadcn/ui, you can also use the `shadcn` theme which automatically adapts to both light and dark mode [(2)](~/projects/python/docs-for-ai/clerk/themes.md) .

 [(1)](~/projects/python/docs-for-ai/clerk/appearance-prop.md)

 [(2)](~/projects/python/docs-for-ai/clerk/themes.md)

 [(3)](~/projects/python/docs-for-ai/clerk/variables-prop.md)

For any further guidance, make use of the index to find relevant local documentation files `~/projects/python/docs-for-ai/clerk/INDEX.xml`
</ai_assistant_answer>

</clerk_docs_conversation1>

### "Account" link in Mobile Nav

> **Note:** This was considered but not implemented. Signed-in users access account management via the `<UserButton />` in the header. Keeping this conversation for future reference only.
