import type * as React from 'react';

import {
  ConnectedButtonGroup,
  ConnectedButtonGroupItem,
} from '@/registry/m3ui/ui/connected-button-group';

export default function ConnectedButtonGroupDemo(): React.JSX.Element {
  return (
    <ConnectedButtonGroup aria-label="View" defaultValue={['week']} deselectable={false}>
      <ConnectedButtonGroupItem value="day">Day</ConnectedButtonGroupItem>
      <ConnectedButtonGroupItem value="week">Week</ConnectedButtonGroupItem>
      <ConnectedButtonGroupItem value="month">Month</ConnectedButtonGroupItem>
    </ConnectedButtonGroup>
  );
}
