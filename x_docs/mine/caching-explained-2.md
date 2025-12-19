# Next.js 16 Rendering & Caching: A Conceptual Guide

> Understanding *what* to ask for and *when*

---

## The Mental Model

In Next.js 16, think of every page as having three layers:

1. **The Shell** - Layout, navigation, headings. Built once, served instantly.
2. **Shared Content** - Data everyone sees the same (questions list, tags). This data can be cached.
3. **Personal Content** - Data specific to the viewer (their profile, saved items). Must be fresh.

The key insight: **you decide what goes in each layer**. Next.js 16 doesn't guess any more - you explicitly mark what should be cached.

---

## The Three Questions

When building any page or component, ask yourself:

### 1. "Is this the same for everyone?"

- **Yes** → Cache it. All users see the same content.
- **No** → It's personal/dynamic.

### 2. "How fresh does it need to be?"

- **This data can be minutes or hours old** → Cache with a time limit.
- **Must be real-time** → Don't cache, fetch every request.
- **Fresh until something changes** → Cache with tags, invalidate on events.

### 3. "Does it need cookies, headers, or the URL query?"

- **Yes** → It's dynamic. Wrap in Suspense.
- **No** → It can be cached or static.

---

## Decision Tree

```
START: What kind of content is this?
│
├─► Static text, images, layout
│   └─► Do nothing. Automatically in the static shell.
│
├─► Data from database/API
│   │
│   ├─► Same for all users?
│   │   │
│   │   ├─► YES: How often does it change?
│   │   │   ├─► Rarely (tags, categories) ──► Cache for hours/days
│   │   │   ├─► Sometimes (posts, jobs) ───► Cache for minutes
│   │   │   └─► Constantly (live feed) ────► Don't cache
│   │   │
│   │   └─► NO: User-specific data
│   │       └─► Make it dynamic with Suspense
│   │
│   └─► Needs cookies/auth to fetch?
│       └─► YES ──► Dynamic with Suspense
│
└─► Form or interactive UI
    └─► Static shell is fine. Client handles interaction.
```

---

## What Each Strategy Gives You

### Static (automatic)

**What it is**: Content built once at deploy time.

**Good for**: Layouts, navigation, marketing copy, error pages.

**Trade-off**: Fastest possible, but never changes until you redeploy.

**You get**: Instant load from CDN edge, globally.

---

### Cached (opt-in with time limit)

**What it is**: Data fetched once, then reused for a period.

**Good for**: Lists that update but don't need real-time freshness - questions, tags, job listings.

**Trade-off**: Fast, but users might see slightly stale data.

**You get**: Near-instant loads, reduced database/API calls.

**Freshness options**:

- "Revalidate every 5 minutes" - time-based
- "Revalidate when I tell you" - on-demand via tags

---

### Cached with Tags (surgical invalidation)

**What it is**: Cached data you can invalidate precisely when something changes.

**Good for**: Individual items (a specific question, a user profile) where you know when it changes.

**Trade-off**: Slightly more setup, but gives you cache speed with on-demand freshness.

**You get**: Fast reads, instant updates when needed.

---

### Dynamic (per-request)

**What it is**: Fresh data fetched on every single request.

**Good for**: Personalised content, auth-dependent data, real-time information.

**Trade-off**: Slower (server must work each time), but always fresh and personal.

**You get**: The right data for each user, every time.

---

### Partial Prerender (the hybrid)

**What it is**: Static shell loads instantly, dynamic parts stream in after.

**Good for**: Pages that are mostly cacheable but have one personal section.

**Trade-off**: Best of both worlds, but requires you to structure components properly.

**You get**: Fast initial paint, then personalised content appears.

---

## DevOverflow Routes Applied

| Route | Content Type | Strategy | Why |
|-------|--------------|----------|-----|
| `/` | Questions list | Cached (minutes) | Same for everyone, updates regularly |
| `/tags` | Tag list | Cached (hours) | Rarely changes |
| `/jobs` | Job listings | Cached (hours) | Updates periodically |
| `/community` | User list | Cached (hours) | Fairly stable |
| `/questions/[id]` | Single question | Cached with tag | Same for everyone, invalidate on new answer |
| `/profile` | User's own data | Dynamic | Needs auth, personal |
| `/collections` | User's saved items | Dynamic | Needs auth, personal |
| `/ask-question` | Empty form | Static shell | No server data needed |
| `/sign-in`, `/sign-up` | Auth forms | PPR (automatic) | Clerk handles this |

---

## What to Ask Claude Code For

Use these phrases when you want specific behaviours:

### For cached public content
>
> "Cache this component/page with hourly revalidation"
>
> "Cache the questions list and revalidate every 5 minutes"
>
> "Add cache tags so I can invalidate when a new question is posted"

### For dynamic personal content
>
> "Make this component dynamic - it needs to read cookies"
>
> "Wrap this in Suspense with a loading skeleton"
>
> "This needs to fetch fresh data on every request"

### For cache invalidation
>
> "When a user posts an answer, invalidate the question's cache immediately"
>
> "Add a server action that clears the questions cache"
>
> "Use updateTag for immediate feedback after form submission"

### For loading states
>
> "Add a loading.tsx for this route"
>
> "Show a skeleton while this streams in"
>
> "Add Suspense boundaries around the dynamic parts"

### For understanding your build
>
> "Why is this route showing as dynamic in the build output?"
>
> "What's making this page render on every request?"
>
> "How can I make this route static/cached?"

---

## Glossary

**Static Shell**
The HTML that's built at deploy time. Includes layouts, navigation, and any content that doesn't need data fetching.

**Streaming**
Sending parts of a page as they become ready, rather than waiting for everything. Users see content progressively.

**Suspense**
React's way of saying "show this fallback while waiting for that content". Essential for streaming dynamic content.

**PPR (Partial Prerendering)**
A page that's partly static (loads instantly) and partly dynamic (streams in). The static parts are the "shell".

**Cache Components**
Next.js 16's new opt-in system. Enable it to use `'use cache'` directive and related APIs.

**Revalidation**
Refreshing cached content. This can be time-based ("every hour") or on-demand ("when this tag is invalidated").

**Cache Tag**
A label you attach to cached data. Later, you can invalidate all data with that tag at once.

**Server Action**
A function that runs on the server, typically after a form submission. Where you'd call invalidation APIs.

---

## The Simple Summary

| I want... | Ask for... |
|-----------|------------|
| Fastest possible load, never changes | Static (default for layouts) |
| Fast load, same for everyone, OK if slightly stale | Cached with time limit |
| Fast load, but must update when data changes | Cached with tags + invalidation |
| Fresh data every time, or user-specific | Dynamic with Suspense |
| Mix of fast shell + personal content | PPR (cached shell + dynamic Suspense) |

---

## Enabling This in Your Project

One config change unlocks Cache Components:

```ts
// next.config.ts
cacheComponents: true
```

After that, you can ask Claude Code to implement any of the strategies above.
