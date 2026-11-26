import * as React from 'react';

import { EditIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';
import { ExtendedFab } from '@/registry/m3ui/ui/extended-fab';

export default function ExtendedFabCollapse(): React.JSX.Element {
  const [extended, setExtended] = React.useState(true);
  return (
    <div className="flex flex-col items-center gap-6">
      <Button variant="outlined" size="xs" onClick={() => setExtended((value) => !value)}>
        {extended ? 'Collapse' : 'Extend'}
      </Button>
      <ExtendedFab size="medium" icon={<EditIcon />} extended={extended}>
        Compose
      </ExtendedFab>
    </div>
  );
}
