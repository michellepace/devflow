# Microinteractions for Next.js 16

This document explains how to add microinteractions to your Next.js 16 application using **Tailwind CSS** and **Motion** (formerly Framer Motion), with specific guidance for shadcn/ui integration and centralised theming.

---

## The Recommended Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| **Base** | Tailwind CSS | Hover, focus, simple transitions (0kb added) |
| **Advanced** | Motion (motion.dev) | Gestures, exit animations, layout, scroll effects |

This two-layer approach covers 95%+ of microinteraction needs for production web applications.

---

## Motion (motion.dev)

Motion is the evolution of Framer Motion, now an independent project with 12+ million monthly npm downloads. It's the industry standard for React animations.

### Why Motion?

**Declarative API:** You animate by passing props, not by writing imperative code. Motion handles the complexity of enter/exit animations, layout shifts, gestures, and scroll-linked effects whilst you focus on *what* you want to animate.

**The philosophy:** "Describe the end state, let Motion figure out how to get there." This matches React's declarative model perfectly.

### Key Features for DevFlow

| Feature | What It Does | DevFlow Use Case |
|---------|--------------|------------------|
| `whileTap` / `whileHover` | Gesture-triggered states | Vote buttons, interactive cards |
| `AnimatePresence` | Exit animations for unmounting elements | Toasts, modals, notifications |
| `layout` | Smooth layout transitions | List reordering, expanding cards |
| `useScroll` / `useInView` | Scroll-linked animations | Reveal effects, parallax |
| `drag` | Draggable elements | Reorder answers, dismiss actions |
| Springs | Physics-based motion | Natural, interruptible animations |

### Bundle Size

```
┌─────────────────────────────────────────────────────────────┐
│ Motion Bundle Size (minified + gzipped)                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Full import        ████████████████████████████████░░  34kb │
│ LazyMotion (m)     █████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  4.6kb│
│ Single hook        ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ~1kb │
│                                                             │
│ Tailwind (CSS)     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0kb  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Motion provides `LazyMotion` for code-splitting and the `m` component for minimal bundles. You can start at ~4.6kb and only load features you use.

### Ecosystem Alignment

The shadcn/ui ecosystem heavily uses Motion. These libraries are designed to work with shadcn/ui and are built on Motion:

| Library | Description | URL |
|---------|-------------|-----|
| **Magic UI** | 20+ animated components, shadcn-compatible | magicui.design |
| **Aceternity UI** | High-impact hero sections, copy-paste ready | ui.aceternity.com |
| **Motion Primitives** | Animated primitives for common patterns | motion-primitives.com |
| **Animate UI** | Full library with Motion at its core | animate-ui.com |

### Production Track Record

Motion is used by Linear, Vercel, Stripe, and thousands of production applications. It's mature, well-maintained, and has excellent performance characteristics including GPU acceleration and 120fps support.

---

## Integrating with shadcn/ui Components

Microinteractions work beautifully with shadcn/ui components. There are three integration patterns:

### Pattern 1: Wrapper Approach

Wrap any shadcn/ui component in a motion element. This is non-invasive and preserves the original component:

```
┌─────────────────────────────────────────────┐
│  motion.div (handles animation)             │
│  ┌───────────────────────────────────────┐  │
│  │  shadcn Button (unchanged)            │  │
│  │  - All original props work            │  │
│  │  - Styling preserved                  │  │
│  │  - Accessibility intact               │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**When to use:** Quick enhancements, one-off animations, prototyping.

### Pattern 2: Motion Component Approach

Convert the shadcn component itself into a motion component. This provides more control and better performance for complex animations:

```
┌─────────────────────────────────────────────┐
│  MotionButton = motion(Button)              │
│  ┌───────────────────────────────────────┐  │
│  │  Single element (no wrapper)          │  │
│  │  - Direct animation props             │  │
│  │  - Better performance                 │  │
│  │  - Cleaner DOM                        │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**When to use:** Reusable animated variants, performance-critical components.

### Pattern 3: Pre-built Animated Libraries

Use component libraries specifically designed for shadcn/ui + Motion (see table above).

**When to use:** When you want production-ready animated components without building from scratch.

### Radix UI Consideration

Since shadcn/ui is built on Radix UI primitives, you get additional animation hooks. Radix components expose data attributes like `data-state="open"` and `data-side="bottom"` that you can use for CSS animations or Motion's conditional animations.

---

## Centralised Theming in globals.css

### The Question

Should microinteraction timings, easings, and animation values be defined centrally in `globals.css` using CSS custom properties?

### The Answer: It Depends on Scope

**Legitimate and recommended for:**

- Consistent timing across the application (e.g., `--duration-fast: 150ms`)
- Standard easing curves (e.g., `--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)`)
- Reduced motion preferences (single source of truth)
- Brand-aligned motion values

**Over-engineering for:**

- Every individual animation's parameters
- Complex choreography that varies by context
- Physics-based values (spring tension/friction)

### Recommended Approach

Define a minimal set of motion tokens in `globals.css`:

```
┌─────────────────────────────────────────────────────────────┐
│  globals.css - Motion Tokens                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  :root {                                                    │
│    /* Durations */                                          │
│    --duration-instant: 100ms;                               │
│    --duration-fast: 150ms;                                  │
│    --duration-normal: 300ms;                                │
│    --duration-slow: 500ms;                                  │
│                                                             │
│    /* Easings */                                            │
│    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);             │
│    --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);          │
│    --ease-bounce: cubic-bezier(0.68, -0.55, 0.27, 1.55);   │
│                                                             │
│    /* Scales */                                             │
│    --scale-pressed: 0.97;                                   │
│    --scale-hover: 1.02;                                     │
│  }                                                          │
│                                                             │
│  @media (prefers-reduced-motion: reduce) {                  │
│    :root {                                                  │
│      --duration-instant: 0ms;                               │
│      --duration-fast: 0ms;                                  │
│      --duration-normal: 0ms;                                │
│      --duration-slow: 0ms;                                  │
│    }                                                        │
│  }                                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### How This Works with Motion

Motion can read CSS custom properties. You reference them in your animation definitions, creating a bridge between your central theme and component-level animations.

### Benefits of This Approach

| Benefit | Explanation |
|---------|-------------|
| 🎯 **Consistency** | All buttons press at the same rate, all modals open at the same speed |
| ♿ **Accessibility** | Single place to respect reduced motion preferences |
| 🎨 **Brand alignment** | Motion becomes part of your design system |
| 🔧 **Easy tuning** | Adjust timing globally without touching components |
| 📦 **Not over-engineering** | You're defining tokens, not implementing animations |

### What NOT to Centralise

Avoid putting these in globals.css:

- Complex spring configurations (keep with the component using them)
- Stagger delays (context-dependent)
- Gesture thresholds (interaction-specific)
- Scroll offsets (layout-dependent)

---

## Decision Tree: Tailwind CSS vs Motion

Use this flowchart to decide whether Tailwind's built-in animations are sufficient or if you need Motion:

```
                        ┌─────────────────────────┐
                        │  What do you need to    │
                        │      animate?           │
                        └───────────┬─────────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              ▼                     ▼                     ▼
    ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
    │  Hover/Focus    │   │  Loading        │   │  Enter/Exit     │
    │  states only?   │   │  indicators?    │   │  (mount/unmount)│
    └────────┬────────┘   └────────┬────────┘   └────────┬────────┘
             │                     │                     │
             ▼                     ▼                     ▼
    ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
    │ ✅ TAILWIND     │   │ ✅ TAILWIND     │   │ 🎬 MOTION       │
    │                 │   │                 │   │                 │
    │ transition-*    │   │ animate-spin    │   │ AnimatePresence │
    │ hover:scale-105 │   │ animate-pulse   │   │ for unmount     │
    │ duration-300    │   │ animate-ping    │   │ animations      │
    └─────────────────┘   └─────────────────┘   └─────────────────┘

                        ┌─────────────────────────┐
                        │  Do you need gestures   │
                        │  or complex motion?     │
                        └───────────┬─────────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              ▼                     ▼                     ▼
    ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
    │  Drag/swipe?    │   │  Layout changes │   │  Scroll-linked  │
    │                 │   │  (reorder)?     │   │  animations?    │
    └────────┬────────┘   └────────┬────────┘   └────────┬────────┘
             │                     │                     │
             ▼                     ▼                     ▼
    ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
    │ 🎬 MOTION       │   │ 🎬 MOTION       │   │ 🎬 MOTION       │
    │                 │   │                 │   │                 │
    │ drag prop       │   │ layout prop     │   │ useScroll       │
    │ gesture hooks   │   │ layoutId        │   │ useInView       │
    └─────────────────┘   └─────────────────┘   └─────────────────┘
```

### Quick Reference Table

| Scenario | Tool | Why |
|----------|------|-----|
| Button hover effect | ✅ Tailwind | `hover:scale-105 transition-transform` |
| Loading spinner | ✅ Tailwind | `animate-spin` |
| Skeleton loader | ✅ Tailwind | `animate-pulse` |
| Notification badge | ✅ Tailwind | `animate-ping` |
| Focus ring | ✅ Tailwind | `transition-shadow focus:ring-2` |
| Colour transitions | ✅ Tailwind | `transition-colors` |
| Toast enter/exit | 🎬 Motion | AnimatePresence for unmount animations |
| Drag to reorder | 🎬 Motion | Built-in drag gesture |
| Modal with backdrop | 🎬 Motion | Coordinated enter/exit |
| Scroll reveal | 🎬 Motion | useInView + useScroll |
| Vote button bounce | 🎬 Motion | whileTap + spring physics |
| Shared layout | 🎬 Motion | layoutId for smooth transitions |
| Number counting | 🎬 Motion | useSpring or useMotionValue |
| SVG path animation | 🎬 Motion | pathLength + motion.path |

### The DevFlow Animation Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    DevFlow Animation Stack                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Layer 2: MOTION (motion.dev)                               │
│  ├── Complex interactions (drag, gestures)                  │
│  ├── Enter/exit animations (modals, toasts)                 │
│  ├── Scroll-linked effects (parallax, reveals)              │
│  └── Shared layout transitions                              │
│                                                             │
│  Layer 1: TAILWIND (base layer)                             │
│  ├── Hover/focus states                                     │
│  ├── Colour transitions                                     │
│  ├── Loading spinners                                       │
│  └── Simple scale/opacity effects                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Getting Started

### Step 1: Master Tailwind First

Before adding Motion, ensure you're using Tailwind's animation utilities effectively:

- `transition-*` for state changes
- `hover:` and `focus:` for interactions
- `animate-*` for continuous animations
- `motion-safe:` and `motion-reduce:` for accessibility

### Step 2: Add Motion for Complex Needs

Install Motion when you need:

- Exit animations (elements leaving the DOM)
- Gesture-based interactions (drag, swipe)
- Scroll-triggered animations
- Coordinated multi-element choreography
- Physics-based motion (springs, damping)

```bash
npm install motion
```

```ts
import { motion } from "motion/react"
```

### Step 3: Centralise Your Timing Tokens

Add motion tokens to `globals.css` early. This ensures consistency as you build out animations and makes future adjustments trivial.

---

## Appendix: v0 Compatibility

v0 currently uses the legacy `framer-motion` package. Both packages have identical APIs:

| Package | Installation | When to Use |
|---------|--------|-------------|
| `motion` | `npm install motion` | New projects (recommended) |
| `framer-motion` | `npm install framer-motion` | v0 projects, existing codebases |

If you copy animated components from v0, simply change the import from `framer-motion` to `motion/react` — no other changes needed.

The following was a response from v0 AI assistant, included for reference between `<v0_response>` tags:

<v0_response>

💡 **Decision Tree for Micro Interactions:**

```text
┌─────────────────────────────────────────┐
│  What kind of interaction do you need?  │
└──────────────┬──────────────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │  Simple hover/focus  │ ───YES──► Use Tailwind utilities only
    │  Color/scale changes │           (no package needed)
    │  Basic transitions   │
    └──────────┬───────────┘
               │ NO
               ▼
    ┌──────────────────────┐
    │  Layout animations?  │ ───YES──► Framer Motion
    │  (items moving,      │           (layout prop, AnimatePresence)
    │   reordering, etc.)  │
    └──────────┬───────────┘
               │ NO
               ▼
    ┌──────────────────────┐
    │  Gesture-based?      │ ───YES──► Framer Motion
    │  (drag, swipe, etc.) │           (drag, pan, tap handlers)
    └──────────┬───────────┘
               │ NO
               ▼
    ┌──────────────────────┐
    │  Scroll-triggered?   │ ───YES──► Framer Motion + useScroll
    │  Complex timelines?  │           OR GSAP (for very complex)
    └──────────┬───────────┘
               │ NO
               ▼
    ┌──────────────────────┐
    │  3D transforms or    │ ───YES──► GSAP or Three.js
    │  WebGL animations?   │           (specialized use case)
    └──────────────────────┘
```

**Start with Tailwind-only** → Add **Framer Motion** when you need:

- Entrance/exit animations for modals, dropdowns, toasts
- Layout animations (smooth reordering, expanding/collapsing)
- Gesture interactions (drag, swipe)
- Scroll-based animations

This covers 95% of modern web app needs. Only reach for GSAP or React Spring if you have very specific requirements like complex timeline orchestration or physics simulations.

</v0_response>
