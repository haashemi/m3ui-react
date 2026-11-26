import type * as React from 'react';

import { ArrowBackIcon, EditIcon } from '~/icons';
import { AppBar } from '@/registry/m3ui/ui/app-bar';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function AppBarSubtitle(): React.JSX.Element {
  return (
    <div className="overflow-hidden rounded-corner-large bg-surface inline-full max-inline-md">
      <AppBar
        title="Title"
        subtitle="Subtitle"
        leading={
          <IconButton aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
        }
        trailing={
          <IconButton variant="filled" width="wide" aria-label="Edit">
            <EditIcon />
          </IconButton>
        }
      />
    </div>
  );
}
