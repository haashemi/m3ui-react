import type * as React from 'react';

import { Button } from '@/registry/m3ui/ui/button';

export default function ButtonVariants(): React.JSX.Element {
  return (
    <>
      <Button variant="elevated">Elevated</Button>
      <Button variant="filled">Filled</Button>
      <Button variant="tonal">Tonal</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </>
  );
}
