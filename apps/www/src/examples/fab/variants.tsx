import type * as React from 'react';

import { EditIcon } from '~/icons';
import { Fab } from '@/registry/m3ui/ui/fab';

const variants = [
  'primary-container',
  'secondary-container',
  'tertiary-container',
  'primary',
  'secondary',
  'tertiary',
] as const;

export default function FabVariants(): React.JSX.Element {
  return (
    <>
      {variants.map((variant) => (
        <Fab key={variant} variant={variant} aria-label={`Compose, ${variant}`}>
          <EditIcon />
        </Fab>
      ))}
    </>
  );
}
