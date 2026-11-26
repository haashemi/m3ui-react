import * as React from 'react';

import { AddIcon, AttachFileIcon, EditIcon, ImageIcon, MicIcon, PhotoCameraIcon } from '~/icons';
import {
  FloatingToolbar,
  FloatingToolbarLayout,
  ToolbarFab,
} from '@/registry/m3ui/ui/floating-toolbar';
import { ToolbarIconButton } from '@/registry/m3ui/ui/toolbar';

export default function FloatingToolbarWithFab(): React.JSX.Element {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <FloatingToolbarLayout>
      <FloatingToolbar variant="vibrant" expanded={expanded} aria-label="Compose">
        <ToolbarIconButton aria-label="Attach">
          <AttachFileIcon />
        </ToolbarIconButton>
        <ToolbarIconButton aria-label="Insert image">
          <ImageIcon />
        </ToolbarIconButton>
        <ToolbarIconButton aria-label="Camera">
          <PhotoCameraIcon />
        </ToolbarIconButton>
        <ToolbarIconButton aria-label="Dictate">
          <MicIcon />
        </ToolbarIconButton>
      </FloatingToolbar>
      <ToolbarFab
        variant="vibrant"
        aria-label="Compose tools"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? <EditIcon /> : <AddIcon />}
      </ToolbarFab>
    </FloatingToolbarLayout>
  );
}
