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
- **Color:** default scheme ships as static CSS (light + dark). The docs site has a theme builder
  (seed, variant, contrast, via `@material/material-color-utilities` with the 2025 spec) that
  outputs an installable `registry:theme`. No runtime color dependency for consumers.
- **Dark mode:** `.dark` class (shadcn convention); tokens defined under `:root` and `.dark`.
- **Motion scheme:** expressive by default, standard available.
- **Icons:** components are icon-agnostic (icons as children, sized by tokens); docs and examples
  use Material Symbols Rounded as React SVG components.
- **Registry namespace:** `@m3ui` (`npx shadcn add @m3ui/button`).
- **Typeface:** Google Sans Flex.
- **License:** CC0-1.0 (public domain).
- **Milestone 1:** tooling, docs app, registry pipeline, tokens, ripple/state layers, then
  Button, Icon Button, Button Group, Split Button, FAB / Extended FAB.
- **Milestone 2:** selection controls — Checkbox, Radio, Switch, Chips (assist, filter, input,
  suggestion).
- **Milestone 3:** Toolbars (docked, floating, with FAB), Tabs (primary, secondary).

## Layout

- `registry/m3ui/ui/*.tsx` — the components shipped to users. Import siblings as
  `@/registry/m3ui/ui/<name>` and `cn` from `@/lib/utils` (shadcn rewrites these on install).
  Keep each file copy-paste friendly: no imports from apps or packages.
- `registry/m3ui/registry.json` — component items; `registry/theme/registry.json` is generated.
- `registry.json` — root registry (also makes the repo installable as `haashemi/m3ui-react/<item>`).
- `packages/tokens` — M3 token data, spring → CSS `linear()` easing, color schemes and theme
  generation. `src/generated/sys.ts` is extracted from `@material/web` (`vp run @m3ui/tokens#extract`).
- `apps/www` — Vite+ React docs site; `src/styles/m3ui.css` is generated. Routing is TanStack
  Router file-based: thin route files in `src/routes` (generated `src/routeTree.gen.ts`) render
  page components from `src/pages`.
- `apps/www/src/examples/<item>/<name>.tsx` — one docs example per file (default export).
  `<ComponentPreview name="<item>/<name>" />` renders it and shows its source, with registry imports
  shown as `@/components/ui/*`.
- `scripts/build-theme.ts` — writes the generated theme files (`vp run theme`). A test fails when
  they are out of date.

## Commands

- `vp run dev` — docs site at http://localhost:5173/m3ui-react/ (the script passes `--host`; always
  use `--host` when running any dev server)
- `vp run theme` — regenerate theme CSS and the theme registry item
- `vp run build` — theme, registry (`apps/www/public/r`) and docs site
- `vp check` / `vp test` — format, lint, type-check / unit tests
- Pre-commit runs `vp staged` (`vp check --fix` on staged files)

## Component conventions

- Behavior comes from UI SDK primitives (`@ui-sdk/react/*`); styling is Tailwind classes in
  `cva` variants, driven by `--md-sys-*` tokens and per-component CSS variables.
- Every interactive component renders `<Ripple />` (hover, focus, press state layers in
  `currentColor`) and the `focus-ring` utility.
- Shapes that morph use real pixel radii (`calc(height / 2)` for "full"), never `9999px`, so
  transitions animate. Spatial properties use `--md-sys-motion-spring-*-spatial`, colors and
  shadows the `*-effects` springs.
- Typography uses `type-<role>` utilities, not `text-*`, so `tailwind-merge` never drops them.
- UI SDK owns `data-slot` on its parts (a `data-slot` prop on a primitive is overwritten); style
  states with `data-pressed`, `data-checked`, `data-disabled`, `aria-expanded`, `data-open`.
- State layers whose hover and pressed colors differ set `--ripple-hover-color` and
  `--ripple-pressed-color` on the control.
- Write comments only when they are really necessary.

## Component pages

Each registry item gets its own page at `/components/<item>` (a toggle variant is its own item and
page), in this order, following shadcn's docs:

1. `PageHeader` (title, description) and `<ComponentPreview name="<item>/demo" />`
2. Installation (`<Installation item>`: command and manual tabs)
3. `UsageSection` (import, minimal JSX), then `CompositionSection` for compound components
4. Notes: what people need to know before using it
5. `ExamplesSection`, one example file each
6. `RtlSection` with `<item>/rtl`: Persian, Arabic and Hebrew strings via `useTranslation`
7. API Reference: one `ApiComponent` per export, with `inherits` for the UI SDK part it wraps

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

## Spec sources (for pixel-perfect values)

m3.material.io lists web as "unavailable" for Expressive, so values are ported from:

- **Tokens:** `@material/web` generated Sass tokens, `tokens/versions/latest/sass/`
  (`_md-sys-*.scss`, `_md-comp-*.scss`). Pin an exact `@material/web` version; these files can
  change in patch releases.
- **Motion springs & behavior:** Compose Material 3 source,
  `androidx/compose/material3/.../tokens/{Standard,Expressive}MotionTokens.kt`.
- **Shapes / morph:** Compose `MaterialShapes.kt` + `androidx.graphics.shapes`.
- **Ripple:** `@material/web` `ripple/internal/ripple.ts`.
- **Visual reference:** `@material/web` `labs/gb/components/`, the M3 Figma design kit.
- Do not use `material-foundation/material-tokens` (archived).

## Skills

Use these project skills (`.agents/skills`, symlinked from `.claude/skills`, pinned in
`skills-lock.json`):

- `ui-sdk` — whenever building a new component (choosing/composing UI SDK primitives, building
  missing behaviors from `@ui-sdk/core`, testing keyboard, focus and ARIA).
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
- Lint rules come from `@fullstacksjs/oxlint-config` (strict, type-aware) plus `@shadcn/lint`
  (`no-restyle`, `no-raw-colors`, `no-arbitrary-values`, `no-inline-styles`,
  `no-unknown-classes`, `require-static-classes`). Component sources in `registry/**` may use
  arbitrary values and restyle primitives; apps may not. Fix lint findings instead of disabling
  rules.
- TypeScript is strict (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, …). No `any`,
  no non-null assertions to silence the compiler.

## Before you finish a change

Run `vp check` and `vp test`, and verify UI changes in a browser.
