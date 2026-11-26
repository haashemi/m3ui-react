import type * as React from 'react';

import { Button } from '@/registry/m3ui/ui/button';
import { ButtonGroup } from '@/registry/m3ui/ui/button-group';

export default function ButtonGroupButtons(): React.JSX.Element {
  return (
    <ButtonGroup size="md">
      <Button size="md" variant="outlined">
        Back
      </Button>
      <Button size="md" variant="tonal">
        Skip
      </Button>
      <Button size="md">Next</Button>
    </ButtonGroup>
  );
}
