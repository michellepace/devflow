import { devices, expect, test } from "@playwright/test";
import { NAV_LINKS } from "@/components/navigation/nav-links.constants";

test.describe("Navigation - Desktop", () => {
  // WebKit defaults to mobile viewport in Playwright — sidebar hidden on small screens
  test.skip(
    ({ browserName }) => browserName === "webkit",
    "Mobile Safari uses mobile viewport",
  );

  test("user can navigate to each page via left sidebar", async ({ page }) => {
    await page.goto("/");

    for (const link of NAV_LINKS) {
      // Desktop sidebar links are always visible
      const navLink = page.getByRole("link", { name: link.label });
      await navLink.click();
      await expect(page).toHaveURL(link.route);
    }
  });
});

test.describe("Navigation - Mobile", () => {
  test.use({ viewport: devices["iPhone 12"].viewport });

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

      // Menu should close after navigation (SheetClose wraps links)
      await expect(navLink).not.toBeVisible();
    }
  });

  test("mobile menu closes when user clicks close button", async ({ page }) => {
    await page.goto("/");

    // Open menu
    await page.getByRole("button", { name: /open navigation/i }).click();
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();

    // Close via Sheet's built-in X button (sr-only "Close", top-right inside sheet)
    await page.getByRole("button", { name: "Close", exact: true }).click();
    await expect(page.getByRole("link", { name: "Home" })).not.toBeVisible();
  });

  test("mobile menu closes when user taps overlay", async ({ page }) => {
    await page.goto("/");

    // Open menu
    await page.getByRole("button", { name: /open navigation/i }).click();
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();

    // Close by clicking the overlay (aria-label="Dismiss menu")
    // Use force:true as the sheet content can intercept pointer events on some browsers
    await page
      .getByRole("button", { name: "Dismiss menu" })
      .click({ force: true });
    await expect(page.getByRole("link", { name: "Home" })).not.toBeVisible();
  });
});
