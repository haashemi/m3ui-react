import type * as React from 'react';

import { ArrowBackIcon, MoreVertIcon } from '~/icons';
import { AppBar } from '@/registry/m3ui/ui/app-bar';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function AppBarLarge(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 inline-full max-inline-md">
      <div className="overflow-hidden rounded-corner-large bg-surface">
        <AppBar
          size="large"
          title="Title"
          leading={
            <IconButton aria-label="Back">
              <ArrowBackIcon />
            </IconButton>
          }
          trailing={
            <IconButton aria-label="More options">
              <MoreVertIcon />
            </IconButton>
          }
        />
      </div>
      <div className="overflow-hidden rounded-corner-large bg-surface">
        <AppBar
          size="large"
          title="Title"
          subtitle="Subtitle"
          leading={
            <IconButton aria-label="Back">
              <ArrowBackIcon />
            </IconButton>
          }
          trailing={
            <IconButton aria-label="More options">
              <MoreVertIcon />
            </IconButton>
          }
        />
      </div>
    </div>
  );
}
