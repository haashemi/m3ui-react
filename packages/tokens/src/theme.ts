import { type ColorOptions, colorRoles, createColorScheme, defaultColorOptions } from './color.ts';
import {
  duration,
  easing,
  focusIndicator,
  shape,
  state,
  typescale,
  typescaleEmphasized,
} from './generated/sys.ts';
import { type MotionScheme, springEasing, springs } from './motion.ts';

export interface CssTree {
  [selectorOrProperty: string]: CssTree | string;
}

export interface ThemeOptions extends ColorOptions {
  motion: MotionScheme;
}

export const defaultThemeOptions: ThemeOptions = { ...defaultColorOptions, motion: 'expressive' };

const fontStack =
  '"Google Sans Flex Variable", "Google Sans Flex", "Roboto Flex", Roboto, system-ui, sans-serif';

const shadows: Record<number, [string, string]> = {
  1: ['0 1px 2px 0', '0 1px 3px 1px'],
  2: ['0 1px 2px 0', '0 2px 6px 2px'],
  3: ['0 1px 3px 0', '0 4px 8px 3px'],
  4: ['0 2px 3px 0', '0 6px 10px 4px'],
  5: ['0 4px 4px 0', '0 8px 12px 6px'],
};

const shadowColor = (percent: number) =>
  `color-mix(in srgb, var(--md-sys-color-shadow) ${percent}%, transparent)`;

export const shadcnAliases: Record<string, string> = {
  background: 'background',
  foreground: 'on-background',
  card: 'surface-container-low',
  'card-foreground': 'on-surface',
  popover: 'surface-container',
  'popover-foreground': 'on-surface',
  primary: 'primary',
  'primary-foreground': 'on-primary',
  secondary: 'secondary',
  'secondary-foreground': 'on-secondary',
  muted: 'surface-container-high',
  'muted-foreground': 'on-surface-variant',
  accent: 'surface-container-highest',
  'accent-foreground': 'on-surface',
  destructive: 'error',
  'destructive-foreground': 'on-error',
  border: 'outline-variant',
  input: 'outline',
  ring: 'secondary',
  'chart-1': 'primary',
  'chart-2': 'tertiary',
  'chart-3': 'secondary',
  'chart-4': 'primary-fixed-dim',
  'chart-5': 'tertiary-container',
  sidebar: 'surface-container-low',
  'sidebar-foreground': 'on-surface',
  'sidebar-primary': 'primary',
  'sidebar-primary-foreground': 'on-primary',
  'sidebar-accent': 'secondary-container',
  'sidebar-accent-foreground': 'on-secondary-container',
  'sidebar-border': 'outline-variant',
  'sidebar-ring': 'secondary',
};

function aliasVars(): CssTree {
  const vars: CssTree = {};
  for (const [name, role] of Object.entries(shadcnAliases)) {
    vars[`--${name}`] = `var(--md-sys-color-${role})`;
  }
  vars['--radius'] = 'var(--md-sys-shape-corner-medium)';
  return vars;
}

function colorVars(options: ColorOptions, dark: boolean): CssTree {
  const scheme = createColorScheme(options, dark);
  return Object.fromEntries(
    Object.entries(scheme).map(([role, hex]) => [`--md-sys-color-${role}`, hex]),
  );
}

function springVars(scheme: MotionScheme): CssTree {
  const vars: CssTree = {};
  for (const [token, spring] of Object.entries(springs[scheme])) {
    const { durationMs, easing: curve } = springEasing(spring);
    vars[`--md-sys-motion-spring-${token}`] = curve;
    vars[`--md-sys-motion-spring-${token}-duration`] = `${durationMs}ms`;
  }
  return vars;
}

function systemVars(motion: MotionScheme): CssTree {
  const vars: CssTree = {
    '--md-ref-typeface-brand': fontStack,
    '--md-ref-typeface-plain': fontStack,
  };
  for (const [key, value] of Object.entries(shape)) vars[`--md-sys-shape-${key}`] = value;
  for (const [id, style] of Object.entries(typescale)) {
    const prefix = `--md-sys-typescale-${id}`;
    vars[`${prefix}-font`] = `var(--md-ref-typeface-${style.font})`;
    vars[`${prefix}-size`] = style.size;
    vars[`${prefix}-line-height`] = style.lineHeight;
    vars[`${prefix}-tracking`] = style.tracking;
    vars[`${prefix}-weight`] = String(style.weight);
  }
  for (const [id, style] of Object.entries(typescaleEmphasized)) {
    vars[`--md-sys-typescale-emphasized-${id}-weight`] = String(style.weight);
  }
  for (const [key, value] of Object.entries(duration))
    vars[`--md-sys-motion-duration-${key}`] = value;
  for (const [key, value] of Object.entries(easing)) vars[`--md-sys-motion-easing-${key}`] = value;
  Object.assign(vars, springVars(motion));
  for (const [key, value] of Object.entries(state)) {
    vars[`--md-sys-state-${key}-state-layer-opacity`] = String(value);
  }
  for (const [key, value] of Object.entries(focusIndicator)) {
    vars[`--md-sys-state-focus-indicator-${key}`] = value;
  }
  vars['--md-sys-focus-ring-animation'] =
    'md-focus-ring var(--md-sys-motion-duration-long4) var(--md-sys-motion-easing-emphasized)';
  vars['--md-sys-elevation-level0'] = 'none';
  for (const [level, [key, ambient]] of Object.entries(shadows)) {
    vars[`--md-sys-elevation-level${level}`] =
      `${key} ${shadowColor(30)}, ${ambient} ${shadowColor(15)}`;
  }
  return vars;
}

function tailwindTheme(): Record<string, string> {
  const vars: Record<string, string> = {
    'font-brand': 'var(--md-ref-typeface-brand)',
    'font-plain': 'var(--md-ref-typeface-plain)',
  };
  for (const role of colorRoles) vars[`color-${role}`] = `var(--md-sys-color-${role})`;
  for (const [key, value] of Object.entries(shape)) {
    if (!value.includes(' ')) vars[`radius-${key}`] = `var(--md-sys-shape-${key})`;
  }
  for (const level of Object.keys(shadows)) {
    vars[`shadow-elevation-${level}`] = `var(--md-sys-elevation-level${level})`;
  }
  for (const key of Object.keys(easing)) vars[`ease-${key}`] = `var(--md-sys-motion-easing-${key})`;
  for (const token of Object.keys(springs.expressive)) {
    vars[`ease-spring-${token}`] = `var(--md-sys-motion-spring-${token})`;
  }
  vars['animate-focus-ring'] = 'var(--md-sys-focus-ring-animation)';
  return vars;
}

function typeUtilities(): CssTree {
  const rules: CssTree = {};
  for (const id of Object.keys(typescale)) {
    const prefix = `--md-sys-typescale-${id}`;
    const declarations = {
      'font-family': `var(${prefix}-font)`,
      'font-size': `var(${prefix}-size)`,
      'line-height': `var(${prefix}-line-height)`,
      'letter-spacing': `var(${prefix}-tracking)`,
    };
    rules[`@utility type-${id}`] = { ...declarations, 'font-weight': `var(${prefix}-weight)` };
    rules[`@utility type-${id}-emphasized`] = {
      ...declarations,
      'font-weight': `var(--md-sys-typescale-emphasized-${id}-weight)`,
    };
  }
  return rules;
}

const focusRing: CssTree = {
  '@utility focus-ring': {
    'outline-style': 'none',
    '&:focus-visible': {
      'outline-style': 'solid',
      'outline-color': 'var(--md-sys-color-secondary)',
      'outline-width': 'var(--md-sys-state-focus-indicator-thickness)',
      'outline-offset': 'var(--md-sys-state-focus-indicator-outer-offset)',
      animation: 'var(--animate-focus-ring)',
      'z-index': '1',
    },
  },
  '@media (prefers-reduced-motion: reduce)': {
    ':root': { '--md-sys-focus-ring-animation': 'none' },
  },
  '@keyframes md-focus-ring': {
    '0%': { 'outline-width': '0' },
    '25%': { 'outline-width': '8px' },
  },
};

export interface Theme {
  css: CssTree;
  cssVars: { theme: Record<string, string> };
}

export function createTheme(options: ThemeOptions = defaultThemeOptions): Theme {
  const other: MotionScheme = options.motion === 'expressive' ? 'standard' : 'expressive';
  return {
    css: {
      ':root': { ...systemVars(options.motion), ...colorVars(options, false), ...aliasVars() },
      '.dark': { ...colorVars(options, true), ...aliasVars() },
      [`[data-motion-scheme="${other}"]`]: springVars(other),
      ...typeUtilities(),
      ...focusRing,
    },
    cssVars: { theme: tailwindTheme() },
  };
}

export function createColorTheme(options: ColorOptions): Pick<Theme, 'css'> {
  return { css: { ':root': colorVars(options, false), '.dark': colorVars(options, true) } };
}

function serialize(tree: CssTree, indent: string): string {
  return Object.entries(tree)
    .map(([key, value]) =>
      typeof value === 'string'
        ? `${indent}${key}: ${value};`
        : `${indent}${key} {\n${serialize(value, `${indent}  `)}\n${indent}}`,
    )
    .join('\n');
}

const withDashes = (vars: Record<string, string>): CssTree =>
  Object.fromEntries(Object.entries(vars).map(([key, value]) => [`--${key}`, value]));

export function themeToCss(theme: Theme | Pick<Theme, 'css'>): string {
  const tree: CssTree = { ...theme.css };
  if ('cssVars' in theme) {
    tree['@theme inline'] = withDashes(theme.cssVars.theme);
  }
  return `${serialize(tree, '')}\n`;
}

export function createThemeRegistryItem(theme: Theme = createTheme()): Record<string, unknown> {
  return {
    name: 'theme',
    type: 'registry:style',
    title: 'M3 Expressive theme',
    description:
      'Material 3 Expressive tokens: color roles (light and dark), shape, typography, motion springs, elevation and state layers, with shadcn/ui variables aliased to M3 roles.',
    dependencies: ['@fontsource-variable/google-sans-flex'],
    cssVars: theme.cssVars,
    css: { '@import "@fontsource-variable/google-sans-flex"': {}, ...theme.css },
  };
}
