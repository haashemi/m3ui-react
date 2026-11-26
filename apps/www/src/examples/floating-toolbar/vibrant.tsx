import type * as React from 'react';

import { FormatBoldIcon, FormatItalicIcon, FormatUnderlinedIcon, UndoIcon } from '~/icons';
import { FloatingToolbar } from '@/registry/m3ui/ui/floating-toolbar';
import { ToolbarIconButton, ToolbarToggleIconButton } from '@/registry/m3ui/ui/toolbar';

export default function FloatingToolbarVibrant(): React.JSX.Element {
  return (
    <FloatingToolbar variant="vibrant" aria-label="Formatting">
      <ToolbarToggleIconButton aria-label="Bold" defaultPressed>
        <FormatBoldIcon />
      </ToolbarToggleIconButton>
      <ToolbarToggleIconButton aria-label="Italic">
        <FormatItalicIcon />
      </ToolbarToggleIconButton>
      <ToolbarToggleIconButton aria-label="Underline">
        <FormatUnderlinedIcon />
      </ToolbarToggleIconButton>
      <ToolbarIconButton aria-label="Undo">
        <UndoIcon />
      </ToolbarIconButton>
    </FloatingToolbar>
  );
}
