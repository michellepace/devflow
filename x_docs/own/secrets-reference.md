# Environment Variables

Quick reference for all environment variables and secrets across Local, Vercel, and GitHub.

## Quick Reference Commands

| Platform | Command |
|----------|---------|
| Local | `cat .env.local` |
| Vercel | `vercel env ls` |
| GitHub | `gh secret list` |

## Variables by Platform

### Local (`.env.local`)

| Variable | Value | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_YXdha2Utb3dsLTYzLmNsZXJrLmFjY291bnRzLmRldiQ` | Clerk client-side key |
| `CLERK_PUBLISHABLE_KEY` | `pk_test_YXdha2Utb3dsLTYzLmNsZXJrLmFjY291bnRzLmRldiQ` | Same key for @clerk/testing |
| `CLERK_SECRET_KEY` | `sk_test_...` | Clerk server-side key |
| `E2E_TEST_EMAIL` | `test+clerk_test@example.com` | Test user email |
| `E2E_TEST_PASSWORD` | `********` | Test user password |
| `E2E_TEST_OTP` | `424242` | Test OTP code |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` | Custom sign-in page route |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` | Custom sign-up page route |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | `/` | Redirect after sign-in (fallback) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | `/` | Redirect after sign-up (fallback) |

### Vercel

| Variable | Value | Production | Preview | Development | Sensitive? |
|----------|-------|:----------:|:-------:|:-----------:|:----------:|
| `CLERK_SECRET_KEY` | `sk_test_...` | Yes | Yes | - | **Yes** |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_YXdha2Utb3dsLTYzLmNsZXJrLmFjY291bnRzLmRldiQ` | Yes | Yes | Yes | No |
| `CLERK_PUBLISHABLE_KEY` | `pk_test_YXdha2Utb3dsLTYzLmNsZXJrLmFjY291bnRzLmRldiQ` | Yes | Yes | Yes | No |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` | Yes | Yes | Yes | No |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` | Yes | Yes | Yes | No |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | `/` | Yes | Yes | Yes | No |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | `/` | Yes | Yes | Yes | No |

> **Note:** Only `CLERK_SECRET_KEY` needs to be Sensitive. All `NEXT_PUBLIC_*` variables are exposed to the browser anyway, and publishable keys are designed to be public. Using "Plain text" for non-secrets makes configuration easier to audit in the Vercel dashboard.

### GitHub Secrets

| Secret | Purpose |
|--------|---------|
| `CLERK_PUBLISHABLE_KEY` | E2E tests (@clerk/testing) |
| `CLERK_SECRET_KEY` | E2E tests (@clerk/testing) |
| `E2E_TEST_EMAIL` | Test user credentials |
| `E2E_TEST_PASSWORD` | Test user credentials |
| `E2E_TEST_OTP` | Test user OTP code |
| `VERCEL_AUTOMATION_BYPASS_SECRET` | Vercel preview deployment automation |

## Variable Reference

### Clerk API Keys

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Client-side key for Next.js (browser-exposed, starts with `pk_test_` or `pk_live_`) |
| `CLERK_PUBLISHABLE_KEY` | Same value as above, required by `@clerk/testing` package |
| `CLERK_SECRET_KEY` | Server-side key (starts with `sk_test_` or `sk_live_`). Never expose publicly. |

### Clerk Routes

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Path to your custom sign-in page. Without this, Clerk redirects to the Account Portal. |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Path to your custom sign-up page. Without this, Clerk redirects to the Account Portal. |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | Where to redirect after sign-in when no `redirect_url` query param exists |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | Where to redirect after sign-up when no `redirect_url` query param exists |

### E2E Test Credentials

| Variable | Description |
|----------|-------------|
| `E2E_TEST_EMAIL` | Test user email. Use `+clerk_test` pattern (e.g., `test+clerk_test@example.com`) to enable test mode. |
| `E2E_TEST_PASSWORD` | Test user password |
| `E2E_TEST_OTP` | OTP code for verification. The `+clerk_test` email pattern accepts `424242` as valid OTP. |

### Automation

| Variable | Description |
|----------|-------------|
| `VERCEL_AUTOMATION_BYPASS_SECRET` | Used by GitHub Actions to trigger Vercel preview deployment tests |

---

## E2E Testing Setup

### How @clerk/testing Works

The `@clerk/testing` package enables E2E tests to authenticate without triggering bot detection:

1. `clerkSetup()` runs in global setup and obtains a Testing Token
2. `setupClerkTestingToken()` injects the token in each test
3. Clerk's bot detection is automatically bypassed

### Creating a Clerk Test User

1. Go to **Clerk Dashboard** > **Users** > **Create user**
2. Set email using the `+clerk_test` pattern (e.g., `test+clerk_test@example.com`)
3. Set a password
4. The `+clerk_test` pattern enables test mode, which accepts `424242` as the OTP code

### Running E2E Tests

```bash
npm run test:e2e              # Run all E2E tests
npm run test:e2e:headed       # Run with visible browser
npx playwright test auth      # Run only auth tests
```

### Vercel Preview Deployment Flow

When Vercel finishes deploying a preview, it triggers a GitHub Action that runs Playwright tests against your live preview URL:

1. You push code > Vercel deploys to a preview URL
2. Vercel notifies GitHub via `repository_dispatch` event
3. GitHub Actions runs Playwright, which connects to your preview URL and tests it
4. Results are reported back to your PR

**Note:** Test credentials (`E2E_TEST_*`) are stored in GitHub Secrets, not Vercel. Playwright runs on GitHub Actions and uses those secrets when it connects to your preview URL.

### Troubleshooting

#### "Bot traffic detected" error

- Ensure `clerkSetup()` runs in global setup before tests
- Verify `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are set

#### Tests fail in CI but pass locally

- Check all required secrets are configured in GitHub Actions
- Verify secrets match your local `.env.local` values

#### Tests timeout waiting for elements

- Clerk components load asynchronously; use Playwright's auto-waiting
- If issues persist, add explicit waits for Clerk elements
