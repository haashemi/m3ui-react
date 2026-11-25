import { defineConfig as defineLintConfig } from '@fullstacksjs/oxlint-config';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite-plus';

const path = (relative: string) => fileURLToPath(new URL(relative, import.meta.url));

const lint = defineLintConfig({
  modules: {
    react: true,
    vitest: true,
    tailwind: { entryPoint: './apps/www/src/styles.css' },
  },
  options: { strict: true, typeAware: true, esm: true },
});

const sharedSettings: Record<string, unknown> = {};
for (const entry of lint.extends ?? []) Object.assign(sharedSettings, entry.settings);

export default defineConfig({
  lint: {
    ...lint,
    extends: [
      ...(lint.extends ?? []),
      {
        jsPlugins: [{ name: 'shadcn', specifier: '@shadcn/lint' }],
        rules: {
          'shadcn/no-restyle': ['error', { allow: ['layout'] }],
          'shadcn/no-raw-colors': 'error',
          'shadcn/no-arbitrary-values': 'error',
          'shadcn/no-inline-styles': 'error',
          'shadcn/no-unknown-classes': 'error',
          'shadcn/require-static-classes': 'error',
          'jsx-a11y/label-has-associated-control': [
            'error',
            { controlComponents: ['Checkbox', 'Radio', 'Switch'], depth: 3 },
          ],
        },
      },
    ],
    settings: { ...sharedSettings, shadcn: { ui: '@/registry/m3ui/ui' } },
    ignorePatterns: [
      '**/dist/**',
      '**/public/r/**',
      'packages/tokens/src/generated/**',
      '**/routeTree.gen.ts',
      '.claude/skills/**',
    ],
    overrides: [
      ...(lint.overrides ?? []),
      {
        files: ['registry/**'],
        rules: {
          'shadcn/no-restyle': 'off',
          'shadcn/no-arbitrary-values': 'off',
          'shadcn/require-static-classes': 'off',
          'import/extensions': 'off',
          'react/only-export-components': 'off',
          'typescript/explicit-module-boundary-types': 'off',
          'jsx-a11y/prefer-tag-over-role': 'off',
        },
      },
      {
        files: ['apps/**'],
        rules: { 'import/extensions': 'off' },
      },
      {
        files: ['scripts/**', '**/scripts/**'],
        rules: { 'no-console': 'off', 'typescript/no-unsafe-type-assertion': 'off' },
      },
    ],
    options: { ...lint.options, typeAware: true, typeCheck: true },
  },
  fmt: {
    singleQuote: true,
    printWidth: 100,
    ignorePatterns: [
      '**/public/r/**',
      'pnpm-lock.yaml',
      '.claude/skills/**',
      'skills-lock.json',
      'apps/www/src/styles/m3ui.css',
      'registry/theme/registry.json',
      '**/routeTree.gen.ts',
    ],
  },
  test: {
    projects: [
      {
        test: {
          name: 'tokens',
          root: path('./packages/tokens'),
          include: ['tests/**/*.test.ts'],
          server: { deps: { inline: ['@material/material-color-utilities'] } },
        },
      },
      {
        resolve: {
          alias: [
            { find: /^@\/registry\//u, replacement: `${path('./registry')}/` },
            { find: '@/lib/utils', replacement: path('./registry/lib/utils.ts') },
          ],
        },
        test: {
          name: 'registry',
          root: path('./registry'),
          include: ['tests/**/*.test.tsx'],
          environment: 'happy-dom',
          setupFiles: ['./tests/setup.ts'],
        },
      },
    ],
  },
  staged: {
    '*': 'vp check --fix',
  },
  run: {
    cache: true,
  },
});
