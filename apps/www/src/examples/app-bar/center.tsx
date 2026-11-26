import type * as React from 'react';

import { AccountCircleIcon, MenuIcon } from '~/icons';
import { AppBar } from '@/registry/m3ui/ui/app-bar';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function AppBarCenter(): React.JSX.Element {
  return (
    <div className="overflow-hidden rounded-corner-large bg-surface inline-full max-inline-md">
      <AppBar
        align="center"
        title="Title"
        leading={
          <IconButton aria-label="Menu">
            <MenuIcon />
          </IconButton>
        }
        trailing={
          <IconButton aria-label="Account">
            <AccountCircleIcon />
          </IconButton>
        }
      />
    </div>
  );
}
