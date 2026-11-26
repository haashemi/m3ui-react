import type * as React from 'react';

import { StarFillIcon, StarIcon } from '~/icons';
import { ToggleIconButton } from '@/registry/m3ui/ui/toggle-icon-button';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function ToggleIconButtonSizes(): React.JSX.Element {
  return (
    <>
      {sizes.map((size) => (
        <ToggleIconButton key={size} size={size} variant="filled" aria-label={`Star, ${size}`}>
          <StarIcon className="in-data-pressed:hidden" />
          <StarFillIcon className="not-in-data-pressed:hidden" />
        </ToggleIconButton>
      ))}
    </>
  );
}
