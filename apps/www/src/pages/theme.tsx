import {
  type ColorOptions,
  createColorTheme,
  defaultColorOptions,
  type SchemeVariant,
  schemeVariants,
  themeToCss,
} from '@m3ui/tokens';
import * as React from 'react';

import { CodeBlock, PageHeader, Preview, Section } from '~/components/docs';
import { Button } from '@/registry/m3ui/ui/button';
import {
  ConnectedButtonGroup,
  ConnectedButtonGroupItem,
} from '@/registry/m3ui/ui/connected-button-group';
import { Fab } from '@/registry/m3ui/ui/fab';
import { EditIcon } from '~/icons';

const swatches = [
  { role: 'primary', className: 'bg-primary text-on-primary' },
  { role: 'primary-container', className: 'bg-primary-container text-on-primary-container' },
  { role: 'secondary', className: 'bg-secondary text-on-secondary' },
  { role: 'secondary-container', className: 'bg-secondary-container text-on-secondary-container' },
  { role: 'tertiary', className: 'bg-tertiary text-on-tertiary' },
  { role: 'tertiary-container', className: 'bg-tertiary-container text-on-tertiary-container' },
  { role: 'error', className: 'bg-error text-on-error' },
  { role: 'error-container', className: 'bg-error-container text-on-error-container' },
  { role: 'surface', className: 'bg-surface text-on-surface' },
  { role: 'surface-container', className: 'bg-surface-container text-on-surface' },
  { role: 'surface-container-highest', className: 'bg-surface-container-highest text-on-surface' },
  { role: 'inverse-surface', className: 'bg-inverse-surface text-inverse-on-surface' },
];

const contrasts = [
  { label: 'Standard', value: '0' },
  { label: 'Medium', value: '0.5' },
  { label: 'High', value: '1' },
];

const variantNames = Object.keys(schemeVariants);

function isVariant(value: string): value is SchemeVariant {
  return variantNames.includes(value);
}

const themeSheet = new CSSStyleSheet();

function useAppliedTheme(options: ColorOptions): string {
  const css = React.useMemo(() => themeToCss(createColorTheme(options)), [options]);
  React.useEffect(() => {
    themeSheet.replaceSync(css);
    if (!document.adoptedStyleSheets.includes(themeSheet)) {
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, themeSheet];
    }
  }, [css]);
  return css;
}

function useMotionScheme(): [string, (scheme: string) => void] {
  const [scheme, setScheme] = React.useState(
    () => document.documentElement.dataset['motionScheme'] ?? 'expressive',
  );
  const update = React.useCallback((value: string) => {
    if (value === 'standard') document.documentElement.dataset['motionScheme'] = 'standard';
    else delete document.documentElement.dataset['motionScheme'];
    setScheme(value);
  }, []);
  return [scheme, update];
}

function ThemeControls({
  options,
  onOptionsChange: setOptions,
}: {
  options: ColorOptions;
  onOptionsChange: (options: ColorOptions) => void;
}): React.JSX.Element {
  const [motion, setMotion] = useMotionScheme();
  return (
    <div className="flex flex-col gap-6 rounded-corner-extra-large bg-surface-container-low p-6">
      <label className="flex items-center gap-4 type-label-large">
        Seed color
        <input
          type="color"
          value={options.seed}
          onChange={(event) => setOptions({ ...options, seed: event.target.value })}
          className="cursor-pointer rounded-corner-medium bg-transparent block-12 inline-12"
        />
        <span className="font-mono text-on-surface-variant">{options.seed}</span>
      </label>
      <label className="flex flex-wrap items-center gap-4 type-label-large">
        Scheme variant
        <select
          value={options.variant}
          onChange={(event) => {
            const { value } = event.target;
            if (isVariant(value)) setOptions({ ...options, variant: value });
          }}
          className="focus-ring rounded-corner-small border border-outline bg-surface px-3 type-body-large block-10"
        >
          {variantNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <div className="flex flex-wrap items-center gap-4 type-label-large">
        Contrast
        <ConnectedButtonGroup
          aria-label="Contrast"
          deselectable={false}
          value={[String(options.contrast)]}
          onValueChange={(value) => {
            const [next] = value;
            if (next !== undefined) setOptions({ ...options, contrast: Number(next) });
          }}
        >
          {contrasts.map(({ label, value }) => (
            <ConnectedButtonGroupItem key={value} value={value}>
              {label}
            </ConnectedButtonGroupItem>
          ))}
        </ConnectedButtonGroup>
      </div>
      <div className="flex flex-wrap items-center gap-4 type-label-large">
        Motion scheme
        <ConnectedButtonGroup
          aria-label="Motion scheme"
          deselectable={false}
          value={[motion]}
          onValueChange={(value) => {
            const [next] = value;
            if (next !== undefined) setMotion(next);
          }}
        >
          <ConnectedButtonGroupItem value="expressive">Expressive</ConnectedButtonGroupItem>
          <ConnectedButtonGroupItem value="standard">Standard</ConnectedButtonGroupItem>
        </ConnectedButtonGroup>
      </div>
      <div>
        <Button variant="text" onClick={() => setOptions(defaultColorOptions)}>
          Reset
        </Button>
      </div>
    </div>
  );
}

function ThemePreview(): React.JSX.Element {
  return (
    <Preview>
      <div className="grid grid-cols-2 gap-2 inline-full sm:grid-cols-3 lg:grid-cols-4">
        {swatches.map(({ role, className }) => (
          <div
            key={role}
            className={`flex items-end rounded-corner-medium p-3 type-label-medium block-20 ${className}`}
          >
            {role}
          </div>
        ))}
      </div>
      <Button>Filled</Button>
      <Button variant="tonal">Tonal</Button>
      <Button variant="outlined">Outlined</Button>
      <Fab variant="tertiary-container" aria-label="Compose">
        <EditIcon />
      </Fab>
    </Preview>
  );
}

export function ThemePage(): React.JSX.Element {
  const [options, setOptions] = React.useState<ColorOptions>(defaultColorOptions);
  const css = useAppliedTheme(options);
  const item = React.useMemo(
    () =>
      JSON.stringify(
        {
          $schema: 'https://ui.shadcn.com/schema/registry-item.json',
          name: 'm3ui-custom-theme',
          type: 'registry:theme',
          registryDependencies: ['@m3ui/theme'],
          ...createColorTheme(options),
        },
        null,
        2,
      ),
    [options],
  );

  return (
    <>
      <PageHeader
        title="Theme"
        description="Generate a color scheme from a seed color with the 2025 (M3 Expressive) color spec, preview it live, and install it as a shadcn registry item. Shape, type, motion and elevation come from @m3ui/theme."
        item="theme"
      />

      <Section title="Color scheme">
        <ThemeControls options={options} onOptionsChange={setOptions} />
        <ThemePreview />
      </Section>

      <Section
        title="Install"
        description="Save the item below as m3ui-custom-theme.json and run npx shadcn@latest add ./m3ui-custom-theme.json, or paste the CSS into your global stylesheet after the theme."
      >
        <CodeBlock code={item} language="json" />
        <CodeBlock code={css} language="css" />
      </Section>
    </>
  );
}
