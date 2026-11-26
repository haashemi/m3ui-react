import type * as React from 'react';

import { EditIcon } from '~/icons';
import { Fab } from '@/registry/m3ui/ui/fab';

export default function FabDisabled(): React.JSX.Element {
  return (
    <Fab disabled aria-label="Compose">
      <EditIcon />
    </Fab>
  );
}
