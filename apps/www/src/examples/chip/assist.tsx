import type * as React from 'react';

import { DirectionsCarIcon, EventIcon } from '~/icons';
import { AssistChip, ChipSet } from '@/registry/m3ui/ui/chip';

export default function ChipAssist(): React.JSX.Element {
  return (
    <ChipSet>
      <AssistChip icon={<EventIcon />}>Add to calendar</AssistChip>
      <AssistChip icon={<DirectionsCarIcon />}>Get directions</AssistChip>
    </ChipSet>
  );
}
