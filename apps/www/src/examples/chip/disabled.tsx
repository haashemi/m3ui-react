import type * as React from 'react';

import { EventIcon } from '~/icons';
import {
  AssistChip,
  ChipSet,
  FilterChip,
  InputChip,
  SuggestionChip,
} from '@/registry/m3ui/ui/chip';

export default function ChipDisabled(): React.JSX.Element {
  return (
    <ChipSet>
      <AssistChip disabled icon={<EventIcon />}>
        Assist
      </AssistChip>
      <FilterChip disabled defaultPressed>
        Filter
      </FilterChip>
      <InputChip disabled onRemove={() => {}}>
        Input
      </InputChip>
      <SuggestionChip disabled>Suggestion</SuggestionChip>
    </ChipSet>
  );
}
