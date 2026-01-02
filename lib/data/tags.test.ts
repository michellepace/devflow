import { getPopularTags } from "@/lib/data/tags";

describe("getPopularTags", () => {
  it("returns 5 tags by default", async () => {
    const tags = await getPopularTags();
    expect(tags).toHaveLength(5);
  });

  it("respects custom limit parameter", async () => {
    const tags = await getPopularTags(3);
    expect(tags).toHaveLength(3);
  });

  it("returns tags with required properties", async () => {
    const tags = await getPopularTags(1);
    expect(tags[0]).toHaveProperty("name");
    expect(tags[0]).toHaveProperty("questions");
  });

  it("returns tags sorted by question count (descending)", async () => {
    const tags = await getPopularTags(5);
    for (let i = 0; i < tags.length - 1; i++) {
      expect(tags[i].questions).toBeGreaterThanOrEqual(tags[i + 1].questions);
    }
  });
});
