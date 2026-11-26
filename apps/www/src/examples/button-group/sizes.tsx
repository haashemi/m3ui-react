import type * as React from 'react';

import { BookmarkIcon, EditIcon, StarIcon } from '~/icons';
import { ButtonGroup } from '@/registry/m3ui/ui/button-group';
import { IconButton } from '@/registry/m3ui/ui/icon-button';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function ButtonGroupSizes(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-6">
      {sizes.map((size) => (
        <ButtonGroup key={size} size={size}>
          <IconButton size={size} variant="tonal" aria-label={`Edit, ${size}`}>
            <EditIcon />
          </IconButton>
          <IconButton size={size} variant="filled" aria-label={`Bookmark, ${size}`}>
            <BookmarkIcon />
          </IconButton>
          <IconButton size={size} variant="tonal" aria-label={`Star, ${size}`}>
            <StarIcon />
          </IconButton>
        </ButtonGroup>
      ))}
    </div>
  );
}
