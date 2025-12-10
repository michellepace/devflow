# E2E Authentication Tests Setup

This guide explains how to configure environment variables for running Clerk authentication tests locally, in GitHub Actions, and on Vercel preview deployments.

## How It Works

The auth smoke test uses `@clerk/testing` which:

1. Obtains a Testing Token via `clerkSetup()` in global setup
2. Injects the token via `setupClerkTestingToken()` in each test
3. Bypasses Clerk's bot detection automatically

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key for Next.js (starts with `pk_test_`) |
| `CLERK_PUBLISHABLE_KEY` | Same key, used by `@clerk/testing` for E2E tests |
| `CLERK_SECRET_KEY` | Clerk secret key (starts with `sk_test_`) |
| `E2E_TEST_EMAIL` | Test user email address |
| `E2E_TEST_PASSWORD` | Test user password |
| `E2E_TEST_OTP` | OTP code for new device verification (default: `424242`) |

## Local Development

Ensure `.env.local` contains:

```bash
# Clerk - Next.js requires NEXT_PUBLIC_ prefix for client-side
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_PUBLISHABLE_KEY=pk_test_...  # Same value, needed by @clerk/testing
CLERK_SECRET_KEY=sk_test_...

# E2E Test User
E2E_TEST_EMAIL=test+clerk_test@example.com
E2E_TEST_PASSWORD=Horse1234!
E2E_TEST_OTP=424242
```

Run tests:

```bash
npm run test:e2e              # Run all E2E tests
npm run test:e2e:headed       # Run with visible browser
npx playwright test auth      # Run only auth tests
```

## GitHub Actions

Add these secrets to your repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each:

| Secret | Value |
|--------|-------|
| `CLERK_PUBLISHABLE_KEY` | `pk_test_...` |
| `CLERK_SECRET_KEY` | `sk_test_...` |
| `E2E_TEST_EMAIL` | `test+clerk_test@example.com` |
| `E2E_TEST_PASSWORD` | `Horse1234!` |
| `E2E_TEST_OTP` | `424242` |

The workflows (`.github/workflows/test-e2e.yml` and `test-e2e-vercel.yml`) are already configured to use these secrets.

## Vercel Preview Deployments

When Vercel finishes deploying a preview, it triggers a GitHub Action that runs Playwright tests **against your live preview URL**. This verifies your deployed app works before you merge.

**How it works:**

1. You push code → Vercel deploys to a preview URL
2. Vercel notifies GitHub via `repository_dispatch` event
3. GitHub Actions runs Playwright, which connects to your preview URL and tests it
4. Results are reported back to your PR

**Note:** Test credentials (`E2E_TEST_*`) are stored in GitHub Secrets, not Vercel. Playwright runs on GitHub Actions and uses those secrets when it connects to your preview URL over the network.

**Required setup:**

1. **GitHub Secrets** (same as above) - Test credentials used by Playwright
2. **Vercel Environment Variables** - Clerk keys needed for your deployed app to function:

| Variable | Environment |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Preview (and Production) |
| `CLERK_SECRET_KEY` | Preview (and Production) |

You likely already have these configured. The `E2E_TEST_*` variables are NOT needed on Vercel — Playwright uses GitHub Secrets when it connects to your preview URL.

## Creating a Clerk Test User

If you need to create a new test user:

1. Go to **Clerk Dashboard** → **Users** → **Create user**
2. Set email using the `+clerk_test` pattern (e.g., `test+clerk_test@example.com`)
3. Set a password
4. The `+clerk_test` email pattern enables test mode, which accepts `424242` as the OTP code if needed

## Troubleshooting

### "Bot traffic detected" error

- Ensure `clerkSetup()` runs in global setup before tests
- Verify `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are set

### Tests fail in CI but pass locally

- Check all required secrets are configured in GitHub Actions
- Verify secrets match your local `.env.local` values

### Tests timeout waiting for elements

- Clerk components load asynchronously; use Playwright's auto-waiting
- If issues persist, add explicit waits for Clerk elements
