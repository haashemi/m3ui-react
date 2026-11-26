import type * as React from 'react';

import { Button } from '@/registry/m3ui/ui/button';

export default function ButtonShapes(): React.JSX.Element {
  return (
    <>
      <Button size="md" variant="tonal" shape="round">
        Round
      </Button>
      <Button size="md" variant="tonal" shape="square">
        Square
      </Button>
    </>
  );
}
