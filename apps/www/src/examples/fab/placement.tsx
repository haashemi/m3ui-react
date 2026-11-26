import type * as React from 'react';

import { EditIcon } from '~/icons';
import { Fab } from '@/registry/m3ui/ui/fab';

export default function FabPlacement(): React.JSX.Element {
  return (
    <div className="relative overflow-hidden rounded-corner-large bg-surface block-64 inline-full max-inline-90">
      <div className="flex flex-col gap-3 p-4">
        <div className="rounded-corner-small bg-surface-container-high block-4 inline-3/4" />
        <div className="rounded-corner-small bg-surface-container-high block-4 inline-1/2" />
        <div className="rounded-corner-small bg-surface-container-high block-4 inline-2/3" />
      </div>
      <Fab aria-label="Compose" className="absolute inset-e-4 inset-be-4">
        <EditIcon />
      </Fab>
    </div>
  );
}
