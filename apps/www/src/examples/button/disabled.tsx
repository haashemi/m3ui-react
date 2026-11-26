import type * as React from 'react';

import { Button } from '@/registry/m3ui/ui/button';

export default function ButtonDisabled(): React.JSX.Element {
  return (
    <>
      <Button variant="elevated" disabled>
        Elevated
      </Button>
      <Button variant="filled" disabled>
        Filled
      </Button>
      <Button variant="tonal" disabled>
        Tonal
      </Button>
      <Button variant="outlined" disabled>
        Outlined
      </Button>
      <Button variant="text" disabled>
        Text
      </Button>
    </>
  );
}
