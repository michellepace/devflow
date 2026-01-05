import { expect, test } from "@playwright/test";

test.describe("Right Sidebar - Desktop", () => {
  test("displays questions and tags with working navigation and responsive scroll", async ({
    page,
  }) => {
    // Start at short viewport (1280x650) - triggers scrollbar
    await page.setViewportSize({ width: 1280, height: 650 });
    await page.goto("/");

    // Sidebar should be visible at xl breakpoint
    const sidebar = page.getByRole("complementary", {
      name: "Top questions and popular tags",
    });
    await expect(sidebar).toBeVisible();

    // Count exactly 5 question links and 5 tag links
    const questionLinks = sidebar.locator('a[href^="/questions/"]');
    const tagLinks = sidebar.locator('a[href^="/tags/"]');
    await expect(questionLinks).toHaveCount(5);
    await expect(tagLinks).toHaveCount(5);

    // Verify scrollbar IS present at short viewport
    const hasScrollAtShortHeight = await page.evaluate(() => {
      const container = document.querySelector(
        '#right-sidebar [data-sidebar="content"]',
      );
      return container
        ? container.scrollHeight > container.clientHeight
        : false;
    });
    expect(
      hasScrollAtShortHeight,
      "Sidebar should have vertical scroll at 650px height",
    ).toBe(true);

    // Click first question link and verify URL pattern
    await questionLinks.first().click();
    await expect(page).toHaveURL(/\/questions\/\d+/);

    // Navigate back to homepage
    await page.goto("/");

    // Click first tag link and verify URL pattern
    await tagLinks.first().click();
    await expect(page).toHaveURL(/\/tags\/[a-z-]+/);

    // Navigate back to homepage
    await page.goto("/");

    // Resize to tall viewport (1280x1000) - no scrollbar needed
    await page.setViewportSize({ width: 1280, height: 1000 });
    const hasScrollAtTallHeight = await page.evaluate(() => {
      const container = document.querySelector(
        '#right-sidebar [data-sidebar="content"]',
      );
      return container
        ? container.scrollHeight > container.clientHeight
        : false;
    });
    expect(
      hasScrollAtTallHeight,
      "Sidebar should not have vertical scroll at 1000px height",
    ).toBe(false);

    // Resize to below xl breakpoint (1279px) - sidebar should be hidden
    await page.setViewportSize({ width: 1279, height: 650 });
    await expect(sidebar).not.toBeVisible();
  });
});
