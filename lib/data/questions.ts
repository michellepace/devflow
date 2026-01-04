export type Question = {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  votes: number;
  answerCount: number;
  viewCount: number;
  createdAt: Date;
};

const MOCK_QUESTIONS: Question[] = [
  {
    _id: "1",
    title: "How to centre a div?",
    body: "I've been trying to centre a div both horizontally and vertically for hours. I've tried margin: auto, text-align: center, and various other approaches but nothing seems to work consistently. What's the most reliable modern approach?",
    tags: ["css", "html"],
    author: { _id: "u1", name: "Sarah Chen" },
    votes: 142,
    answerCount: 12,
    viewCount: 15420,
    createdAt: new Date("2025-11-15"),
  },
  {
    _id: "2",
    title:
      "How to Ensure Unique User Profile with ON CONFLICT in PostgreSQL Using Drizzle ORM?",
    body: "I'm building a user profile system where users can only have one profile. When they try to create a second profile, I want to update the existing one instead. How do I implement this upsert pattern with Drizzle ORM?",
    tags: ["postgres", "nextjs"],
    author: { _id: "u2", name: "Marcus Johnson" },
    votes: 89,
    answerCount: 5,
    viewCount: 3241,
    createdAt: new Date("2025-12-20"),
  },
  {
    _id: "3",
    title:
      "What are the benefits and trade-offs of using Server-Side Rendering (SSR) in Next.js?",
    body: "I'm starting a new Next.js project and trying to decide between SSR, SSG, and client-side rendering. What are the real-world trade-offs I should consider? When does SSR actually make sense?",
    tags: ["nextjs", "reactjs"],
    author: { _id: "u3", name: "Emily Rodriguez" },
    votes: 67,
    answerCount: 8,
    viewCount: 4892,
    createdAt: new Date("2025-12-18"),
  },
  {
    _id: "4",
    title:
      "Node.js res.json() and res.send(), not working but still able to change status code",
    body: "I'm building an Express API and running into a strange issue. My res.json() and res.send() calls don't seem to send any response body, but the status code changes work fine. What could be causing this?",
    tags: ["javascript", "nodejs"],
    author: { _id: "u4", name: "Alex Kim" },
    votes: 45,
    answerCount: 3,
    viewCount: 1876,
    createdAt: new Date("2025-12-22"),
  },
  {
    _id: "5",
    title: "ReactJs or NextJs for beginners i ask for advice",
    body: "I'm new to web development and want to learn React. Should I start with plain React or jump straight into Next.js? I've heard Next.js is more opinionated but provides better structure. What do experienced developers recommend?",
    tags: ["reactjs", "nextjs"],
    author: { _id: "u5", name: "Jordan Taylor" },
    votes: 38,
    answerCount: 15,
    viewCount: 6234,
    createdAt: new Date("2025-12-25"),
  },
  {
    _id: "6",
    title: "How to set up Tailwind CSS v4 with Next.js?",
    body: "I'm trying to set up Tailwind CSS v4 in my Next.js project but the configuration seems different from v3. The @tailwind directives aren't working. What's the correct way to configure Tailwind v4 with the new @import syntax?",
    tags: ["tailwind", "nextjs", "css"],
    author: { _id: "u6", name: "Priya Patel" },
    votes: 23,
    answerCount: 4,
    viewCount: 1245,
    createdAt: new Date("2025-12-28"),
  },
  {
    _id: "7",
    title: "TypeScript generics explained with examples",
    body: "I understand basic TypeScript but generics confuse me. Can someone explain with practical examples when and why I'd use generics? I've seen code like <T extends Something> and have no idea what it means.",
    tags: ["typescript", "javascript"],
    author: { _id: "u7", name: "David Lee" },
    votes: 19,
    answerCount: 6,
    viewCount: 2103,
    createdAt: new Date("2025-12-30"),
  },
];

/**
 * Fetch all questions for the homepage.
 * TODO: Replace with database query when set up.
 */
export async function getAllQuestions(): Promise<Question[]> {
  return MOCK_QUESTIONS;
}

/**
 * Fetch top questions sorted by votes.
 * TODO: Replace with database query when set up.
 */
export async function getTopQuestions(limit = 5): Promise<Question[]> {
  return [...MOCK_QUESTIONS].sort((a, b) => b.votes - a.votes).slice(0, limit);
}
