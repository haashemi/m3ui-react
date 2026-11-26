import type * as React from 'react';

import { FavoriteFillIcon, FavoriteIcon } from '~/icons';
import { ToggleIconButton } from '@/registry/m3ui/ui/toggle-icon-button';

export default function ToggleIconButtonDisabled(): React.JSX.Element {
  return (
    <>
      <ToggleIconButton variant="filled" disabled aria-label="Favorite">
        <FavoriteIcon />
      </ToggleIconButton>
      <ToggleIconButton variant="outlined" disabled defaultPressed aria-label="Favorite">
        <FavoriteFillIcon />
      </ToggleIconButton>
    </>
  );
}
