import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { expect, test } from "@playwright/test";

const TEST_EMAIL = process.env.E2E_TEST_EMAIL || "";
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD || "";
const TEST_OTP = process.env.E2E_TEST_OTP || "424242";

test.describe("Auth Smoke Test", () => {
  // Skip on Mobile Safari - WebKit has timing issues with Clerk's OTP modal
  test.skip(({ browserName }) => browserName === "webkit", "WebKit flaky");

  test("user can sign in and sign out", async ({ page }) => {
    await setupClerkTestingToken({ page });

    // Navigate to homepage
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();

    // Sign in
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByRole("textbox", { name: "Email address" }).fill(TEST_EMAIL);
    await page.getByRole("textbox", { name: "Password" }).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: "Continue", exact: true }).click();

    // Handle email verification if required (new device verification)
    // Wait for either the OTP screen or the authenticated state
    const otpHeading = page.getByRole("heading", { name: "Check your email" });
    const userMenu = page.getByRole("button", { name: "Open user menu" });

    // Check which state we're in (longer timeout for slower browsers)
    await expect(otpHeading.or(userMenu)).toBeVisible({ timeout: 10000 });

    if (await otpHeading.isVisible()) {
      // Type OTP code using keyboard (Clerk auto-advances through fields)
      // Clerk auto-submits after all 6 digits are entered, no need to click Continue
      // First click the OTP input to ensure it has focus
      await page.getByRole("textbox").first().click();
      await page.keyboard.type(TEST_OTP);
    }

    // Verify authenticated state (longer timeout for redirect after OTP)
    await expect(
      page.getByRole("button", { name: "Open user menu" }),
    ).toBeVisible({ timeout: 15000 });

    // Sign out
    await page.getByRole("button", { name: "Open user menu" }).click();
    await page.getByRole("menuitem", { name: "Sign out" }).click();

    // Verify unauthenticated state
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });
});
