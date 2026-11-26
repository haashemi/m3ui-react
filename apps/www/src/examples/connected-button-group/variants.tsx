import type * as React from 'react';

import {
  ConnectedButtonGroup,
  ConnectedButtonGroupItem,
} from '@/registry/m3ui/ui/connected-button-group';

const variants = ['elevated', 'filled', 'tonal', 'outlined'] as const;

export default function ConnectedButtonGroupVariants(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-6">
      {variants.map((variant) => (
        <ConnectedButtonGroup
          key={variant}
          variant={variant}
          aria-label={`Sort, ${variant}`}
          defaultValue={['new']}
          deselectable={false}
        >
          <ConnectedButtonGroupItem value="new">Newest</ConnectedButtonGroupItem>
          <ConnectedButtonGroupItem value="top">Top</ConnectedButtonGroupItem>
          <ConnectedButtonGroupItem value="old">Oldest</ConnectedButtonGroupItem>
        </ConnectedButtonGroup>
      ))}
    </div>
  );
}
