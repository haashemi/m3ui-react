import type * as React from 'react';

import { FavoriteFillIcon, FavoriteIcon } from '~/icons';
import { ToggleIconButton } from '@/registry/m3ui/ui/toggle-icon-button';

export default function ToggleIconButtonDemo(): React.JSX.Element {
  return (
    <ToggleIconButton variant="tonal" aria-label="Favorite">
      <FavoriteIcon className="in-data-pressed:hidden" />
      <FavoriteFillIcon className="not-in-data-pressed:hidden" />
    </ToggleIconButton>
  );
}
