import type * as React from 'react';

import { FormatAlignCenterIcon, FormatAlignLeftIcon, FormatAlignRightIcon } from '~/icons';
import {
  ConnectedButtonGroup,
  ConnectedButtonGroupItem,
} from '@/registry/m3ui/ui/connected-button-group';

export default function ConnectedButtonGroupIcons(): React.JSX.Element {
  return (
    <ConnectedButtonGroup aria-label="Alignment" defaultValue={['left']} deselectable={false}>
      <ConnectedButtonGroupItem value="left" aria-label="Align left">
        <FormatAlignLeftIcon />
      </ConnectedButtonGroupItem>
      <ConnectedButtonGroupItem value="center" aria-label="Align center">
        <FormatAlignCenterIcon />
      </ConnectedButtonGroupItem>
      <ConnectedButtonGroupItem value="right" aria-label="Align right">
        <FormatAlignRightIcon />
      </ConnectedButtonGroupItem>
    </ConnectedButtonGroup>
  );
}
