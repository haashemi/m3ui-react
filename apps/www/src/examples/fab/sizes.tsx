import type * as React from 'react';

import { AddIcon } from '~/icons';
import { Fab } from '@/registry/m3ui/ui/fab';

export default function FabSizes(): React.JSX.Element {
  return (
    <>
      <Fab size="default" aria-label="Add">
        <AddIcon />
      </Fab>
      <Fab size="medium" aria-label="Add, medium">
        <AddIcon />
      </Fab>
      <Fab size="large" aria-label="Add, large">
        <AddIcon />
      </Fab>
    </>
  );
}
