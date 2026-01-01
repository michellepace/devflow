import { getTopQuestions } from "@/lib/data/questions";

describe("getTopQuestions", () => {
  it("returns 5 questions by default", async () => {
    const questions = await getTopQuestions();
    expect(questions).toHaveLength(5);
  });

  it("respects custom limit parameter", async () => {
    const questions = await getTopQuestions(3);
    expect(questions).toHaveLength(3);
  });

  it("returns questions with required properties", async () => {
    const questions = await getTopQuestions(1);
    expect(questions[0]).toHaveProperty("_id");
    expect(questions[0]).toHaveProperty("title");
  });
});
