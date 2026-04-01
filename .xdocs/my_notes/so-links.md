<message_michelle>

TASK: Investigate current state of the search component (`components/search`) being ready for "data" and advise if I should "wire it up" with my mock data. I have not yet integrated with the database, which will be Convex.

Reference: high level details on convex choice `.xdocs/my_notes/what-db.md`

I have just implement the UI for "search" on both desktop and and mobile. these changes are currently staged.

I have limited mock data, it resides in `app/lib/data/`.

Questions

- Q1. Is my search ui components at all ready for data, what is in place already (if anything at all)?
- Q2. Do you recommend we commit first, and then wire this up for mock data and will this prepare me for convex a little later?
- Q3. If and only if the recommendation to Q2 is "yes", I am unaware of the scope of changes and the testing required. Should we use unit tests (test driven development), should we start with implementing the most obvious / simple? Here are the examples from stackoverflow:

<stackoverflow_search_url_examples>

**Stack overflow Searches and links**

These are examples of searches I've done and resulting links. The examples follow this pattern: [what I searched] | [URL Found]

Examples - by words:

- one_word | <https://stackoverflow.com/search?q=one_word>
- some words | <https://stackoverflow.com/search?q=some+words>
- "exact words" | <https://stackoverflow.com/search?q=%22exact+words%22>

Examples - remaining (non-compound):

- answers:5 | <https://stackoverflow.com/search?q=answers%3A5>
- score:3 | <https://stackoverflow.com/search?q=score%3A3> (Mockdata does not contain score yet, see `.xdocs/my_notes/votes_score.md`)
- is:question | <https://stackoverflow.com/search?q=is%3Aquestion> (Mockdata does not yet contain answer posts, only questions)
- isaccepted:yes | <https://stackoverflow.com/search?q=is%3Aaccepted> (mockdata does not have answers yet, no accepted status)

Examples - tags

- [nextjs] | <https://stackoverflow.com/questions/tagged/nextjs>
- [next.js] [tailwind-css] | <https://stackoverflow.com/questions/tagged/next.js%20tailwind-css>
- [nextjs] [tailwind] | <https://stackoverflow.com/questions/tagged/next.js%20tailwind-css> (note the change in tagnames in URL - advanced)

Examples - compound:

- is:question horse | <https://stackoverflow.com/search?q=is%3Aquestion+horse>
- is:question "delete a git branch" | <https://stackoverflow.com/search?q=is%3Aquestion+%22delete+a+git+branch%22>
- score:5 is:question git | <https://stackoverflow.com/search?q=score%3A5+is%3Aquestion+git>
- score:5 is:question git "difference between" | <https://stackoverflow.com/search?q=score%3A5+is%3Aquestion+git+%22difference+between%22>
- is:question [tailwind-css] theming with shadcn | <https://stackoverflow.com/search?q=is%3Aquestion+%5Btailwind-css%5D+theming+with+shadcn>

**Routing Differences:**

| Route | StackOverflow | DevFlow |
|-------|--------------|---------|
| `/` | Redirects to `/questions` | Questions list (homepage) |
| `/questions` | Questions list | N/A (404) |
| `/questions/{id}` | Question detail | Question detail |
| `/search?q=...` | Search results | Search results |
| `/questions/tagged/x` | Tag-filtered questions | N/A — use `/search?q=[x]` |

All DevFlow searches route to `/search?q=...`, including tag-only queries like `[nextjs]`.

</stackoverflow_search_url_examples>

</message_michelle>

CLAUDE'S REPLY:

<claude_replies>

<reply1>

● Now I have a complete picture. Here's my analysis:

---
Q1: Is the search UI ready for data?

Partially. Here's what's in place vs missing:

```markdown
| Component | Status | Notes |
| --------- | ------ | ----- |
| use-search hook | ✅ | Manages state, navigates to /search?q=... |
| DesktopSearch / MobileSearch | ✅ | Full UI complete |
| SearchInput | ✅ | Controlled input with icon |
| SearchHints | ✅ | Shows syntax hints |
| /search page | ⚠️ Stub only | Reads q param but has placeholder for results |
| Query parser | ❌ | No logic to parse [tag], user:, score:, etc. |
| Search function | ❌ | No searchQuestions() in lib/data/ |
```

Data flow gap: The UI submits to /search?q=horse but the page just displays "horse" — no actual searching happens.

Mock data available:

- 7 questions with title, body, tags[], author, votes, answerCount, viewCount
- 10 tags with name, questions count

---
Q2: Commit first, then wire up?

Yes. I recommend committing the current staged changes first:

1. Clean atomic commits — UI layer is self-contained and complete
2. Easier review/revert — the staged diff is already substantial
3. Logical separation — "search UI" vs "search data layer" are distinct concerns
4. Convex prep — wiring to mock data establishes the interface that Convex will later implement

---
Q3: Scope and approach for mock data integration

Given your Stack Overflow examples, here's a sensible progression:

Recommended order (simplest first):

1. Plain text search — horse matches title or body
2. Exact phrase — "delete a git branch"
3. Tag filter — [nextjs] or [nextjs] [tailwind]
4. Compound — [tailwind] theming with shadcn
5. Filters — is:question, answers:0, score:3
6. User filter — user:u1 (by author _id)

TDD: Yes, strongly recommended

Query parsing is ideal for TDD because:

- Well-defined inputs/outputs — your SO examples are ready-made test cases
- Edge cases — quoted phrases, multiple tags, combined filters
- Confidence for Convex migration — tests verify the parser, only the data layer changes later

Scope estimate

| Task | Complexity |
|------|------------|
| Query parser (extract tokens, tags, filters) | Medium |
| searchQuestions() function in lib/data/ | Low |
| Update /search page to call & render results | Low |
| Tests for parser | Medium |

Realistic scope: A focused session. The parser is the core work; rendering is straightforward since you likely already have question card components.

---
Summary: Commit now, then implement with TDD starting from plain text search and building up to compound queries. Your mock data supports all the basic examples — score maps to votes (close enough for mock).

</reply1>

</claude_replies>

 Suggested sequence

Here's the spec with the item 4 details formatted as an indented table:

---

1. Write query parser with TDD (plain text → tags → filters)
2. Create searchQuestions using mock data
3. Wire /search page to display results
4. Then return to finishing the homepage requirements (`<homepage_requirements>`):

<homepage_requirements>

1. Add "Ask Question" button to the right of the Page Title (routes to `http://localhost:3000/questions/ask`) - all devices

2. Implement homepage filters with dynamic page titles

   | Filter | Local URL | Reference URL | Page Title |
   |--------|-----------|---------------|------------|
   | Default | <http://localhost:3000/> | <https://stackoverflow.com/questions> | Newest Questions |
   | Newest | <http://localhost:3000/?filter=Newest> | <https://stackoverflow.com/questions?tab=Newest> | Newest Questions |
   | Active | <http://localhost:3000/?filter=Active> | <https://stackoverflow.com/questions?tab=Active> | Recently Active Questions |
   | Frequent | <http://localhost:3000/?filter=Frequent> | <https://stackoverflow.com/questions?tab=Frequent> | Frequent Questions |
   | Unanswered | <http://localhost:3000/?filter=Unanswered> | <https://stackoverflow.com/questions?tab=Unanswered> | Unanswered Questions |

  **Note:** Consider shadcn/ui component button group? Filters? - query Shadcn MCP with natural language

3. Implement number of questions displayed for filter e.g. "24,181,787 questions"
    - Above "filters" on mobile (tailwind mobile-first approach)
    - To the left of "filters" on >= `md`

4. Implement pagination on <http://localhost:3000/> (like <https://stackoverflow.com/questions>)

5. Refactor question card to look more like stackoverflow

</homepage_requirements>
