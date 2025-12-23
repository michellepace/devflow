import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { expect, test } from "@playwright/test";
import { VIEWPORTS } from "@/e2e/viewports";

const TEST_EMAIL = process.env.E2E_TEST_EMAIL;
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD;
const TEST_OTP = process.env.E2E_TEST_OTP;

if (!TEST_EMAIL || !TEST_PASSWORD || !TEST_OTP) {
  throw new Error(
    "E2E_TEST_EMAIL, E2E_TEST_PASSWORD, and E2E_TEST_OTP environment variables must be set",
  );
}

test.describe("Authenticated User Flow - Desktop", () => {
  test.use({ viewport: VIEWPORTS.XL }); // Sidebar expanded

  test("user can sign in, manage account, and sign out", async ({ page }) => {
    await setupClerkTestingToken({ page });
    await page.goto("/");

    // Verify unauthenticated state - Sign in button visible
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();

    // === SIGN IN ===
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByRole("textbox", { name: "Email address" }).fill(TEST_EMAIL);
    await page.getByRole("textbox", { name: "Password" }).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: "Continue", exact: true }).click();

    // Handle OTP/2FA if required
    // - "Check your email" = new device verification (email OTP)
    // - "Two-step verification" or URL contains "factor-two" = 2FA/TOTP
    const emailOtpHeading = page.getByRole("heading", {
      name: "Check your email",
    });
    const twoFactorHeading = page.getByRole("heading", {
      name: /verification|two-step/i,
    });
    const userMenu = page.getByRole("button", { name: "Open user menu" });
    await expect(
      emailOtpHeading.or(twoFactorHeading).or(userMenu),
    ).toBeVisible();

    // Handle email OTP or 2FA - both use the same OTP input pattern
    if (
      (await emailOtpHeading.isVisible()) ||
      (await twoFactorHeading.isVisible())
    ) {
      await page.getByRole("textbox").first().click();
      await page.keyboard.type(TEST_OTP);
    }

    // Verify authenticated state - UserButton visible in left sidebar
    await expect(userMenu).toBeVisible();

    // === MANAGE ACCOUNT ===
    await userMenu.click();
    await page.getByRole("menuitem", { name: "Manage account" }).click();

    // Verify modal opens (Clerk renders user profile modal with "Account" heading)
    const accountHeading = page.getByRole("heading", { name: "Account" });
    await expect(accountHeading).toBeVisible();

    // Close modal with Escape key
    await page.keyboard.press("Escape");
    await expect(accountHeading).not.toBeVisible();

    // === SIGN OUT ===
    await userMenu.click();
    await page.getByRole("menuitem", { name: "Sign out" }).click();

    // Verify unauthenticated state
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });
});
