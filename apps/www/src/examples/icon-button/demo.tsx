import type * as React from 'react';

import { EditIcon, SettingsIcon, ShareIcon } from '~/icons';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function IconButtonDemo(): React.JSX.Element {
  return (
    <>
      <IconButton aria-label="Settings">
        <SettingsIcon />
      </IconButton>
      <IconButton variant="tonal" aria-label="Share">
        <ShareIcon />
      </IconButton>
      <IconButton variant="filled" aria-label="Edit">
        <EditIcon />
      </IconButton>
    </>
  );
}
