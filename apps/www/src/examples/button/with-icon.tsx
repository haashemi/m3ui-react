import type * as React from 'react';

import { AddIcon, SendIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';

export default function ButtonWithIcon(): React.JSX.Element {
  return (
    <>
      <Button variant="tonal">
        <AddIcon />
        New list
      </Button>
      <Button>
        Send
        <SendIcon />
      </Button>
    </>
  );
}
