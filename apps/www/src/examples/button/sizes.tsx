import type * as React from 'react';

import { EditIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';

export default function ButtonSizes(): React.JSX.Element {
  return (
    <>
      <Button size="xs">
        <EditIcon />
        Extra small
      </Button>
      <Button size="sm">
        <EditIcon />
        Small
      </Button>
      <Button size="md">
        <EditIcon />
        Medium
      </Button>
      <Button size="lg">
        <EditIcon />
        Large
      </Button>
      <Button size="xl">
        <EditIcon />
        Extra large
      </Button>
    </>
  );
}
