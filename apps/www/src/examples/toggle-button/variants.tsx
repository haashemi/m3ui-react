import type * as React from 'react';

import { ToggleButton } from '@/registry/m3ui/ui/toggle-button';

export default function ToggleButtonVariants(): React.JSX.Element {
  return (
    <>
      <ToggleButton variant="elevated" defaultPressed>
        Elevated
      </ToggleButton>
      <ToggleButton variant="filled" defaultPressed>
        Filled
      </ToggleButton>
      <ToggleButton variant="tonal" defaultPressed>
        Tonal
      </ToggleButton>
      <ToggleButton variant="outlined" defaultPressed>
        Outlined
      </ToggleButton>
    </>
  );
}
