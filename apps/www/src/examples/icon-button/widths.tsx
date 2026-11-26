import type * as React from 'react';

import { SettingsIcon } from '~/icons';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function IconButtonWidths(): React.JSX.Element {
  return (
    <>
      <IconButton size="md" width="narrow" variant="filled" aria-label="Settings, narrow">
        <SettingsIcon />
      </IconButton>
      <IconButton size="md" width="default" variant="filled" aria-label="Settings, default width">
        <SettingsIcon />
      </IconButton>
      <IconButton size="md" width="wide" variant="filled" aria-label="Settings, wide">
        <SettingsIcon />
      </IconButton>
    </>
  );
}
