import type * as React from 'react';

import { EditIcon } from '~/icons';
import { ExtendedFab } from '@/registry/m3ui/ui/extended-fab';

export default function ExtendedFabDemo(): React.JSX.Element {
  return <ExtendedFab icon={<EditIcon />}>Compose</ExtendedFab>;
}
