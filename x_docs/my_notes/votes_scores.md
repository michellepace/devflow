# Votes vs Score in Stack Overflow

In the Stack Exchange API, there's a clear distinction:

| Field             | Description                                   |
| ----------------- | --------------------------------------------- |
| `up_vote_count`   | Total number of upvotes received              |
| `down_vote_count` | Total number of downvotes received            |
| `score`           | Net result: `up_vote_count - down_vote_count` |

## Example

If a question has 15 upvotes and 3 downvotes:

- `up_vote_count` = 15
- `down_vote_count` = 3
- `score` = 12

## Key Points

1. **Score is what users see publicly** — the single number displayed next to posts
2. **Individual vote counts require higher privilege** — on Stack Overflow, you need 1,000+ reputation to see the upvote/downvote breakdown (click on the score to reveal it)
3. **API access** — the `score` field is returned by default; `up_vote_count` and `down_vote_count` require a custom filter to be included in API responses

For DevFlow, store both the individual counts and compute the score, giving flexibility for analytics while displaying the net score to users.

## Sources

- [Stack Exchange API - Answer Type](https://paul-soporan.github.io/stackexchange-api/classes/answer.html)
- [Stack Exchange API Essentials](https://rollout.com/integration-guides/stack-exchange/api-essentials)
- [Reputation and Voting - Stack Overflow Help](https://internal.stackoverflow.help/en/articles/8775594-reputation-and-voting)

## Calculation is Per Post

The score is calculated independently for each post — questions and answers each have their own separate score.

```
Question (score: 25)
├── Answer 1 (score: 42) ← accepted answer
├── Answer 2 (score: 8)
├── Answer 3 (score: -2)
└── Answer 4 (score: 0)
```

- The **question** has its own `up_vote_count`, `down_vote_count`, and `score`
- Each **answer** has its own independent `up_vote_count`, `down_vote_count`, and `score`
- These are **never aggregated** — there's no "total score" combining the question with its answers

## Data Model for DevFlow

```typescript
// Each question has its own votes
interface Question {
  upvotes: number;
  downvotes: number;
  score: number; // stored, updated when votes change (for efficient sorting/querying)
}

// Each answer has its own votes (completely independent)
interface Answer {
  questionId: string;
  upvotes: number;
  downvotes: number;
  score: number; // stored, updated when votes change
}
```

Users vote on the specific content they find helpful or unhelpful — a great answer to a poor question still gets upvoted, and vice versa.
