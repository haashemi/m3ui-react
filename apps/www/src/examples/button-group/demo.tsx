import type * as React from 'react';

import { BookmarkIcon, EditIcon, ShareIcon } from '~/icons';
import { Button } from '@/registry/m3ui/ui/button';
import { ButtonGroup } from '@/registry/m3ui/ui/button-group';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

export default function ButtonGroupDemo(): React.JSX.Element {
  return (
    <ButtonGroup>
      <IconButton variant="tonal" aria-label="Edit">
        <EditIcon />
      </IconButton>
      <Button>
        <ShareIcon />
        Share
      </Button>
      <IconButton variant="tonal" aria-label="Bookmark">
        <BookmarkIcon />
      </IconButton>
    </ButtonGroup>
  );
}
