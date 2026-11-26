import type * as React from 'react';

import { ArrowBackIcon, PaletteIcon, ShareIcon } from '~/icons';
import { AppBar } from '@/registry/m3ui/ui/app-bar';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function AppBarCustomContent(): React.JSX.Element {
  return (
    <div className="overflow-hidden rounded-corner-large bg-surface inline-full max-inline-md">
      <AppBar
        leading={
          <IconButton aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
        }
        trailing={
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        }
      >
        <span className="flex items-center gap-2 type-title-large-emphasized text-primary">
          <PaletteIcon className="fill-current block-6 inline-6" />
          Palette
        </span>
      </AppBar>
    </div>
  );
}
