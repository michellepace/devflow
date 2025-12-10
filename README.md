# README - Devflow

A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with other developers from around the world.

---

## What's Installed?

Next.js 16 with the below:

| Category | Tool | What it does |
| :------- | :--- | :----------- |
| Language | [TypeScript 5](https://www.typescriptlang.org) | Static type checking with strict mode enabled |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS framework for rapid styling |
| | [next-themes](https://github.com/pacocoursey/next-themes) | Light/dark mode theming provider |
| Linting | [Biome](https://biomejs.dev) | Fast linter and formatter (replaces ESLint + Prettier) |
| | [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) | Lints markdown files for consistent formatting |
| Testing | [Vitest](https://vitest.dev) | Fast unit test runner (Vite-native, Jest-compatible) |
| | [Playwright](https://playwright.dev) | E2E browser testing (Chromium, Firefox, WebKit, Mobile) |
| | [Testing Library](https://testing-library.com) | React component testing utilities |
| Git Hooks | [Lefthook](https://lefthook.dev) | Runs checks on commit (lint, typecheck, unit tests) and push (build, E2E tests) |
| Optimisation | [React Compiler](https://react.dev/learn/react-compiler) | Automatic memoisation and performance optimisations |
| Analytics | [Vercel Speed Insights](https://vercel.com/docs/speed-insights) | Real user performance metrics viewable on Vercel |
| | [Vercel Web Analytics](https://vercel.com/docs/analytics) | Privacy-friendly visitor analytics viewable on Vercel |

For exact list see [package.json](package.json)

## ⚙️ Config Files Explained

| File | What | Generally In This Project Template |
| :----- | :----- | :------------------ |
| ▢ [.gitattributes](.gitattributes) | Git line ending and file type handling | Normalises line endings across platforms for consistent Git diffs |
| ▢ [.gitignore](.gitignore) | Files and directories Git should ignore | Prevents build outputs and dependencies from being committed |
| ▢ [.markdownlint.yaml](.markdownlint.yaml) | Markdownlint configuration | Disables strict linting rules for practical writing |
| ▢ [.vscode/extensions.json](.vscode/extensions.json) | VS Code extension recommendations | Useful extensions to use in this Next.js project |
| ▢ [.vscode/settings.json](.vscode/settings.json) | VS Code editor and formatting settings | Enables auto-formatting and configures Biome and Tailwind extensions |
| 🌺 [.claude/commands/](.claude/commands) | Claude Code repeatable prompts | Write commits, evaluate CodeRabbit comments etc. |
| 🌺 [.claude/settings.json](.claude/settings.json) | Claude Code permissions | Allow/Deny permissions for files, commands, websearch etc |
| 🌺 [.mcp.json](.mcp.json) | Claude Code MCP config | e.g. Playwright MCP so Claude Code can "see" app and adjust |
| 🌺 [CLAUDE.md](CLAUDE.md) | Claude Code project context | Documents tech stack for Claude Code (customise!) |
| 🅽 [next.config.ts](next.config.ts) | Next.js framework configuration | Enables React Compiler and customises Next.js build settings |
| 🅽 [package.json](package.json) | Project dependencies and npm scripts | Defines project dependencies, scripts, and npm package metadata |
| 🅽 [postcss.config.mjs](postcss.config.mjs) | PostCSS plugins config for CSS processing | Enables Tailwind CSS v4 processing via PostCSS plugin |
| 🧪 [biome.json](biome.json) | Biome linter and formatter | Sets linting rules, formatting style, and import organisation |
| 🧪 [lefthook.yml](lefthook.yml) | Git hooks manager | Automates code quality checks on commit and E2E tests on push |
| 🧪 [tsconfig.json](tsconfig.json) | TypeScript compiler settings | Configures TypeScript compiler options and module resolution behaviour |
| 🧪 [playwright.config.ts](playwright.config.ts) | Playwright E2E test runner configuration | Sets test browsers (desktop + mobile), parallel execution, and base URLs |
| 🧪 [.playwright/](.playwright/) | Playwright test outputs (custom organisation) | Contains test artifacts in `test-results/` and HTML `playwright-report/` (all Playwright outputs nested under `/.playwright/` for clean structure) |
| 🧪 [vitest.config.ts](vitest.config.ts) | Vitest test runner config | Sets up React component testing environment and references [vitest.setup.ts](vitest.setup.ts) |
| 🧪 [vitest.setup.ts](vitest.setup.ts) | Global test setup | Adds helpful test assertions like `expect(element).toBeVisible()` |
| 🚀 [.github/dependabot.yml](.github/dependabot.yml) | Dependabot config | Automated dependency update PRs weekly (npm + GitHub Actions) |
| 🚀 [.github/workflows/check-lint-type.yml](.github/workflows/check-lint-type.yml) | GitHub Actions CI workflow | Runs Biome linting/formatting checks and TypeScript type checking on PRs |
| 🚀 [.github/workflows/test-e2e.yml](.github/workflows/test-e2e.yml) | GitHub Actions CI workflow | Runs Playwright E2E tests on PRs (builds production, tests browsers, uploads reports) |
| 🚀 [.github/workflows/test-e2e-vercel.yml](.github/workflows/test-e2e-vercel.yml) | GitHub Actions CI workflow | Runs Playwright E2E tests against Vercel Preview deployments (triggered by Vercel) |
| 🚀 [.github/workflows/test-unit.yml](.github/workflows/test-unit.yml) | GitHub Actions CI workflow | Runs Vitest unit tests on PRs (uses jsdom environment, React Testing Library) |

---

## 📝 Quick Notes

(1) Use Ngrok to Test App From Phone: (Terminal 1: `npm run dev`) + (Terminal 2: `ngrok http 3000`)

(2) GitHub Action - A branch protection ruleset exists to protect main. Includes checks for GitHub workflow jobs to pass before merging PR to main. See [x_docs/project-setup.md](x_docs/project-setup.md) for config details.

(3) Vercel For Deploys - When you raise a PR it automatically deploys to Vercel Preview and Playwright e2e tests run on that too in addition to GitHub servers. When you merge the PR into main, you are deploying to Vercel prod. See [x_docs/project-setup.md](x_docs/project-setup.md) for config details.
