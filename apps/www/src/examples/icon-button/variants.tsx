import type * as React from 'react';

import { SettingsIcon } from '~/icons';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function IconButtonVariants(): React.JSX.Element {
  return (
    <>
      <IconButton variant="filled" aria-label="Settings, filled">
        <SettingsIcon />
      </IconButton>
      <IconButton variant="tonal" aria-label="Settings, tonal">
        <SettingsIcon />
      </IconButton>
      <IconButton variant="outlined" aria-label="Settings, outlined">
        <SettingsIcon />
      </IconButton>
      <IconButton variant="standard" aria-label="Settings, standard">
        <SettingsIcon />
      </IconButton>
    </>
  );
}
