export type Question = {
  _id: string;
  title: string;
};

const MOCK_QUESTIONS: Question[] = [
  {
    _id: "1",
    title:
      "How to Ensure Unique User Profile with ON CONFLICT in PostgreSQL Using Drizzle ORM?",
  },
  {
    _id: "2",
    title:
      "What are the benefits and trade-offs of using Server-Side Rendering (SSR) in Next.js?",
  },
  { _id: "3", title: "How to centre a div?" },
  {
    _id: "4",
    title:
      "Node.js res.json() and res.send(), not working but still able to change status code",
  },
  { _id: "5", title: "ReactJs or NextJs for beginners i ask for advice" },
];

/**
 * Fetch top questions sorted by votes/engagement.
 * TODO: Replace with MongoDB query when database is set up.
 */
export async function getTopQuestions(limit = 5): Promise<Question[]> {
  // Future: return await db.collection('questions').find().sort({ votes: -1 }).limit(limit)
  return MOCK_QUESTIONS.slice(0, limit);
}
