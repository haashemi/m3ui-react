import type * as React from 'react';

import { BookmarkFillIcon, BookmarkIcon } from '~/icons';
import { ToggleButton } from '@/registry/m3ui/ui/toggle-button';

export default function ToggleButtonDemo(): React.JSX.Element {
  return (
    <ToggleButton>
      <BookmarkIcon className="in-data-pressed:hidden" />
      <BookmarkFillIcon className="not-in-data-pressed:hidden" />
      Save
    </ToggleButton>
  );
}
