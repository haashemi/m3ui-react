import type * as React from 'react';

import { InboxIcon } from '~/icons';
import { Badge, BadgeAnchor } from '@/registry/m3ui/ui/badge';

function countLabel(count: number): string {
  return count > 999 ? '999+' : String(count);
}

export default function BadgeMaxCount(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-1 px-4 text-on-surface-variant">
      <BadgeAnchor>
        <InboxIcon className="fill-current block-6 inline-6" />
        <Badge>{countLabel(1280)}</Badge>
      </BadgeAnchor>
      <span className="type-label-medium">Inbox</span>
    </div>
  );
}
