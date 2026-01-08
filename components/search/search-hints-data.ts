export const SEARCH_HINTS = [
  { syntax: "[tag]", description: "search within a tag" },
  { syntax: '"words here"', description: "exact phrase" },
  { syntax: "answers:0", description: "unanswered questions" },
  { syntax: "score:3", description: "posts with a 3+ score" },
  { syntax: "is:question", description: "type of post" },
  { syntax: "isaccepted:yes", description: "search within status" },
] as const;

export type SearchHint = (typeof SEARCH_HINTS)[number];
