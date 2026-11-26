import type * as React from 'react';

import {
  ConnectedButtonGroup,
  ConnectedButtonGroupItem,
} from '@/registry/m3ui/ui/connected-button-group';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function ConnectedButtonGroupSizes(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-6">
      {sizes.map((size) => (
        <ConnectedButtonGroup
          key={size}
          size={size}
          aria-label={`Size, ${size}`}
          defaultValue={['m']}
          deselectable={false}
        >
          <ConnectedButtonGroupItem value="s">S</ConnectedButtonGroupItem>
          <ConnectedButtonGroupItem value="m">M</ConnectedButtonGroupItem>
          <ConnectedButtonGroupItem value="l">L</ConnectedButtonGroupItem>
        </ConnectedButtonGroup>
      ))}
    </div>
  );
}
