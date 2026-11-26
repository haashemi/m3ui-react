import type * as React from 'react';

import { SendIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';

export default function ButtonDemo(): React.JSX.Element {
  return (
    <>
      <Button variant="outlined">Cancel</Button>
      <Button>
        <SendIcon />
        Send
      </Button>
    </>
  );
}
