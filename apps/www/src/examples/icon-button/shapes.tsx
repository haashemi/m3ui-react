import type * as React from 'react';

import { SettingsIcon } from '~/icons';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function IconButtonShapes(): React.JSX.Element {
  return (
    <>
      <IconButton size="md" variant="tonal" shape="round" aria-label="Settings, round">
        <SettingsIcon />
      </IconButton>
      <IconButton size="md" variant="tonal" shape="square" aria-label="Settings, square">
        <SettingsIcon />
      </IconButton>
    </>
  );
}
