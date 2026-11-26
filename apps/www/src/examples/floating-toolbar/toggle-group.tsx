import type * as React from 'react';

import { FormatAlignCenterIcon, FormatAlignLeftIcon, FormatAlignRightIcon } from '~/icons';
import { FloatingToolbar } from '@/registry/m3ui/ui/floating-toolbar';
import { ToolbarToggleGroup, ToolbarToggleIconButton } from '@/registry/m3ui/ui/toolbar';

export default function FloatingToolbarToggleGroup(): React.JSX.Element {
  return (
    <FloatingToolbar variant="vibrant" aria-label="Alignment">
      <ToolbarToggleGroup aria-label="Align" defaultValue={['left']} deselectable={false}>
        <ToolbarToggleIconButton value="left" aria-label="Align left">
          <FormatAlignLeftIcon />
        </ToolbarToggleIconButton>
        <ToolbarToggleIconButton value="center" aria-label="Align center">
          <FormatAlignCenterIcon />
        </ToolbarToggleIconButton>
        <ToolbarToggleIconButton value="right" aria-label="Align right">
          <FormatAlignRightIcon />
        </ToolbarToggleIconButton>
      </ToolbarToggleGroup>
    </FloatingToolbar>
  );
}
