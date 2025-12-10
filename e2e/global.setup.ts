import { clerkSetup } from "@clerk/testing/playwright";
import { test as setup } from "@playwright/test";

// Setup must be run serially (required when Playwright is configured for fullyParallel)
// https://playwright.dev/docs/test-parallel
setup.describe.configure({ mode: "serial" });

setup("global setup", async () => {
  await clerkSetup();
});
