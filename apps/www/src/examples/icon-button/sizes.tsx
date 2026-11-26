import type * as React from 'react';

import { SettingsIcon } from '~/icons';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function IconButtonSizes(): React.JSX.Element {
  return (
    <>
      <IconButton size="xs" variant="tonal" aria-label="Settings, extra small">
        <SettingsIcon />
      </IconButton>
      <IconButton size="sm" variant="tonal" aria-label="Settings, small">
        <SettingsIcon />
      </IconButton>
      <IconButton size="md" variant="tonal" aria-label="Settings, medium">
        <SettingsIcon />
      </IconButton>
      <IconButton size="lg" variant="tonal" aria-label="Settings, large">
        <SettingsIcon />
      </IconButton>
      <IconButton size="xl" variant="tonal" aria-label="Settings, extra large">
        <SettingsIcon />
      </IconButton>
    </>
  );
}
