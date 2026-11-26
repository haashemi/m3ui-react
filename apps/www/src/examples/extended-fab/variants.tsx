import type * as React from 'react';

import { EditIcon } from '~/icons';
import { ExtendedFab } from '@/registry/m3ui/ui/extended-fab';

const variants = [
  'primary-container',
  'secondary-container',
  'tertiary-container',
  'primary',
  'secondary',
  'tertiary',
] as const;

export default function ExtendedFabVariants(): React.JSX.Element {
  return (
    <>
      {variants.map((variant) => (
        <ExtendedFab key={variant} variant={variant} icon={<EditIcon />}>
          Compose
        </ExtendedFab>
      ))}
    </>
  );
}
