# Next.js 16 Rendering & Caching Explained

> For DevOverflow: A Q&A platform for developers

## The Big Picture

Next.js 16 introduces **Cache Components**, a new model that changes how rendering works:

- **Old model**: Caching was implicit and confusing
- **New model**: All code is dynamic by default; caching is opt-in and explicit

This means you choose what to cache, rather than figuring out what Next.js cached automatically.

---

## Build Output Symbols

When you run `npm run build`, you'll see these symbols:

| Symbol | Name | What It Means |
|--------|------|---------------|
| ○ | Static | Built once at build time, served instantly from CDN |
| ◐ | Partial Prerender | Static shell loads instantly, dynamic parts stream in |
| ƒ | Dynamic | Rendered fresh on every request |

**Your current build:**

```
○  /_not-found        <- Good: static error page
◐  /sign-in, /sign-up <- Good: Clerk uses PPR automatically
ƒ  Everything else    <- Could be optimised with caching
```

---

## The Three Types of Content

### 1. Static Content (Automatic)

Content that doesn't fetch data or use request APIs is automatically included in the static shell:

```tsx
// This is automatically static - no special handling needed
export default function Layout({ children }) {
  return (
    <div>
      <h1>DevOverflow</h1>  {/* Static */}
      <nav>...</nav>         {/* Static */}
      {children}
    </div>
  )
}
```

### 2. Cached Content (`'use cache'`)

Data that can be shared across users and doesn't change frequently:

```tsx
import { cacheLife } from 'next/cache'

async function QuestionsList() {
  'use cache'
  cacheLife('minutes')  // Revalidate every 5 minutes

  const questions = await db.query('SELECT * FROM questions')
  return <ul>...</ul>
}
```

### 3. Dynamic Content (`<Suspense>`)

Content that needs request data (cookies, headers) or must be fresh per-request:

```tsx
import { Suspense } from 'react'
import { cookies } from 'next/headers'

export default function Page() {
  return (
    <>
      <QuestionsList />  {/* Cached - in static shell */}

      <Suspense fallback={<p>Loading...</p>}>
        <UserPreferences />  {/* Dynamic - streams at request time */}
      </Suspense>
    </>
  )
}

async function UserPreferences() {
  const session = (await cookies()).get('session')
  // ... user-specific content
}
```

---

## Enabling Cache Components

Add to your `next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
}

export default nextConfig
```

This enables:

- Partial Prerendering (PPR)
- The `'use cache'` directive
- `cacheLife()` and `cacheTag()` functions

---

## Cache Profiles

Built-in `cacheLife` profiles:

| Profile | Use Case | Rough Duration |
|---------|----------|----------------|
| `'seconds'` | Real-time data | ~1 second |
| `'minutes'` | Frequently updated | ~5 minutes |
| `'hours'` | Semi-static content | ~1 hour |
| `'days'` | Rarely changing | ~1 day |
| `'weeks'` | Very stable content | ~1 week |
| `'max'` | Effectively permanent | Very long |

Or use custom values:

```tsx
cacheLife({
  stale: 300,      // Serve stale for 5 mins
  revalidate: 600, // Revalidate after 10 mins
  expire: 3600,    // Expire after 1 hour
})
```

---

## DevOverflow Route Recommendations

| Route | Strategy | Why |
|-------|----------|-----|
| `/` | `'use cache'` + `cacheLife('minutes')` | Questions list updates but not per-user |
| `/tags` | `'use cache'` + `cacheLife('hours')` | Tags rarely change |
| `/jobs` | `'use cache'` + `cacheLife('hours')` | Job listings update periodically |
| `/community` | `'use cache'` + `cacheLife('hours')` | Community list is fairly stable |
| `/questions/[id]` | `'use cache'` + `cacheTag()` | Cache individual questions, invalidate on answer |
| `/profile` | Dynamic with `<Suspense>` | User-specific, needs auth |
| `/collections` | Dynamic with `<Suspense>` | User's saved items |
| `/ask-question` | Static shell | Just a form, no server data needed |

---

## Practical Examples for DevOverflow

### Home Page with Mixed Content

```tsx
// app/(root)/page.tsx
import { Suspense } from 'react'
import { cacheLife, cacheTag } from 'next/cache'
import { cookies } from 'next/headers'

export default function HomePage() {
  return (
    <>
      {/* Static - automatic */}
      <h1>All Questions</h1>

      {/* Cached - shared by all users */}
      <RecentQuestions />
      <PopularTags />

      {/* Dynamic - user-specific */}
      <Suspense fallback={<div>Loading recommendations...</div>}>
        <PersonalisedContent />
      </Suspense>
    </>
  )
}

async function RecentQuestions() {
  'use cache'
  cacheLife('minutes')
  cacheTag('questions')

  const questions = await db.query(`
    SELECT * FROM questions
    ORDER BY created_at DESC
    LIMIT 20
  `)
  return <QuestionList questions={questions} />
}

async function PopularTags() {
  'use cache'
  cacheLife('hours')
  cacheTag('tags')

  const tags = await db.query('SELECT * FROM tags ORDER BY count DESC LIMIT 10')
  return <TagList tags={tags} />
}

async function PersonalisedContent() {
  const session = (await cookies()).get('session')?.value
  if (!session) return null

  // Fetch user-specific recommendations
  const recommendations = await getUserRecommendations(session)
  return <RecommendedQuestions items={recommendations} />
}
```

### Question Detail Page with On-Demand Revalidation

```tsx
// app/(root)/questions/[id]/page.tsx
import { cacheLife, cacheTag } from 'next/cache'

export default async function QuestionPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <>
      <QuestionContent id={id} />
      <Answers id={id} />
    </>
  )
}

async function QuestionContent({ id }: { id: string }) {
  'use cache'
  cacheLife('hours')
  cacheTag(`question-${id}`)

  const question = await db.query('SELECT * FROM questions WHERE id = ?', [id])
  return <QuestionCard question={question} />
}

async function Answers({ id }: { id: string }) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`answers-${id}`)

  const answers = await db.query('SELECT * FROM answers WHERE question_id = ?', [id])
  return <AnswerList answers={answers} />
}
```

### Server Action to Post Answer and Invalidate Cache

```tsx
// app/lib/actions.ts
'use server'

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function postAnswer(questionId: string, formData: FormData) {
  const content = formData.get('content')

  // Save to database
  await db.query('INSERT INTO answers (question_id, content) VALUES (?, ?)', [
    questionId,
    content,
  ])

  // Immediately invalidate cache - user sees their answer right away
  updateTag(`answers-${questionId}`)

  redirect(`/questions/${questionId}`)
}
```

---

## Revalidation Cheat Sheet

| API | When to Use | Where |
|-----|-------------|-------|
| `cacheLife('hours')` | Set how long to cache | Inside `'use cache'` |
| `cacheTag('posts')` | Tag data for targeted invalidation | Inside `'use cache'` |
| `updateTag('posts')` | User action - show changes immediately | Server Actions only |
| `revalidateTag('posts', 'max')` | Background event - eventual consistency | Server Actions or Route Handlers |
| `revalidatePath('/posts')` | Invalidate entire route | Server Actions or Route Handlers |

**Rule of thumb:**

- User submits form -> `updateTag()` (immediate feedback)
- Webhook/external event -> `revalidateTag()` (background update)

---

## What Triggers Dynamic Rendering?

These APIs make a route (or component) dynamic:

- `cookies()` - Reading user cookies
- `headers()` - Reading request headers
- `searchParams` - URL query parameters
- `connection()` - Explicitly defer to request time

If you use these outside a `<Suspense>` boundary with Cache Components enabled, you'll get an error:

```
Error: Uncached data was accessed outside of <Suspense>
```

**Fix:** Wrap the dynamic part in `<Suspense>`:

```tsx
<Suspense fallback={<Loading />}>
  <ComponentThatUsesCookies />
</Suspense>
```

---

## Migration from Old Patterns

### ISR (Incremental Static Regeneration)

```tsx
// OLD (deprecated)
export const revalidate = 3600

export default async function Page() {
  const data = await fetch('...')
  return <div>{data}</div>
}

// NEW
import { cacheLife } from 'next/cache'

export default async function Page() {
  'use cache'
  cacheLife('hours')

  const data = await fetch('...')
  return <div>{data}</div>
}
```

### Force Dynamic

```tsx
// OLD (no longer needed)
export const dynamic = 'force-dynamic'

// NEW - just don't add 'use cache'
// Routes are dynamic by default
```

### Force Static

```tsx
// OLD
export const dynamic = 'force-static'

// NEW
import { cacheLife } from 'next/cache'

export default async function Page() {
  'use cache'
  cacheLife('max')
  // ...
}
```

---

## Summary

1. **Enable Cache Components** in `next.config.ts`
2. **Static content** is automatic - no work needed
3. **Use** `'use cache'` + `cacheLife()` for cached content
4. **Dynamic content** wraps in `<Suspense>`
5. **Invalidate** with `updateTag()` (immediate) or `revalidateTag()` (background)

For DevOverflow specifically:

- Cache public listings (questions, tags, jobs, community)
- Keep auth-dependent pages dynamic (profile, collections)
- Use `cacheTag()` for granular invalidation when users post/edit
