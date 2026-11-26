import type * as React from 'react';

import { EditIcon } from '~/icons';
import { Fab } from '@/registry/m3ui/ui/fab';

export default function FabDemo(): React.JSX.Element {
  return (
    <Fab aria-label="Compose">
      <EditIcon />
    </Fab>
  );
}
