import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { devices, expect, test } from "@playwright/test";

const TEST_EMAIL = process.env.E2E_TEST_EMAIL || "";
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD || "";
const TEST_OTP = process.env.E2E_TEST_OTP || "424242";

test.describe("Authenticated User Flow - Mobile", () => {
  test.use({ viewport: devices["iPhone 12"].viewport });

  // Skip on WebKit - timing issues with Clerk's OTP modal
  test.skip(({ browserName }) => browserName === "webkit", "WebKit flaky");

  test("user can sign in, manage account, and sign out via mobile menu", async ({
    page,
  }) => {
    await setupClerkTestingToken({ page });
    await page.goto("/");

    // === SIGN IN VIA MOBILE MENU ===
    // Open hamburger menu
    await page.getByRole("button", { name: /open navigation/i }).click();

    // Click Sign in button in mobile menu
    await page.getByRole("button", { name: "Sign in" }).click();

    // Complete sign in flow
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
    const hamburgerButton = page.getByRole("button", {
      name: /open navigation/i,
    });
    await expect(
      emailOtpHeading.or(twoFactorHeading).or(hamburgerButton),
    ).toBeVisible({ timeout: 10000 });

    // Handle email OTP or 2FA - both use the same OTP input pattern
    if (
      (await emailOtpHeading.isVisible()) ||
      (await twoFactorHeading.isVisible())
    ) {
      await page.getByRole("textbox").first().click();
      await page.keyboard.type(TEST_OTP);
    }

    // Wait for redirect to home after auth
    await expect(page).toHaveURL("/", { timeout: 15000 });

    // === MANAGE ACCOUNT VIA MOBILE MENU ===
    // Open hamburger menu
    await page.getByRole("button", { name: /open navigation/i }).click();

    // UserButton should be visible at bottom of mobile menu
    const userMenu = page.getByRole("button", { name: "Open user menu" });
    await expect(userMenu).toBeVisible();

    // Click UserButton and select "Manage account"
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
    ).toBeVisible({ timeout: 5000 });

    // Close modal with Clerk's close button
    await page.getByRole("button", { name: "Close modal" }).click();
    await expect(profileHeading).not.toBeVisible();

    // === SIGN OUT VIA MOBILE MENU ===
    // Reopen hamburger menu
    await page.getByRole("button", { name: /open navigation/i }).click();

    // Click UserButton and sign out
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
