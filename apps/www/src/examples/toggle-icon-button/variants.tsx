import type * as React from 'react';

import { FavoriteFillIcon, FavoriteIcon } from '~/icons';
import { ToggleIconButton } from '@/registry/m3ui/ui/toggle-icon-button';

const variants = ['filled', 'tonal', 'outlined', 'standard'] as const;

export default function ToggleIconButtonVariants(): React.JSX.Element {
  return (
    <>
      {variants.map((variant) => (
        <ToggleIconButton
          key={variant}
          variant={variant}
          defaultPressed
          aria-label={`Favorite, ${variant}`}
        >
          <FavoriteIcon className="in-data-pressed:hidden" />
          <FavoriteFillIcon className="not-in-data-pressed:hidden" />
        </ToggleIconButton>
      ))}
    </>
  );
}
