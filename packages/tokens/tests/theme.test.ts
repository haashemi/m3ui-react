import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vite-plus/test';

import { createTheme, createThemeRegistryItem, shadcnAliases, themeToCss } from '../src/theme.ts';

const root = new URL('../../../', import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), 'utf8');

describe('theme', () => {
  const theme = createTheme();

  it('keeps the generated files in sync (run `vp run theme` after changing tokens)', () => {
    expect(read('apps/www/src/styles/m3ui.css')).toBe(themeToCss(theme));
    expect(JSON.parse(read('registry/theme/registry.json'))).toEqual(
      JSON.parse(JSON.stringify({ items: [createThemeRegistryItem(theme)] })),
    );
  });

  it('aliases every shadcn variable in light and dark', () => {
    for (const selector of [':root', '.dark']) {
      const block = theme.css[selector];
      expect(block).toBeTypeOf('object');
      for (const name of Object.keys(shadcnAliases)) {
        expect(block).toHaveProperty(`--${name}`);
      }
    }
  });

  it('puts Tailwind theme variables in cssVars.theme, which shadcn merges into @theme', () => {
    expect(Object.keys(theme.css)).not.toContain('@theme inline');
    expect(theme.cssVars.theme['color-primary-container']).toBe(
      'var(--md-sys-color-primary-container)',
    );
  });
});
