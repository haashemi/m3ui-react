import type * as React from 'react';

import { FilterChip, FilterChipGroup } from '@/registry/m3ui/ui/chip';

export default function ChipFilterSingle(): React.JSX.Element {
  return (
    <FilterChipGroup aria-label="Price" defaultValue={['any']} deselectable={false}>
      <FilterChip value="any">Any price</FilterChip>
      <FilterChip value="low">Under $20</FilterChip>
      <FilterChip value="mid">$20 to $50</FilterChip>
      <FilterChip value="high">Over $50</FilterChip>
    </FilterChipGroup>
  );
}
