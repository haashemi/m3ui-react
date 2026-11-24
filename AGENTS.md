# AGENTS.md

## Project

**M3UI React** — a [shadcn registry](https://ui.shadcn.com/docs/registry) of
[Material 3 Expressive](https://m3.material.io/get-started) components, built on the headless
behaviors of [UI SDK](https://ui-sdk.dev/) (`@ui-sdk/react` + `@ui-sdk/core`).

Goal: pixel-perfect M3 Expressive components with the motion the guidelines call for
(spring physics, shape morphing, state layers, ripples), installable via `npx shadcn add`.

## Decisions

- **Layout:** pnpm monorepo — `apps/www` (Vite+ React docs, previews, and the static
  `/r/*.json` registry output) plus the registry source.
- **Hosting:** GitHub Pages, deployed from GitHub Actions.
- **Motion:** no runtime animation dependency by default — CSS `linear()` easings generated from
  the M3 spring tokens, UI SDK's `solveSpring` for gestures/interruptible motion, custom path
  interpolation for shape morphing. Add `motion` only where an animation can't be reproduced
  faithfully without it.
- **Tokens:** full M3 token set (`--md-sys-*`: color roles, shape, typography, motion, elevation,
  state layers) exposed through Tailwind v4 `@theme`, with shadcn's variables (`--primary`,
  `--background`, `--radius`, …) aliased to the nearest M3 roles.
- **Typeface:** Google Sans Flex.
- **License:** CC0-1.0 (public domain).
- **Milestone 1:** tooling, docs app, registry pipeline, tokens, ripple/state layers, then
  Button, Icon Button, Button Group, Split Button, FAB / Extended FAB.

## Documentation: always use context7

Always look up library docs through the **context7** MCP (`resolve-library-id` → `query-docs`)
before writing or changing code that depends on a library, even well-known ones. Training data
is stale for this stack (UI SDK is in beta and releases almost daily).

Useful IDs: `/vercel-labs/ui` (UI SDK). Resolve others as needed (shadcn, Tailwind CSS v4,
Vite+, Oxlint, React 19).

Fallbacks when context7 lacks something:

- UI SDK: `node_modules/@ui-sdk/react/docs/llms.txt`, https://ui-sdk.dev/llms.txt
- Vite+: https://viteplus.dev/llms-full.txt
- shadcn registry: https://ui.shadcn.com/docs/registry.md
- M3: https://m3.material.io

## Skills

Use these project skills (`.claude/skills`, pinned in `skills-lock.json`):

- `vercel-react-best-practices` — when writing or reviewing React code.
- `vercel-composition-patterns` — when designing component APIs (compound components, slots).
- `shadcn` — for registry items, `components.json`, `shadcn build`.
- `tailwind-design-system` — for tokens, `@theme`, variants.
- `webapp-testing` — for verifying components in a real browser (Playwright).

Restore them with `pnpm dlx skills experimental_install`.

## Tooling

- Package manager: **pnpm** only (`packageManager` is pinned in `package.json`; settings live in
  `pnpm-workspace.yaml`: `engineStrict: true`, `savePrefix: ""` → exact versions).
- **Vite+** (`vp`) handles dev, build, pack, lint (Oxlint), format (Oxfmt), test (Vitest) and
  staged hooks. Configure everything in `vite.config.ts`; do not add `.oxlintrc.json`,
  `.oxfmtrc.json`, `vitest.config.ts` or `tsdown.config.ts`.
- Lint rules come from `@fullstacksjs/oxlint-config`.
- TypeScript is strict (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, …). No `any`,
  no non-null assertions to silence the compiler.

## Before you finish a change

Run `vp check` and `vp test`, and verify UI changes in a browser.
