import type * as React from 'react';

import { FormatBoldIcon, FormatItalicIcon, FormatUnderlinedIcon } from '~/icons';
import { ButtonGroup } from '@/registry/m3ui/ui/button-group';
import { ToggleIconButton } from '@/registry/m3ui/ui/toggle-icon-button';

export default function ButtonGroupToggles(): React.JSX.Element {
  return (
    <ButtonGroup aria-label="Text style">
      <ToggleIconButton variant="tonal" aria-label="Bold" defaultPressed>
        <FormatBoldIcon />
      </ToggleIconButton>
      <ToggleIconButton variant="tonal" aria-label="Italic">
        <FormatItalicIcon />
      </ToggleIconButton>
      <ToggleIconButton variant="tonal" aria-label="Underline">
        <FormatUnderlinedIcon />
      </ToggleIconButton>
    </ButtonGroup>
  );
}
