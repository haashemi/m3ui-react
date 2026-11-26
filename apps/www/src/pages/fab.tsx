import * as React from 'react';

import { PageHeader, Preview, Section } from '~/components/docs';
import { AddIcon, EditIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';
import { ExtendedFab, Fab } from '@/registry/m3ui/ui/fab';

const variants = [
  'primary-container',
  'secondary-container',
  'tertiary-container',
  'primary',
  'secondary',
  'tertiary',
] as const;
const fabSizes = ['default', 'medium', 'large'] as const;
const extendedSizes = ['small', 'medium', 'large'] as const;

export function FabPage(): React.JSX.Element {
  const [extended, setExtended] = React.useState(true);
  return (
    <>
      <PageHeader
        title="Floating action buttons"
        description="FABs hold the most important action on a screen. Three sizes and six color styles, plus extended FABs with a label that collapses into a regular FAB."
        item="fab"
      />

      <Section title="Color styles">
        <Preview
          code={`<Fab variant="tertiary-container" aria-label="Compose">\n  <EditIcon />\n</Fab>`}
        >
          {variants.map((variant) => (
            <Fab key={variant} variant={variant} aria-label={`Compose, ${variant}`}>
              <EditIcon />
            </Fab>
          ))}
        </Preview>
      </Section>

      <Section title="Sizes" description="FAB (56dp), medium FAB (80dp) and large FAB (96dp).">
        <Preview code={`<Fab size="large" aria-label="Add">\n  <AddIcon />\n</Fab>`}>
          {fabSizes.map((size) => (
            <Fab key={size} size={size} aria-label={`Add, ${size}`}>
              <AddIcon />
            </Fab>
          ))}
        </Preview>
      </Section>

      <Section id="extended-fab" title="Extended FAB">
        <Preview
          className="flex-col"
          code={`<ExtendedFab size="medium" icon={<EditIcon />} extended={extended}>
  Compose
</ExtendedFab>`}
        >
          <Button variant="outlined" size="xs" onClick={() => setExtended((value) => !value)}>
            {extended ? 'Collapse' : 'Extend'}
          </Button>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {extendedSizes.map((size) => (
              <ExtendedFab key={size} size={size} icon={<EditIcon />} extended={extended}>
                Compose
              </ExtendedFab>
            ))}
          </div>
        </Preview>
      </Section>
    </>
  );
}
