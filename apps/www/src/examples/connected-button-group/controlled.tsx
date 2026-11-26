import * as React from 'react';

import {
  ConnectedButtonGroup,
  ConnectedButtonGroupItem,
} from '@/registry/m3ui/ui/connected-button-group';

export default function ConnectedButtonGroupControlled(): React.JSX.Element {
  const [value, setValue] = React.useState(['walk']);
  return (
    <div className="flex flex-col items-center gap-4">
      <ConnectedButtonGroup
        aria-label="Travel mode"
        value={value}
        onValueChange={setValue}
        deselectable={false}
      >
        <ConnectedButtonGroupItem value="walk">Walk</ConnectedButtonGroupItem>
        <ConnectedButtonGroupItem value="bike">Bike</ConnectedButtonGroupItem>
        <ConnectedButtonGroupItem value="transit">Transit</ConnectedButtonGroupItem>
      </ConnectedButtonGroup>
      <p className="type-body-medium text-on-surface-variant">Selected: {value.join(', ')}</p>
    </div>
  );
}
