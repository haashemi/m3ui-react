import type * as React from 'react';

import { Button } from '@/registry/m3ui/ui/button';

export default function ButtonLink(): React.JSX.Element {
  return (
    // oxlint-disable-next-line jsx-a11y/control-has-associated-label -- the label comes from Button's children
    <Button variant="tonal" render={<a href="https://m3.material.io/components/buttons" />}>
      M3 button guidelines
    </Button>
  );
}
