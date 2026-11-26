import type * as React from 'react';

import { EventIcon, LocalCafeIcon } from '~/icons';
import {
  AssistChip,
  ChipSet,
  FilterChip,
  InputChip,
  SuggestionChip,
} from '@/registry/m3ui/ui/chip';

export default function ChipDemo(): React.JSX.Element {
  return (
    <ChipSet>
      <AssistChip icon={<EventIcon />}>Add to calendar</AssistChip>
      <FilterChip icon={<LocalCafeIcon />} defaultPressed>
        Café
      </FilterChip>
      <InputChip onRemove={() => {}}>Lisbon</InputChip>
      <SuggestionChip>Sounds good</SuggestionChip>
    </ChipSet>
  );
}
