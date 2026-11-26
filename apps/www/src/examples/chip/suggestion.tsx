import type * as React from 'react';

import { FlightIcon } from '~/icons';
import { ChipSet, SuggestionChip } from '@/registry/m3ui/ui/chip';

export default function ChipSuggestion(): React.JSX.Element {
  return (
    <ChipSet>
      <SuggestionChip>Sounds good</SuggestionChip>
      <SuggestionChip>See you then</SuggestionChip>
      <SuggestionChip icon={<FlightIcon />}>Book a flight</SuggestionChip>
    </ChipSet>
  );
}
