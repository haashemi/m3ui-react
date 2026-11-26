import type * as React from 'react';

import { DownloadIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default function ButtonPending(): React.JSX.Element {
  return (
    <Button variant="tonal" pendingAnnouncement="Downloading" onClick={() => wait(1500)}>
      <DownloadIcon />
      <span className="in-data-pending:hidden">Download</span>
      <span className="not-in-data-pending:hidden">Downloading…</span>
    </Button>
  );
}
