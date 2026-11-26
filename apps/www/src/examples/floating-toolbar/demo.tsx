import type * as React from 'react';

import {
  FormatBoldIcon,
  FormatItalicIcon,
  FormatUnderlinedIcon,
  RedoIcon,
  UndoIcon,
} from '~/icons';
import { FloatingToolbar } from '@/registry/m3ui/ui/floating-toolbar';
import { ToolbarIconButton, ToolbarToggleIconButton } from '@/registry/m3ui/ui/toolbar';

export default function FloatingToolbarDemo(): React.JSX.Element {
  return (
    <FloatingToolbar aria-label="Formatting">
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
      <ToolbarIconButton aria-label="Redo" disabled>
        <RedoIcon />
      </ToolbarIconButton>
    </FloatingToolbar>
  );
}
