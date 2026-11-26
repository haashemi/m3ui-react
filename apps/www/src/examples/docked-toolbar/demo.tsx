import type * as React from 'react';

import { ArchiveIcon, DeleteIcon, MailIcon, MoreVertIcon } from '~/icons';
import { DockedToolbar } from '@/registry/m3ui/ui/docked-toolbar';
import { ToolbarButton, ToolbarIconButton } from '@/registry/m3ui/ui/toolbar';

export default function DockedToolbarDemo(): React.JSX.Element {
  return (
    <DockedToolbar aria-label="Message">
      <ToolbarIconButton aria-label="Archive">
        <ArchiveIcon />
      </ToolbarIconButton>
      <ToolbarIconButton aria-label="Delete">
        <DeleteIcon />
      </ToolbarIconButton>
      <ToolbarButton>Reply</ToolbarButton>
      <ToolbarIconButton aria-label="More">
        <MoreVertIcon />
      </ToolbarIconButton>
      <ToolbarIconButton variant="filled" aria-label="Send">
        <MailIcon />
      </ToolbarIconButton>
    </DockedToolbar>
  );
}
