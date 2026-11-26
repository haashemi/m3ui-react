import type * as React from 'react';

import { ToggleButton } from '@/registry/m3ui/ui/toggle-button';

export default function ToggleButtonDisabled(): React.JSX.Element {
  return (
    <>
      <ToggleButton disabled>Off</ToggleButton>
      <ToggleButton variant="outlined" disabled defaultPressed>
        On
      </ToggleButton>
    </>
  );
}
