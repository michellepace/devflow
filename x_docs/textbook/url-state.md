# State Management Notes

## Typtes of State Management

1. **State management defined**: It's how you track and organize data in your app (scores, user info, UI states) so your application knows what's happening and can react accordingly.

2. **Local state** is contained within a single component, managed with hooks like `useState`. Other components can't access it unless you explicitly pass it down as props.

3. **Global state** is stored in a centralized location (like a context or store) and can be accessed by any component in the app—solving the "prop drilling" problem where you'd otherwise have to pass data through many layers of components.

4. **Context API** is React's built-in solution for global state. The pattern is: create a context → wrap your app in a Provider → access the state anywhere using a custom hook (like `useCounter`). Good enough for simple cases — passing down a theme, user auth, or locale works great

5. **Other popular options** exist beyond Context API, each with tradeoffs:
   - **Redux** — structured approach with actions/reducers (more boilerplate, good for complex apps)
   - **Zustand** — lightweight, hook-based (simpler API)
   - **Recoil** — atom-based state (fine-grained updates)
   - **MobX** — reactive/observable pattern (minimal setup)

The core concept to internalize: *local state for component-specific data, global state for data that multiple components need to share*.

**Rule of thumb:**

- Use **Context API** for infrequently changing, app-wide data (auth, theme, language)
- Use **Zustand** (or Redux, etc.) when state changes often or you need fine-grained control over re-renders

## URL State Management

Here are the 5 key points reframed for instructing Claude Code effectively:

1. **The problem with traditional state libraries in Next.js**: Redux, Zustand, and Context API all require hooks, which force components to become client-side. This undermines Next.js's server-rendering benefits. When instructing Claude Code, you can say things like "keep this as a server component" or "avoid client-side state here."

2. **URL state management** is the server-friendly alternative. Instead of storing data in React state, you store it in the URL's query parameters (e.g., `?sort=price&page=2`). Key terms: "query parameters," "searchParams," "URL state." You can tell Claude Code: "use URL state management instead of useState" or "store the filter selection in searchParams."

3. **Reading URL data**: In page components, you access `params` (dynamic route segments like `/books/[id]`) and `searchParams` (query string values like `?page=2`) as props. In nested components, you'd use the `useSearchParams` hook. Useful phrase: "pass searchParams down as props to avoid making this a client component."

4. **Writing/updating URL state**: The main approaches are `<Link>` with a query object, `useRouter().push()`, or the native `URLSearchParams` API. For complex apps, the `query-string` npm package helps. You can instruct: "update the URL when the user selects a filter" or "use the query-string package to manage multiple URL parameters."

5. **Preserving existing parameters**: When updating one query param, don't wipe out the others. Useful instruction: "preserve existing URL parameters when adding the new filter" or "append to the current searchParams instead of replacing them."
