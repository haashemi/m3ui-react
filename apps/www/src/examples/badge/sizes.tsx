import type * as React from 'react';

import { Badge } from '@/registry/m3ui/ui/badge';

export default function BadgeSizes(): React.JSX.Element {
  return (
    <>
      <Badge />
      <Badge>3</Badge>
      <Badge>42</Badge>
      <Badge>New</Badge>
    </>
  );
}
