import type * as React from 'react';

import { ToggleButton } from '@/registry/m3ui/ui/toggle-button';

export default function ToggleButtonSizes(): React.JSX.Element {
  return (
    <>
      <ToggleButton size="xs">Extra small</ToggleButton>
      <ToggleButton size="sm">Small</ToggleButton>
      <ToggleButton size="md">Medium</ToggleButton>
      <ToggleButton size="lg">Large</ToggleButton>
      <ToggleButton size="xl">Extra large</ToggleButton>
    </>
  );
}
