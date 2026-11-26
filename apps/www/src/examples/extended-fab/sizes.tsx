import type * as React from 'react';

import { EditIcon } from '~/icons';
import { ExtendedFab } from '@/registry/m3ui/ui/extended-fab';

export default function ExtendedFabSizes(): React.JSX.Element {
  return (
    <>
      <ExtendedFab size="small" icon={<EditIcon />}>
        Small
      </ExtendedFab>
      <ExtendedFab size="medium" icon={<EditIcon />}>
        Medium
      </ExtendedFab>
      <ExtendedFab size="large" icon={<EditIcon />}>
        Large
      </ExtendedFab>
    </>
  );
}
