import type * as React from 'react';

import { ToggleButton } from '@/registry/m3ui/ui/toggle-button';

export default function ToggleButtonShapes(): React.JSX.Element {
  return (
    <>
      <ToggleButton size="md" shape="round">
        Round
      </ToggleButton>
      <ToggleButton size="md" shape="square">
        Square
      </ToggleButton>
    </>
  );
}
