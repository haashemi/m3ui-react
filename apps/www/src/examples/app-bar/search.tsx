import type * as React from 'react';

import { AccountCircleIcon, MenuIcon, MicIcon } from '~/icons';
import { AppBar, AppBarSearch } from '@/registry/m3ui/ui/app-bar';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function AppBarSearchExample(): React.JSX.Element {
  return (
    <div className="overflow-hidden rounded-corner-large bg-surface inline-full max-inline-md">
      <AppBar
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
      >
        <AppBarSearch
          trailing={
            <IconButton aria-label="Voice search">
              <MicIcon />
            </IconButton>
          }
        >
          Search messages
        </AppBarSearch>
      </AppBar>
    </div>
  );
}
