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

test.describe("Authenticated User Flow - Mobile", () => {
  test.use({ viewport: VIEWPORTS.MOBILE }); // Hamburger menu visible

  test("user can sign in, manage account, and sign out via mobile menu", async ({
    page,
  }) => {
    await setupClerkTestingToken({ page });
    await page.goto("/");

    // === SIGN IN VIA MOBILE MENU ===
    // Open hamburger menu
    await page.getByRole("button", { name: /open navigation/i }).click();

    // Sign in button is inside the mobile menu drawer
    await page.getByRole("button", { name: "Sign in" }).click();

    // Fill Clerk's sign-in form (redirected to Clerk's sign-in page)
    await page.getByRole("textbox", { name: "Email address" }).fill(TEST_EMAIL);
    await page.getByRole("textbox", { name: "Password" }).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: "Continue", exact: true }).click();

    // UserButton only appears when authenticated (not visible on sign-in pages)
    const userMenu = page.getByRole("button", { name: "Open user menu" });

    // Handle OTP/2FA if required
    // - "Check your email" = new device verification (email OTP)
    // - "Two-step verification" or URL contains "factor-two" = 2FA/TOTP
    const emailOtpHeading = page.getByRole("heading", {
      name: "Check your email",
    });
    const twoFactorHeading = page.getByRole("heading", {
      name: /verification|two-step/i,
    });
    await expect(
      emailOtpHeading.or(twoFactorHeading).or(userMenu),
    ).toBeVisible();

    // Check URL for "factor-two" as backup (Clerk heading text may vary)
    const needsOtp =
      (await emailOtpHeading.isVisible()) ||
      (await twoFactorHeading.isVisible()) ||
      page.url().includes("factor-two");
    if (needsOtp) {
      await page.getByRole("textbox").first().click();
      await page.keyboard.type(TEST_OTP);
    }

    // === MANAGE ACCOUNT VIA MOBILE MENU ===
    // Open hamburger menu and verify authenticated (userMenu only shows when signed in)
    await page.getByRole("button", { name: /open navigation/i }).click();
    await expect(userMenu).toBeVisible();

    // UserButton opens Clerk's user menu dropdown
    await userMenu.click();
    await page.getByRole("menuitem", { name: "Manage account" }).click();

    // Verify modal opens (Clerk on mobile shows "Profile details" as the main heading)
    // If this fails with "pointer events intercepted", check Sheet modal={false} in mobile-nav.tsx
    const profileHeading = page.getByRole("heading", {
      name: "Profile details",
    });
    await expect(
      profileHeading,
      "Clerk 'Manage account' modal should open - if blocked, ensure Sheet uses modal={false} to allow Clerk popups",
    ).toBeVisible();

    // Close modal with Clerk's close button
    await page.getByRole("button", { name: "Close modal" }).click();
    await expect(profileHeading).not.toBeVisible();

    // === SIGN OUT VIA MOBILE MENU ===
    // Menu closed after modal interaction, reopen it
    await page.getByRole("button", { name: /open navigation/i }).click();

    // UserButton is visible again in the reopened menu
    await userMenu.click();
    await page.getByRole("menuitem", { name: "Sign out" }).click();

    // Verify signed out - open menu and check for Sign in button
    await page.getByRole("button", { name: /open navigation/i }).click();
    await expect(
      page.getByRole("button", { name: "Sign in" }),
      "User should be signed out - Sign in button should be visible in mobile menu",
    ).toBeVisible();
  });
});
