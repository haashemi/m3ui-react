import type * as React from 'react';

import { SettingsIcon } from '~/icons';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function IconButtonDisabled(): React.JSX.Element {
  return (
    <>
      <IconButton variant="filled" disabled aria-label="Settings, filled">
        <SettingsIcon />
      </IconButton>
      <IconButton variant="tonal" disabled aria-label="Settings, tonal">
        <SettingsIcon />
      </IconButton>
      <IconButton variant="outlined" disabled aria-label="Settings, outlined">
        <SettingsIcon />
      </IconButton>
      <IconButton variant="standard" disabled aria-label="Settings, standard">
        <SettingsIcon />
      </IconButton>
    </>
  );
}
