export type Tag = {
  name: string;
  questions: number;
};

const MOCK_TAGS: Tag[] = [
  { name: "nextjs", questions: 320 },
  { name: "reactjs", questions: 244 },
  { name: "javascript", questions: 83 },
  { name: "react", questions: 30 },
  { name: "postgres", questions: 89 },
];

/**
 * Fetch popular tags sorted by question count.
 * TODO: Replace with MongoDB query when database is set up.
 */
export async function getPopularTags(limit = 5): Promise<Tag[]> {
  // Future: return await db.collection('tags').find().sort({ questions: -1 }).limit(limit)
  return MOCK_TAGS.slice(0, limit);
}
