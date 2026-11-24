import { describe, expect, it } from 'vite-plus/test';

import { colorRoles, createColorScheme, defaultColorOptions } from '../src/color.ts';

describe(createColorScheme, () => {
  it('returns a hex color for every role', () => {
    const scheme = createColorScheme(defaultColorOptions, false);
    for (const role of colorRoles) expect(scheme[role]).toMatch(/^#[\da-f]{6}$/u);
  });

  it('differs between light and dark and between contrast levels', () => {
    const light = createColorScheme(defaultColorOptions, false);
    const dark = createColorScheme(defaultColorOptions, true);
    const high = createColorScheme({ ...defaultColorOptions, contrast: 1 }, false);
    expect(dark['surface']).not.toBe(light['surface']);
    expect(high['primary']).not.toBe(light['primary']);
  });
});
