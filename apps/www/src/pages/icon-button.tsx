import type * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import { FavoriteFillIcon, FavoriteIcon, SettingsIcon } from '~/icons';
import { IconButton } from '@/registry/m3ui/ui/icon-button';
import { ToggleIconButton } from '@/registry/m3ui/ui/toggle-icon-button';

const variants = ['filled', 'tonal', 'outlined', 'standard'] as const;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const widths = ['narrow', 'default', 'wide'] as const;

export function IconButtonsPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Icon buttons"
        description="Icon buttons perform minor actions with a single icon. Four color styles, five sizes, three widths, and toggle icon buttons."
        item="icon-button"
      />

      <Section title="Color styles">
        <Preview
          code={`<IconButton variant="filled" aria-label="Settings">
  <SettingsIcon />
</IconButton>`}
        >
          {variants.map((variant) => (
            <IconButton key={variant} variant={variant} aria-label={`${variant} settings`}>
              <SettingsIcon />
            </IconButton>
          ))}
        </Preview>
      </Section>

      <Section title="Sizes">
        <Preview>
          {sizes.map((size) => (
            <IconButton key={size} size={size} variant="tonal" aria-label={`Settings, ${size}`}>
              <SettingsIcon />
            </IconButton>
          ))}
        </Preview>
      </Section>

      <Section title="Widths" description="Narrow, default and wide containers at every size.">
        <Preview className="flex-col">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-4">
              {widths.map((width) => (
                <IconButton
                  key={width}
                  size={size}
                  width={width}
                  variant="filled"
                  shape="square"
                  aria-label={`Settings, ${size} ${width}`}
                >
                  <SettingsIcon />
                </IconButton>
              ))}
            </div>
          ))}
        </Preview>
      </Section>

      <Section
        title="Toggle icon buttons"
        description="Selected icon buttons change color and morph from round to square. Swap in a filled icon for the selected state."
      >
        <Preview
          code={`<ToggleIconButton variant="tonal" aria-label="Favorite">
  <FavoriteIcon className="in-data-pressed:hidden" />
  <FavoriteFillIcon className="not-in-data-pressed:hidden" />
</ToggleIconButton>`}
        >
          {variants.map((variant) => (
            <ToggleIconButton key={variant} variant={variant} aria-label={`Favorite, ${variant}`}>
              <FavoriteIcon className="in-data-pressed:hidden" />
              <FavoriteFillIcon className="not-in-data-pressed:hidden" />
            </ToggleIconButton>
          ))}
        </Preview>
      </Section>

      <Section title="Disabled">
        <Preview>
          {variants.map((variant) => (
            <IconButton key={variant} variant={variant} disabled aria-label="Disabled settings">
              <SettingsIcon />
            </IconButton>
          ))}
        </Preview>
      </Section>
    </>
  );
}
