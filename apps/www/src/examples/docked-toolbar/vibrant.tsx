import type * as React from 'react';

import { ArchiveIcon, DeleteIcon, MailIcon, StarIcon } from '~/icons';
import { DockedToolbar } from '@/registry/m3ui/ui/docked-toolbar';
import { ToolbarIconButton, ToolbarToggleIconButton } from '@/registry/m3ui/ui/toolbar';

export default function DockedToolbarVibrant(): React.JSX.Element {
  return (
    <DockedToolbar variant="vibrant" aria-label="Message">
      <ToolbarIconButton aria-label="Archive">
        <ArchiveIcon />
      </ToolbarIconButton>
      <ToolbarIconButton aria-label="Delete">
        <DeleteIcon />
      </ToolbarIconButton>
      <ToolbarToggleIconButton aria-label="Star">
        <StarIcon />
      </ToolbarToggleIconButton>
      <ToolbarIconButton variant="tonal" aria-label="Send">
        <MailIcon />
      </ToolbarIconButton>
    </DockedToolbar>
  );
}
