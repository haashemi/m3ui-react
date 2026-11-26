import type * as React from 'react';

import { ArrowBackIcon, AttachFileIcon, MoreVertIcon } from '~/icons';
import { AppBar } from '@/registry/m3ui/ui/app-bar';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function AppBarDemo(): React.JSX.Element {
  return (
    <div className="overflow-hidden rounded-corner-large bg-surface inline-full max-inline-md">
      <AppBar
        title="Title"
        leading={
          <IconButton aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
        }
        trailing={
          <>
            <IconButton aria-label="Attach">
              <AttachFileIcon />
            </IconButton>
            <IconButton aria-label="More options">
              <MoreVertIcon />
            </IconButton>
          </>
        }
      />
    </div>
  );
}
