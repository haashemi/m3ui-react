import {
  argbFromHex,
  type DynamicScheme,
  Hct,
  hexFromArgb,
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeFruitSalad,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant,
} from '@material/material-color-utilities';

export const colorRoles = [
  'primary',
  'on-primary',
  'primary-container',
  'on-primary-container',
  'inverse-primary',
  'primary-fixed',
  'primary-fixed-dim',
  'on-primary-fixed',
  'on-primary-fixed-variant',
  'secondary',
  'on-secondary',
  'secondary-container',
  'on-secondary-container',
  'secondary-fixed',
  'secondary-fixed-dim',
  'on-secondary-fixed',
  'on-secondary-fixed-variant',
  'tertiary',
  'on-tertiary',
  'tertiary-container',
  'on-tertiary-container',
  'tertiary-fixed',
  'tertiary-fixed-dim',
  'on-tertiary-fixed',
  'on-tertiary-fixed-variant',
  'error',
  'on-error',
  'error-container',
  'on-error-container',
  'background',
  'on-background',
  'surface',
  'surface-dim',
  'surface-bright',
  'surface-container-lowest',
  'surface-container-low',
  'surface-container',
  'surface-container-high',
  'surface-container-highest',
  'on-surface',
  'surface-variant',
  'on-surface-variant',
  'inverse-surface',
  'inverse-on-surface',
  'outline',
  'outline-variant',
  'shadow',
  'scrim',
  'surface-tint',
] as const;

export type ColorRole = (typeof colorRoles)[number];
export type ColorScheme = Record<string, string>;

export const schemeVariants = {
  'tonal-spot': SchemeTonalSpot,
  neutral: SchemeNeutral,
  vibrant: SchemeVibrant,
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  content: SchemeContent,
  rainbow: SchemeRainbow,
  'fruit-salad': SchemeFruitSalad,
  monochrome: SchemeMonochrome,
} as const;

export type SchemeVariant = keyof typeof schemeVariants;

export interface ColorOptions {
  seed: string;
  variant: SchemeVariant;
  contrast: number;
}

export const defaultColorOptions: ColorOptions = {
  seed: '#6750a4',
  variant: 'tonal-spot',
  contrast: 0,
};

const camel = (role: string) =>
  role.replace(/-(?<char>\w)/gu, (_, char: string) => char.toUpperCase());

export function createColorScheme(options: ColorOptions, dark: boolean): ColorScheme {
  const Scheme = schemeVariants[options.variant];
  const scheme: DynamicScheme = new Scheme(
    Hct.fromInt(argbFromHex(options.seed)),
    dark,
    options.contrast,
    '2025',
  );
  const colors: ColorScheme = {};
  for (const role of colorRoles) {
    const argb: unknown = Reflect.get(scheme, camel(role));
    if (typeof argb !== 'number') throw new Error(`Unknown color role "${role}"`);
    colors[role] = hexFromArgb(argb);
  }
  return colors;
}
