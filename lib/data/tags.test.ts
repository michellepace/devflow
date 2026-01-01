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
});
