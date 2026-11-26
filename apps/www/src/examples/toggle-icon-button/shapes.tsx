import type * as React from 'react';

import { BookmarkFillIcon, BookmarkIcon } from '~/icons';
import { ToggleIconButton } from '@/registry/m3ui/ui/toggle-icon-button';

export default function ToggleIconButtonShapes(): React.JSX.Element {
  return (
    <>
      <ToggleIconButton size="md" variant="tonal" shape="round" aria-label="Bookmark, round">
        <BookmarkIcon className="in-data-pressed:hidden" />
        <BookmarkFillIcon className="not-in-data-pressed:hidden" />
      </ToggleIconButton>
      <ToggleIconButton size="md" variant="tonal" shape="square" aria-label="Bookmark, square">
        <BookmarkIcon className="in-data-pressed:hidden" />
        <BookmarkFillIcon className="not-in-data-pressed:hidden" />
      </ToggleIconButton>
    </>
  );
}
