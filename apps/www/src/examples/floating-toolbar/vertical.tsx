import type * as React from 'react';

import { AddIcon, DeleteIcon, DrawIcon, ImageIcon, TextFieldsIcon } from '~/icons';
import {
  FloatingToolbar,
  FloatingToolbarLayout,
  ToolbarFab,
} from '@/registry/m3ui/ui/floating-toolbar';
import {
  ToolbarIconButton,
  ToolbarToggleGroup,
  ToolbarToggleIconButton,
} from '@/registry/m3ui/ui/toolbar';

export default function FloatingToolbarVertical(): React.JSX.Element {
  return (
    <FloatingToolbarLayout orientation="vertical">
      <FloatingToolbar aria-label="Tools">
        <ToolbarToggleGroup aria-label="Tool" defaultValue={['draw']} deselectable={false}>
          <ToolbarToggleIconButton value="draw" aria-label="Draw">
            <DrawIcon />
          </ToolbarToggleIconButton>
          <ToolbarToggleIconButton value="text" aria-label="Text">
            <TextFieldsIcon />
          </ToolbarToggleIconButton>
          <ToolbarToggleIconButton value="image" aria-label="Image">
            <ImageIcon />
          </ToolbarToggleIconButton>
        </ToolbarToggleGroup>
        <ToolbarIconButton aria-label="Delete">
          <DeleteIcon />
        </ToolbarIconButton>
      </FloatingToolbar>
      <ToolbarFab aria-label="Add">
        <AddIcon />
      </ToolbarFab>
    </FloatingToolbarLayout>
  );
}
