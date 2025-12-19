import { expect, test } from "@playwright/test";
import { NAV_LINKS } from "@/components/navigation/constants";

test.describe("Mobile navigation user flow", () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test("user can open mobile menu and navigate to each page", async ({
    page,
  }) => {
    await page.goto("/");

    for (const link of NAV_LINKS) {
      // Open mobile menu
      await page.getByRole("button", { name: /open navigation/i }).click();

      // Verify link is visible in menu
      const navLink = page.getByRole("link", { name: link.label });
      await expect(navLink).toBeVisible();

      // Click link and verify navigation
      await navLink.click();
      await expect(page).toHaveURL(link.route);

      // Menu should close after navigation
      await expect(navLink).not.toBeVisible();
    }
  });

  test("mobile menu closes when user clicks outside", async ({ page }) => {
    await page.goto("/");

    // Open menu
    await page.getByRole("button", { name: /open navigation/i }).click();
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();

    // Close by clicking the overlay (far right, outside the sheet)
    const viewport = page.viewportSize();
    if (!viewport) throw new Error("Viewport size not available");
    await page
      .locator('[data-slot="sheet-overlay"]')
      .click({ position: { x: viewport.width - 10, y: 300 } });
    await expect(page.getByRole("link", { name: "Home" })).not.toBeVisible();
  });
});
