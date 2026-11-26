import type * as React from 'react';

import { ArrowBackIcon, HomeIcon, SearchIcon } from '~/icons';
import { DockedToolbar } from '@/registry/m3ui/ui/docked-toolbar';
import { ToolbarIconButton } from '@/registry/m3ui/ui/toolbar';

export default function DockedToolbarCenter(): React.JSX.Element {
  return (
    <DockedToolbar arrangement="center" aria-label="Browser">
      <ToolbarIconButton aria-label="Back">
        <ArrowBackIcon />
      </ToolbarIconButton>
      <ToolbarIconButton aria-label="Home">
        <HomeIcon />
      </ToolbarIconButton>
      <ToolbarIconButton aria-label="Search">
        <SearchIcon />
      </ToolbarIconButton>
    </DockedToolbar>
  );
}
