import path from "node:path";
import { defineConfig, devices } from "@playwright/test";
/**
 * Read environment variables from file (local development only).
 * In CI/Vercel, env vars are set directly — dotenv is a no-op when files don't exist.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, ".env.local") });

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// If BASE_URL env var is set (e.g., Vercel preview URL), use it;
// otherwise fall back to localhost for local/CI testing
const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */

// Custom: Re-organise Playwright outputs
const TEST_RESULTS = ".playwright/test-results";
const HTML_REPORT = ".playwright/playwright-report";

export default defineConfig({
  testDir: "./e2e",
  outputDir: TEST_RESULTS,
  fullyParallel: true, // Run tests in files in parallel
  forbidOnly: !!process.env.CI, // Fail CI build of "test.only" found in code
  retries: process.env.CI ? 2 : 0, // Retry on CI only
  workers: process.env.CI ? 1 : undefined, // Playwright recommends 1

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [["html", { outputFolder: HTML_REPORT, open: "never" }], ["github"]]
    : [["html", { outputFolder: HTML_REPORT }]], // Default: serves report only on failure

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL, // Base URL to use in actions like `await page.goto('')`.
    trace: "on-first-retry", // Collect trace on failed test retry https://playwright.dev/docs/trace-viewer
    screenshot: "only-on-failure", // Capture screenshot after each test failure

    // Bypass Vercel Deployment Protection for automation (e.g., E2E tests on preview deployments)
    // Only applied when the bypass secret is available (set in CI for Vercel preview tests)
    // See: https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
    ...(process.env.VERCEL_AUTOMATION_BYPASS_SECRET && {
      extraHTTPHeaders: {
        "x-vercel-protection-bypass":
          process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
        "x-vercel-set-bypass-cookie": "true",
      },
    }),
  },

  /* Configure projects for major browsers */
  projects: [
    // Global setup for Clerk Testing Token (runs once before all tests)
    { name: "setup", testMatch: /global\.setup\.ts/ },

    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    //   dependencies: ["setup"],
    // },

    // Desktop Webkit removed - redundant with Mobile Safari for Safari engine coverage.
    // Mobile Safari tests the same Webkit engine with mobile viewport (iPhone).
    // Uncomment if you specifically need macOS Desktop Safari testing:
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    //   dependencies: ["setup"],
    // },

    /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    //   dependencies: ["setup"],
    // },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
      dependencies: ["setup"],
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    //   dependencies: ["setup"],
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    //   dependencies: ["setup"],
    // },
  ],

  /* Run local server before starting tests (dev locally, prod build in CI).
   * When BASE_URL is set (e.g., testing against Vercel preview),
   * skip starting a local server — we're testing an external deployment.
   */
  webServer: process.env.BASE_URL
    ? undefined // External URL — no local server needed
    : {
        command: process.env.CI ? "npm start" : "npm run dev",
        url: baseURL,
        timeout: 60 * 1000,
        reuseExistingServer: !process.env.CI,
      },
});
