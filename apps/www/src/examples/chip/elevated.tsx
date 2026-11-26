import type * as React from 'react';

import { LightbulbIcon } from '~/icons';
import { AssistChip, ChipSet, FilterChip, SuggestionChip } from '@/registry/m3ui/ui/chip';

export default function ChipElevated(): React.JSX.Element {
  return (
    <ChipSet>
      <AssistChip variant="elevated" icon={<LightbulbIcon />}>
        Get ideas
      </AssistChip>
      <FilterChip variant="elevated">Open now</FilterChip>
      <SuggestionChip variant="elevated">Show more</SuggestionChip>
    </ChipSet>
  );
}
